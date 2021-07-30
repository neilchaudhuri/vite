import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
const autoprefixer = require("autoprefixer")
const postcss = require("rollup-plugin-postcss")
const url = require("@rollup/plugin-url")
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    cssCodeSplit: false,
    sourcemap: true,
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MyLib',
      fileName: format => `my-lib.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'React'
        }
      }
    }
  }
})
