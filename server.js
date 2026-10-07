import fs from 'fs'
import http from 'http'
import path from 'path'

const port = Number(process.env.PORT || 3002)
const dataFile = path.join(process.cwd(), 'data', 'projects.json')
const uploadDir = path.join(process.cwd(), 'uploads')
const legacyUploadDir = path.join(process.cwd(), 'public', 'project-images')

const defaultProjects = [
  {
    id: 'featured-project-01',
    title: 'Editorial Branding',
    category: 'GRAPHIC DESIGN',
    year: '2026',
    description: 'Premium brand visuals, strong hierarchy and polished creative direction.',
    projectType: 'Featured Design',
    client: 'Creative Studio',
    objective: 'Create a visual identity system with strong editorial presence and premium marketing assets.',
    process: 'Developed the concept around clean typography, balanced spacing and a refined monochrome palette with warm accent tones.',
    result: 'The final presentation established a confident visual language suitable for digital campaigns and curated brand materials.',
    software: ['Adobe Photoshop', 'Adobe Illustrator'],
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'featured-project-02',
    title: 'Campaign Content',
    category: 'SOCIAL MEDIA',
    year: '2026',
    description: 'Social-first creative assets designed for high attention and strong conversion.',
    projectType: 'Social Campaign',
    client: 'Brand Campaign',
    objective: 'Design a cohesive content system for a product launch and digital storytelling campaign.',
    process: 'Built a visual system with layered compositions, product focus and tailored social mockups.',
    result: 'The campaign created a clear, polished and consistent brand presence across digital touchpoints.',
    software: ['Canva', 'Adobe Photoshop'],
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80',
    ],
  },
]

const ensureDataFile = () => {
  const dataDir = path.dirname(dataFile)
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify(defaultProjects, null, 2), 'utf8')
}

const ensureUploadDir = () => {
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })
  if (!fs.existsSync(legacyUploadDir)) fs.mkdirSync(legacyUploadDir, { recursive: true })
}

const readProjects = () => {
  try {
    const raw = fs.readFileSync(dataFile, 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : defaultProjects
  } catch {
    return defaultProjects
  }
}

const writeProjects = (payload) => {
  const nextPayload = Array.isArray(payload) ? payload : defaultProjects
  fs.writeFileSync(dataFile, JSON.stringify(nextPayload, null, 2), 'utf8')
}

const saveUploadedFile = (fileName, fileData) => {
  ensureUploadDir()
  const safeName = fileName.replace(/[^a-zA-Z0-9_.-]/g, '_')
  const finalPath = path.join(uploadDir, `${Date.now()}-${safeName}`)
  fs.writeFileSync(finalPath, fileData)
  return `/uploads/${path.basename(finalPath)}`
}

const parseMultipartForm = (buffer, boundary) => {
  const boundaryMarker = `--${boundary}`
  const sections = buffer.toString('binary').split(boundaryMarker)
  const fileSection = sections.find((section) => section.includes('filename='))
  if (!fileSection) return null

  const nameMatch = fileSection.match(/name="([^"]+)"/)
  const fileNameMatch = fileSection.match(/filename="([^"]+)"/)
  if (!nameMatch || !fileNameMatch) return null

  const fileName = fileNameMatch[1]
  const contentIndex = fileSection.indexOf('\r\n\r\n')
  const fileStart = contentIndex + 4
  const fileEnd = fileSection.lastIndexOf('\r\n--')
  const fileData = Buffer.from(fileSection.slice(fileStart, fileEnd), 'binary')

  return { fieldName: nameMatch[1], fileName, fileData }
}

ensureDataFile()
ensureUploadDir()

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, 'http://localhost')

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (requestUrl.pathname === '/api/projects' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(readProjects()))
    return
  }

  if (requestUrl.pathname === '/api/projects' && req.method === 'POST') {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      try {
        const parsed = body ? JSON.parse(body) : defaultProjects
        writeProjects(parsed)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: true }))
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, message: 'Invalid payload' }))
      }
    })
    return
  }

  if (requestUrl.pathname === '/api/upload' && req.method === 'POST') {
    const contentType = req.headers['content-type'] || ''
    const boundaryMatch = contentType.match(/boundary=(.+)$/)
    if (!boundaryMatch) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, message: 'Missing boundary' }))
      return
    }

    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => {
      const buffer = Buffer.concat(chunks)
      const parsed = parseMultipartForm(buffer, boundaryMatch[1])
      if (!parsed) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, message: 'No file uploaded' }))
        return
      }

      const url = saveUploadedFile(parsed.fileName, parsed.fileData)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, url }))
    })
    return
  }

  if (requestUrl.pathname.startsWith('/uploads/') || requestUrl.pathname.startsWith('/project-images/')) {
    const relativePath = requestUrl.pathname.replace(/^\/+(?:uploads|project-images)\//, '')
    const candidatePaths = [
      path.join(uploadDir, relativePath),
      path.join(legacyUploadDir, relativePath),
    ]
    const filePath = candidatePaths.find((candidate) => fs.existsSync(candidate))

    if (filePath) {
      const file = fs.readFileSync(filePath)
      const ext = path.extname(filePath).toLowerCase()
      const mime = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : ext === '.webp' ? 'image/webp' : ext === '.gif' ? 'image/gif' : 'application/octet-stream'
      res.writeHead(200, { 'Content-Type': mime })
      res.end(file)
      return
    }

    res.writeHead(404)
    res.end('Not found')
    return
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ success: false, message: 'Not found' }))
})

server.listen(port, () => {
  console.log(`Portfolio API running on http://localhost:${port}`)
})
