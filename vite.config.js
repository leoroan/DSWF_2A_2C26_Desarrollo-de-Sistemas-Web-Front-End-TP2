import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { countriesHandler } from './api/countries.js'
import { cityPhotoHandler } from './api/city-photo.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const installApi = (server) => {
    server.middlewares.use((req, res, next) => {
      const pathname = new URL(req.url, 'http://localhost').pathname
      if (pathname === '/api/countries') {
        return countriesHandler(req, res, env.REST_COUNTRIES_API_KEY)
      }
      if (pathname === '/api/city-photo') {
        return cityPhotoHandler(req, res, env.UNSPLASH_ACCESS_KEY)
      }
      return next()
    })
  }
  return {
    plugins: [react(), {
      name: 'local-countries-api',
      configureServer: installApi,
      configurePreviewServer: installApi,
    }],
  }
})
