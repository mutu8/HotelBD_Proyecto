import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        promociones: resolve(__dirname, 'pages/promociones.html'),
        servicios: resolve(__dirname, 'pages/servicios.html'),
        precios: resolve(__dirname, 'pages/precios.html'),
        habitaciones: resolve(__dirname, 'pages/habitaciones.html'),
        galeria: resolve(__dirname, 'pages/galeria.html'),
        resenas: resolve(__dirname, 'pages/resenas.html'),
        contacto: resolve(__dirname, 'pages/contacto.html'),
        reserva: resolve(__dirname, 'pages/reserva.html'),
        // Add other pages as needed
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'assets'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@js': resolve(__dirname, 'src/js'),
      '@components': resolve(__dirname, 'src/components')
    }
  }
})