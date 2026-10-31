import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const THREE_PACKAGES = /[\\/]node_modules[\\/](three|three-stdlib|@react-three|maath|three-mesh-bvh|camera-controls|troika-[^\\/]+|@monogrid|stats-gl|meshline|zustand|its-fine|suspend-react|react-use-measure|hls\.js)[\\/]/
const REACT_PACKAGES = /[\\/]node_modules[\\/](react|react-dom|scheduler|@babel[\\/]runtime)[\\/]/

const manualChunks = (id) => {
  if (THREE_PACKAGES.test(id)) return 'three'
  if (REACT_PACKAGES.test(id) || id.includes('vite/preload-helper')) return 'react'
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
})
