import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const repoName = env.GITHUB_REPOSITORY?.split('/')[1] || ''

  return {
    base: process.env.GITHUB_ACTIONS && repoName ? `/${repoName}/` : './',
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 4176,
    },
  }
})
