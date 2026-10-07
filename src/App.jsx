import { useEffect, useMemo, useState } from 'react'
import './App.css'

const storageKey = 'akila-portfolio-projects'
const PROFILE_PHOTO = './profile.jpg'
const PROJECTS_URL = './projects.json'

const navItems = ['HOME', 'WORK', 'ABOUT', 'SERVICES', 'CONTACT']

const projectFilters = [
  'ALL',
  'GRAPHIC DESIGN',
  'SOCIAL MEDIA',
  'POSTERS',
  'BANNERS',
  'PHOTO EDITING',
  'VIDEO',
  'AI CREATIVE',
  'UI DESIGN',
]

const services = [
  {
    number: '01',
    title: 'Graphic Design',
    description:
      'Social media designs, posters, banners, flyers, promotional materials, layouts, typography and visual design.',
  },
  {
    number: '02',
    title: 'Photo Editing',
    description:
      'Retouching, background removal, color correction, image enhancement and creative photo manipulation.',
  },
  {
    number: '03',
    title: 'Video Editing',
    description:
      'Short-form videos, YouTube Shorts, Reels, social media content, transitions, text animation and basic motion graphics.',
  },
  {
    number: '04',
    title: 'AI-Assisted Creative Design',
    description:
      'AI-assisted image generation, AI video creation, creative visual generation and prompt-based design.',
  },
  {
    number: '05',
    title: 'UI Design',
    description:
      'UI design, wireframing, prototyping and responsive design.',
  },
]

const skillGroups = [
  {
    title: 'Graphic Design',
    items: [
      'Social Media Design',
      'Poster Design',
      'Banner Design',
      'Flyer Design',
      'Layout Design',
      'Typography',
      'Visual Design',
      'Basic Branding',
    ],
  },
  {
    title: 'Photo Editing',
    items: [
      'Retouching',
      'Background Removal',
      'Image Enhancement',
      'Color Correction',
      'Photo Manipulation',
      'AI-Assisted Editing',
    ],
  },
  {
    title: 'Video Editing',
    items: ['Short-Form Videos', 'YouTube Shorts', 'Reels', 'Transitions', 'Text Animation', 'Basic Motion Graphics'],
  },
  {
    title: 'AI & Digital Design',
    items: ['AI-Assisted Design', 'AI Image Generation', 'AI Video Creation', 'AI Content Creation', 'Prompt-Based Design', 'Creative Visual Generation'],
  },
  {
    title: 'UI Design',
    items: ['Figma', 'UI Design', 'Wireframing', 'Prototyping', 'Responsive Design'],
  },
]

const softwareTools = [
  'Adobe Photoshop',
  'Adobe Lightroom',
  'Adobe Illustrator',
  'Adobe Premiere Pro',
  'Canva',
  'CapCut',
  'Wondershare Filmora',
  'Figma',
  'Google Flow',
  'AI Image Generation Tools',
  'AI Video Generation Tools',
  'AI Content Creation Tools',
]

const createBlankProject = () => ({
  id: `project-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  title: 'New Project',
  category: 'GRAPHIC DESIGN',
  year: '2026',
  description: 'Add your project description here.',
  projectType: 'Creative Design',
  client: 'Client / Brand',
  objective: 'Describe the purpose and creative goal of this project.',
  process: 'Add your design process, concept development, revisions and production notes.',
  result: 'Explain the final outcome and how the design solved the brief.',
  software: ['Adobe Photoshop', 'Figma'],
  featured: false,
  coverImage: '',
  galleryImages: [],
})

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
    coverImage:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
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
    coverImage:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'featured-project-03',
    title: 'Motion Story',
    category: 'VIDEO',
    year: '2026',
    description: 'Short-form video design with transitions, pacing and polished motion graphics.',
    projectType: 'Short-form Video',
    client: 'Digital Brand',
    objective: 'Create an engaging short-form video concept that feels premium, fast and narrative-driven.',
    process: 'Combined motion typography, scene transitions and polished editing to keep visuals clean and compelling.',
    result: 'The final video delivered a modern, concise and attention-grabbing brand story for digital audiences.',
    software: ['Adobe Premiere Pro', 'Canva'],
    featured: true,
    coverImage:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'featured-project-04',
    title: 'Interface Concept',
    category: 'UI DESIGN',
    year: '2026',
    description: 'Responsive interface direction with a clean and confident user experience.',
    projectType: 'UI Concept',
    client: 'Product Interface',
    objective: 'Design a premium digital interface that balances usability, modern aesthetics and strong visual hierarchy.',
    process: 'Mapped user flow, designed layout rhythm and refined interaction details to support clarity and elegance.',
    result: 'The concept establishes a refined interface direction that feels professional, modern and usable across screen sizes.',
    software: ['Figma', 'Adobe XD'],
    featured: true,
    coverImage:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'featured-project-05',
    title: 'Visual Campaign Set',
    category: 'GRAPHIC DESIGN',
    year: '2026',
    description: 'A multi-format visual campaign built for a brand launch and promotional rollout.',
    projectType: 'Campaign Design',
    client: 'Retail Brand',
    objective: 'Create a polished promotional suite with a consistent premium identity across print and digital assets.',
    process: 'Developed the concept around strong typography, clean framing and highly readable product positioning to support conversion.',
    result: 'The campaign gave the brand a cohesive and elevated visual presence across social and digital placements.',
    software: ['Adobe Photoshop', 'Adobe Illustrator'],
    featured: true,
    coverImage:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'featured-project-06',
    title: 'Creative Reels Kit',
    category: 'VIDEO',
    year: '2026',
    description: 'Short-form social visuals and motion graphics designed for reach and retention.',
    projectType: 'Content Edit',
    client: 'Digital Campaign',
    objective: 'Build viewer-focused video assets that feel modern, energetic and editorially refined.',
    process: 'Combined motion graphics, typography and rhythmic transitions to deliver a premium short-form brand narrative.',
    result: 'The final content kit created a clear visual identity for the campaign while improving engagement potential.',
    software: ['Adobe Premiere Pro', 'CapCut'],
    featured: true,
    coverImage:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'featured-project-07',
    title: 'Product Visual System',
    category: 'AI CREATIVE',
    year: '2026',
    description: 'AI-assisted creative concepts designed to elevate a product presentation with a premium digital finish.',
    projectType: 'AI Creative Direction',
    client: 'Modern Brand',
    objective: 'Explore visual concepts that amplify product storytelling while keeping the brand tone clean and premium.',
    process: 'Combined prompt-based ideation, image generation and refined post-editing to craft a polished modern visual language.',
    result: 'The final set delivered a standout, high-end concept direction suitable for launch visuals and social promotion.',
    software: ['Adobe Photoshop', 'AI Image Tools'],
    featured: true,
    coverImage:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1000&q=80',
    ],
  },
]

const normalizeProjects = (value) => {
  if (!Array.isArray(value) || value.length === 0) return defaultProjects
  return value.length < 4 ? defaultProjects : value
}

function App() {
  const [projects, setProjects] = useState(() => {
    const stored = localStorage.getItem(storageKey)
    if (!stored) return defaultProjects

    try {
      return normalizeProjects(JSON.parse(stored))
    } catch {
      return defaultProjects
    }
  })
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isManagerOpen, setManagerOpen] = useState(false)
  const [draftProject, setDraftProject] = useState(createBlankProject())
  const [isEditing, setIsEditing] = useState(false)
  const [profileImageError, setProfileImageError] = useState(false)
  const [profileImageSrc, setProfileImageSrc] = useState(PROFILE_PHOTO)

  const persistProjects = async (nextProjects) => {
    setProjects(nextProjects)
    localStorage.setItem(storageKey, JSON.stringify(nextProjects))
  }

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch(PROJECTS_URL)
        if (!response.ok) throw new Error('Static project data unavailable')

        const data = await response.json()
        if (Array.isArray(data) && data.length) {
          const normalized = normalizeProjects(data)
          setProjects(normalized)
          localStorage.setItem(storageKey, JSON.stringify(normalized))
          return
        }
      } catch {
        const stored = localStorage.getItem(storageKey)
        if (stored) {
          try {
            setProjects(normalizeProjects(JSON.parse(stored)))
          } catch {
            setProjects(defaultProjects)
          }
        } else {
          setProjects(defaultProjects)
        }
      }
    }

    loadProjects()
  }, [])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    const hash = window.location.hash
    if (hash.startsWith('#project-')) {
      const id = hash.replace('#project-', '')
      const match = projects.find((project) => project.id === id)
      if (match) {
        setSelectedProjectId(match.id)
      }
    }
  }, [projects])

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'ALL') return projects
    return projects.filter((project) => project.category === activeFilter)
  }, [projects, activeFilter])

  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured),
    [projects],
  )

  const selectedProject = projects.find((project) => project.id === selectedProjectId) || null

  const handleOpenProject = (projectId) => {
    setSelectedProjectId(projectId)
    setMenuOpen(false)
    window.location.hash = `#project-${projectId}`
  }

  const handleBackToPortfolio = () => {
    setSelectedProjectId(null)
    window.history.replaceState(null, '', window.location.pathname)
  }

  const handleCreateProject = () => {
    setDraftProject(createBlankProject())
    setIsEditing(false)
    setManagerOpen(true)
  }

  const handleEditProject = (project) => {
    setDraftProject({
      ...project,
      software: project.software || [],
      galleryImages: project.galleryImages || [],
      coverImage: project.coverImage || '',
    })
    setIsEditing(true)
    setManagerOpen(true)
  }

  const convertFilesToDataUrls = async (files) => {
    const promises = files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(String(reader.result))
          reader.onerror = () => reject(new Error('File read failed'))
          reader.readAsDataURL(file)
        }),
    )

    try {
      return await Promise.all(promises)
    } catch {
      return []
    }
  }

  const handleImageUpload = async (event, target) => {
    const files = Array.from(event.target.files || [])
    if (!files.length) return

    const uploadedUrls = await convertFilesToDataUrls(files)
    if (!uploadedUrls.length) {
      event.target.value = ''
      return
    }

    setDraftProject((current) => {
      const existing = target === 'cover' ? current.coverImage : current.galleryImages
      const next = target === 'cover' ? uploadedUrls[0] : [...existing, ...uploadedUrls]
      return {
        ...current,
        coverImage: target === 'cover' ? next : current.coverImage,
        galleryImages: target === 'gallery' ? next : current.galleryImages,
      }
    })

    event.target.value = ''
  }

  const handleSaveProject = async () => {
    if (!draftProject.title.trim()) return

    const cleanProject = {
      ...draftProject,
      title: draftProject.title.trim(),
      description: draftProject.description.trim(),
      objective: draftProject.objective.trim(),
      process: draftProject.process.trim(),
      result: draftProject.result.trim(),
      software: draftProject.software.filter(Boolean),
      galleryImages: draftProject.galleryImages.filter(Boolean),
    }

    const nextProjects = isEditing
      ? projects.map((project) =>
          project.id === cleanProject.id ? { ...project, ...cleanProject } : project,
        )
      : [cleanProject, ...projects]

    await persistProjects(nextProjects)

    setManagerOpen(false)
    setDraftProject(createBlankProject())
    setIsEditing(false)
  }

  const handleDeleteProject = async (projectId) => {
    const nextProjects = projects.filter((project) => project.id !== projectId)
    await persistProjects(nextProjects)

    if (selectedProjectId === projectId) {
      handleBackToPortfolio()
    }
  }

  const handleMoveProject = async (projectId, direction) => {
    const index = projects.findIndex((project) => project.id === projectId)
    const nextIndex = direction === 'up' ? index - 1 : index + 1
    if (index < 0 || nextIndex < 0 || nextIndex >= projects.length) return

    const updated = [...projects]
    ;[updated[index], updated[nextIndex]] = [updated[nextIndex], updated[index]]
    await persistProjects(updated)
  }

  const toggleFeature = async (projectId) => {
    const nextProjects = projects.map((project) =>
      project.id === projectId ? { ...project, featured: !project.featured } : project,
    )

    await persistProjects(nextProjects)
  }

  const updateDraftField = (field, value) => {
    setDraftProject((current) => ({ ...current, [field]: value }))
  }

  const projectCountLabel = `${projects.length} project${projects.length === 1 ? '' : 's'}`

  return (
    <div className="portfolio-shell">
      {selectedProject ? (
        <div className="case-study-page">
          <header className="topbar topbar-inner">
            <div className="brand-wrap">
              <div className="brand-mark">AI</div>
              <div>
                <span className="brand-name">Akila Induwara</span>
                <small>Graphic Designer</small>
              </div>
            </div>
            <nav className="primary-nav">
              <a href="#home" onClick={handleBackToPortfolio}>HOME</a>
              <a href="#work" onClick={handleBackToPortfolio}>WORK</a>
              <a href="#about" onClick={handleBackToPortfolio}>ABOUT</a>
              <a href="#services" onClick={handleBackToPortfolio}>SERVICES</a>
              <a href="#contact" onClick={handleBackToPortfolio}>CONTACT</a>
            </nav>
            <button type="button" className="btn btn-primary small-btn" onClick={() => setManagerOpen(true)}>
              MANAGE PROJECTS
            </button>
          </header>

          <main className="case-study-shell">
            <div className="case-header-row">
              <button type="button" className="inline-link" onClick={handleBackToPortfolio}>
                ← Back to Portfolio
              </button>
            </div>

            <article className="case-study-article">
              <div className="case-intro-block">
                <p className="kicker">
                  {selectedProject.category} / {selectedProject.year}
                </p>
                <h1>{selectedProject.title}</h1>
              </div>

              <div className="case-hero-visual">
                {selectedProject.coverImage ? (
                  <img src={selectedProject.coverImage} alt={selectedProject.title} />
                ) : (
                  <div className="case-hero-placeholder">
                    <span>Featured Project</span>
                  </div>
                )}
              </div>

              <div className="case-grid">
                <section className="case-panel case-panel-wide">
                  <h2>Project Overview</h2>
                  <p>{selectedProject.description}</p>
                </section>

                <section className="case-panel">
                  <h2>Objective</h2>
                  <p>{selectedProject.objective}</p>
                </section>

                <section className="case-panel">
                  <h2>My Role</h2>
                  <p>{selectedProject.projectType}</p>
                </section>
              </div>

              <section className="case-panel process-panel">
                <h2>Design Process</h2>
                <p>{selectedProject.process}</p>
              </section>

              <section className="case-gallery">
                <div className="section-heading-row">
                  <div>
                    <p className="eyebrow">Project Gallery</p>
                    <h2>Creative presentation</h2>
                  </div>
                </div>

                {selectedProject.galleryImages.length > 0 ? (
                  <div className="gallery-grid">
                    {selectedProject.galleryImages.map((image, index) => (
                      <div key={`${image}-${index}`} className={`gallery-item ${index % 3 === 0 ? 'tall' : ''}`}>
                        <img src={image} alt={`${selectedProject.title} view ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="project-placeholder-grid">
                    <div className="placeholder-card large">
                      <span>Upload project image</span>
                    </div>
                    <div className="placeholder-card">
                      <span>Alternative view</span>
                    </div>
                    <div className="placeholder-card">
                      <span>Detail composition</span>
                    </div>
                  </div>
                )}
              </section>

              <div className="details-row">
                <section className="case-panel">
                  <h2>Design Details</h2>
                  <ul className="detail-list">
                    <li><strong>Typography:</strong> Clean editorial hierarchy and expressive visual rhythm.</li>
                    <li><strong>Color:</strong> Selective tonal contrast with premium, high-end presentation.</li>
                    <li><strong>Composition:</strong> Balanced, intentional layouts with strong design focus.</li>
                    <li><strong>Visual Style:</strong> Minimal, confident and contemporary.</li>
                    <li><strong>Tools Used:</strong> {selectedProject.software.join(', ') || 'Add your tools here.'}</li>
                  </ul>
                </section>

                <section className="case-panel">
                  <h2>Final Result</h2>
                  <p>{selectedProject.result}</p>
                  <div className="meta-stack">
                    <span>Client: {selectedProject.client}</span>
                    <span>Project type: {selectedProject.projectType}</span>
                  </div>
                </section>
              </div>
            </article>

            <div className="next-project-strip">
              <button type="button" className="btn btn-secondary" onClick={handleBackToPortfolio}>
                View All Work
              </button>
              <span>Next Project</span>
            </div>
          </main>
        </div>
      ) : (
        <>
          <header className="topbar">
            <div className="brand-wrap">
              <div className="brand-mark">AI</div>
              <div>
                <span className="brand-name">Akila Induwara</span>
                <small>Graphic Designer</small>
              </div>
            </div>

            <nav className={`primary-nav ${isMenuOpen ? 'mobile-visible' : ''}`}>
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                  {item}
                </a>
              ))}
            </nav>

            <div className="nav-actions">
              <button type="button" className="btn btn-primary small-btn" onClick={() => setManagerOpen(true)}>
                LET'S WORK TOGETHER
              </button>
              <button
                type="button"
                className="mobile-menu-button"
                aria-label="Toggle navigation"
                onClick={() => setMenuOpen((previous) => !previous)}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </header>

          <main className="page-shell">
            <section className="hero-section" id="home">
              <div className="hero-copy reveal">
                <p className="eyebrow">Available for Freelance Projects</p>
                <h1>Designing Visuals That Make Ideas Stand Out.</h1>
                <p className="lead">
                  Graphic Designer & Creative Content Designer specializing in graphic design,
                  photo editing, video editing, AI-assisted creative design, and digital content.
                </p>
                <div className="hero-actions">
                  <a href="#work" className="btn btn-primary">VIEW MY WORK</a>
                  <a href="#contact" className="btn btn-secondary">LET'S WORK TOGETHER</a>
                </div>
              </div>

              <div className="hero-visual reveal">
                <div className="hero-photo-frame">
                  <div className="photo-outline">
                    {profileImageError ? (
                      <div className="profile-fallback" aria-label="Profile photo placeholder">
                        <span className="profile-fallback-icon">👤</span>
                        <span>Upload a portrait</span>
                      </div>
                    ) : (
                      <img
                        src={profileImageSrc}
                        alt="Akila Induwara portrait"
                        className="profile-photo"
                        onError={() => setProfileImageError(true)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>

            <div className="scroll-indicator">
              <span>Scroll</span>
            </div>

            <section className="featured-projects-section">
              <div className="section-heading-row">
                <div>
                  <p className="eyebrow">Featured Projects</p>
                  <h2>Portfolio highlights</h2>
                </div>
                <button type="button" className="inline-link" onClick={handleCreateProject}>
                  + Add Project
                </button>
              </div>

              <div className="featured-grid">
                {featuredProjects.length ? (
                  featuredProjects.map((project, index) => (
                    <button
                      type="button"
                      key={project.id}
                      className="featured-card"
                      onClick={() => handleOpenProject(project.id)}
                    >
                      <div className="featured-media">
                        {project.coverImage ? (
                          <img src={project.coverImage} alt={project.title} />
                        ) : (
                          <div className="featured-placeholder">
                            <span>Project 0{index + 1}</span>
                          </div>
                        )}
                      </div>
                      <div className="featured-copy">
                        <span>{project.category}</span>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  Array.from({ length: 4 }).map((_, index) => (
                    <div key={`placeholder-${index}`} className="featured-card empty">
                      <div className="featured-media placeholder-surface">
                        <span>Project 0{index + 1}</span>
                      </div>
                      <div className="featured-copy">
                        <span>Placeholder</span>
                        <h3>Add Your Featured Project</h3>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="work-section" id="work">
              <div className="section-heading-row">
                <div>
                  <p className="eyebrow">Selected Work</p>
                  <h2>A selection of creative work across graphic design, visual content, photo editing, video, AI-assisted design and UI design.</h2>
                </div>
              </div>

              <div className="filter-row">
                {projectFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`filter-btn ${filter === activeFilter ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="work-grid masonry-grid">
                {visibleProjects.length ? (
                  visibleProjects.map((project, index) => (
                    <article key={project.id} className={`project-card ${index % 3 === 0 ? 'large' : ''}`}>
                      <button type="button" className="project-button" onClick={() => handleOpenProject(project.id)}>
                        <div className="project-thumb">
                          {project.coverImage ? (
                            <img src={project.coverImage} alt={project.title} />
                          ) : (
                            <div className="project-thumb-placeholder">
                              <span>{project.title}</span>
                            </div>
                          )}
                        </div>
                        <div className="project-meta">
                          <div className="meta-topline">
                            <span>{project.category}</span>
                            <span>{project.year}</span>
                          </div>
                          <h3>{project.title}</h3>
                          <p>{project.description}</p>
                        </div>
                      </button>
                    </article>
                  ))
                ) : (
                  <div className="empty-placeholder-block">
                    <h3>No projects match this category yet.</h3>
                    <p>Add your new work from the project manager.</p>
                  </div>
                )}
              </div>
            </section>

            <section className="about-section" id="about">
              <div className="about-copy reveal">
                <p className="eyebrow">About Me</p>
                <h2>Creative problem solving through design.</h2>
                <p>
                  I am a creative Graphic Designer and Content Designer with approximately 2 years of practical experience creating visual content for customers.
                </p>
                <p>
                  My work combines graphic design, photo editing, video editing and AI-assisted creative techniques to transform ideas into engaging digital content.
                </p>
                <p>
                  I focus on understanding the client's requirements first and then developing visual solutions that are professional, clear and visually appealing.
                </p>
                <p>
                  My Higher National Diploma in Information Technology (HNDIT) from SLIATE – Kegalle has strengthened my digital and creative process, but my focus remains on design and visual storytelling.
                </p>
              </div>

              <div className="about-visual reveal">
                <div className="mini-portfolio-panel">
                  <span>Creative Studio</span>
                  <strong>Akila Induwara</strong>
                  <small>Graphic Designer & Creative Content Designer</small>
                </div>
              </div>
            </section>

            <section className="services-section" id="services">
              <div className="section-heading-row">
                <div>
                  <p className="eyebrow">Services</p>
                  <h2>Design services built around real creative needs.</h2>
                </div>
              </div>

              <div className="services-grid">
                {services.map((service) => (
                  <article key={service.number} className="service-card">
                    <span className="service-number">{service.number}</span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="skills-section">
              <div className="section-heading-row">
                <div>
                  <p className="eyebrow">Skills & Expertise</p>
                  <h2>Focused on design, content and visual execution.</h2>
                </div>
              </div>

              <div className="skill-grid">
                {skillGroups.map((group) => (
                  <div key={group.title} className="skill-group">
                    <h3>{group.title}</h3>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="tools-section">
              <div className="section-heading-row">
                <div>
                  <p className="eyebrow">Tools & Software</p>
                  <h2>Creative tools used to build polished digital work.</h2>
                </div>
              </div>

              <div className="tool-list">
                {softwareTools.map((tool) => (
                  <span key={tool} className="tool-pill">{tool}</span>
                ))}
              </div>
            </section>

            <section className="experience-section">
              <div className="section-heading-row">
                <div>
                  <p className="eyebrow">Experience</p>
                  <h2>Freelance Graphic Designer & Creative Content Designer</h2>
                </div>
                <span className="timeline-tag">2024 – Present</span>
              </div>

              <div className="timeline">
                <div className="timeline-item">
                  <ul>
                    <li>Created graphic designs, social media posts, promotional materials, posters, banners and digital content based on customer requirements.</li>
                    <li>Provided professional photo editing including retouching, background removal, color correction, image enhancement and creative photo manipulation.</li>
                    <li>Created and edited short-form videos and social media content.</li>
                    <li>Used AI-powered creative tools to generate, enhance and develop visual content.</li>
                    <li>Communicated directly with customers to understand requirements, preferences and expectations.</li>
                    <li>Developed creative concepts and transformed customer ideas into visually appealing digital designs.</li>
                    <li>Managed multiple design projects while maintaining quality, creativity and attention to detail.</li>
                    <li>Combined graphic design, photo editing, video editing and AI-assisted techniques to deliver complete digital content solutions.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="education-section">
              <div className="education-card">
                <p className="eyebrow">Education</p>
                <h3>Higher National Diploma in Information Technology (HNDIT)</h3>
                <p>SLIATE – Kegalle</p>
                <span>2024 – 2026</span>
              </div>
            </section>

            <section className="contact-section" id="contact">
              <div className="contact-box">
                <p className="eyebrow">Let's create something impactful</p>
                <h2>Have an idea? Let's create something great.</h2>
                <p>
                  Whether you need a social media campaign, visual content, photo editing, video editing or a complete creative design solution, let's turn your idea into something visually impactful.
                </p>
                <div className="contact-actions">
                  <a href="mailto:ainduwara76@gmail.com" className="btn btn-primary">EMAIL ME</a>
                  <a href="mailto:ainduwara76@gmail.com?subject=Project%20Inquiry" className="btn btn-secondary">START A PROJECT</a>
                </div>
                <div className="contact-details">
                  <a href="mailto:ainduwara76@gmail.com">ainduwara76@gmail.com</a>
                  <a href="tel:+94784221925">0784221925</a>
                </div>
              </div>
            </section>
          </main>

          <footer className="site-footer">
            <div>
              <h3>Akila Induwara</h3>
              <p>Graphic Designer & Creative Content Designer</p>
              <p>Graphic Design • Photo Editing • Video Editing • AI Creative • UI Design</p>
            </div>
            <div className="footer-contact">
              <a href="mailto:ainduwara76@gmail.com">Email</a>
              <a href="tel:+94784221925">Phone</a>
            </div>
            <div className="copyright">© 2026 Akila Induwara. All rights reserved.</div>
          </footer>
        </>
      )}

      <aside className={`project-manager ${isManagerOpen ? 'open' : ''}`}>
        <div className="manager-header">
          <div>
            <p className="eyebrow">Project Management</p>
            <h3>{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
          </div>
          <button type="button" className="close-manager" onClick={() => setManagerOpen(false)}>
            ×
          </button>
        </div>

        <div className="manager-body">
          <div className="project-list-panel">
            <div className="list-tools">
              <span>{projectCountLabel}</span>
              <button type="button" className="inline-link" onClick={handleCreateProject}>New</button>
            </div>

            <div className="mini-project-list">
              {projects.map((project, index) => (
                <div key={project.id} className="mini-project-item">
                  <div className="mini-project-info">
                    <strong>{project.title}</strong>
                    <span>{project.category}</span>
                  </div>
                  <div className="mini-actions">
                    <button type="button" onClick={() => handleEditProject(project)}>Edit</button>
                    <button type="button" onClick={() => toggleFeature(project.id)}>{project.featured ? 'Featured' : 'Feature'}</button>
                    <button type="button" onClick={() => handleMoveProject(project.id, 'up')} disabled={index === 0}>↑</button>
                    <button type="button" onClick={() => handleMoveProject(project.id, 'down')} disabled={index === projects.length - 1}>↓</button>
                    <button type="button" className="danger" onClick={() => handleDeleteProject(project.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="project-form-panel">
            <label>
              Project title
              <input value={draftProject.title} onChange={(event) => updateDraftField('title', event.target.value)} />
            </label>

            <div className="two-columns">
              <label>
                Category
                <select value={draftProject.category} onChange={(event) => updateDraftField('category', event.target.value)}>
                  {projectFilters.filter((item) => item !== 'ALL').map((filter) => (
                    <option key={filter} value={filter}>{filter}</option>
                  ))}
                </select>
              </label>
              <label>
                Year
                <input value={draftProject.year} onChange={(event) => updateDraftField('year', event.target.value)} />
              </label>
            </div>

            <label>
              Description
              <textarea value={draftProject.description} onChange={(event) => updateDraftField('description', event.target.value)} rows={3} />
            </label>

            <label>
              Project type
              <input value={draftProject.projectType} onChange={(event) => updateDraftField('projectType', event.target.value)} />
            </label>

            <label>
              Client info
              <input value={draftProject.client} onChange={(event) => updateDraftField('client', event.target.value)} />
            </label>

            <label>
              Objective
              <textarea value={draftProject.objective} onChange={(event) => updateDraftField('objective', event.target.value)} rows={3} />
            </label>

            <label>
              Design process
              <textarea value={draftProject.process} onChange={(event) => updateDraftField('process', event.target.value)} rows={3} />
            </label>

            <label>
              Final result
              <textarea value={draftProject.result} onChange={(event) => updateDraftField('result', event.target.value)} rows={3} />
            </label>

            <label>
              Software / tools used
              <input
                value={draftProject.software.join(', ')}
                onChange={(event) => updateDraftField('software', event.target.value.split(',').map((item) => item.trim()).filter(Boolean))}
              />
            </label>

            <div className="upload-group">
              <label className="upload-box">
                Upload cover image
                <input type="file" accept="image/*" onChange={(event) => handleImageUpload(event, 'cover')} />
              </label>

              <label className="upload-box">
                Upload gallery images
                <input type="file" accept="image/*" multiple onChange={(event) => handleImageUpload(event, 'gallery')} />
              </label>
            </div>

            <div className="image-preview-stack">
              {draftProject.coverImage ? (
                <div className="preview-card">
                  <img src={draftProject.coverImage} alt="Cover preview" />
                  <button type="button" onClick={() => updateDraftField('coverImage', '')}>Remove cover</button>
                </div>
              ) : null}

              {draftProject.galleryImages.length ? (
                <div className="preview-row">
                  {draftProject.galleryImages.map((image, index) => (
                    <div key={`${image}-${index}`} className="preview-card mini">
                      <img src={image} alt="Gallery preview" />
                      <button type="button" onClick={() => updateDraftField('galleryImages', draftProject.galleryImages.filter((_, idx) => idx !== index))}>Remove</button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setManagerOpen(false)}>
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSaveProject}>
                {isEditing ? 'Save Changes' : 'Add Project'}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default App
