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
        promociones: resolve(__dirname, 'HTML/promociones.html'),
        servicios: resolve(__dirname, 'HTML/servicios.html'),
        precios: resolve(__dirname, 'HTML/precios.html'),
        habitaciones: resolve(__dirname, 'HTML/habitaciones.html'),
        galeria: resolve(__dirname, 'HTML/galeria.html'),
        resenas: resolve(__dirname, 'HTML/resenas.html'), // Changed from reseñas.html
        contacto: resolve(__dirname, 'HTML/contacto.html'),
        reserva: resolve(__dirname, 'HTML/reserva.html'),
        mapa: resolve(__dirname, 'HTML/mapa.html'),
        ejecutiva: resolve(__dirname, 'HTML/ejecutiva.html'),
        superior: resolve(__dirname, 'HTML/superior.html'),
        superiorplus: resolve(__dirname, 'HTML/superiorplus.html'),
        seniorsuite: resolve(__dirname, 'HTML/seniorsuite.html'),
        nochedebodas: resolve(__dirname, 'HTML/nochedebodas.html'),
        aniversario: resolve(__dirname, 'HTML/aniversario.html'),
        sanvalentin: resolve(__dirname, 'HTML/sanvalentin.html'),
        renuevate: resolve(__dirname, 'HTML/renuevate.html'),
        relajate: resolve(__dirname, 'HTML/relajate.html'),
        refrescate: resolve(__dirname, 'HTML/refrescate.html')
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