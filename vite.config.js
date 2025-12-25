import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png', 'robots.txt', 'sitemap.xml'], // Make sure logo.png is in public folder
      manifest: {
        name: 'JSON AIO - Developer Tools',
        short_name: 'JSON AIO',
        description: 'Offline JSON Editor, Diff Checker & Converter',
        theme_color: '#111827', // Matches your dark bg
        background_color: '#111827',
        display: 'standalone',
        icons: [
          {
            src: 'logo.png', // We will use your existing logo
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})