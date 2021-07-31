import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
const path = require('path')
import eslint from '@rollup/plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        reactRefresh(),
        eslint()
    ],
    build: {
        cssCodeSplit: false,
        sourcemap: true,
        minify: false,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'react-component-library',
            fileName: format => `components.${format}.js`
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['react'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    react: 'React'
                }
            }
        }
    }
})
