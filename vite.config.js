import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { countriesHandler } from './api/countries.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'REST_COUNTRIES_')
  const installApi = (server) => {
    server.middlewares.use((req, res, next) => {
      if (new URL(req.url, 'http://localhost').pathname !== '/api/countries') return next()
      return countriesHandler(req, res, env.REST_COUNTRIES_API_KEY)
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
