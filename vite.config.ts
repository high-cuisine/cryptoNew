import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import {fileURLToPath, URL} from "url";


export default ({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
    plugins: [
        react(),
        {
          name: "strip-if-none-match",
          apply: "serve",
          configureServer(server) {
            server.middlewares.use((req, _res, next) => {
              delete req.headers["if-none-match"];
              next();
            })
          }
        }
    ],
    resolve: {
      alias: [
        { find: '~assets', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
        { find: '~components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
        { find: '~features', replacement: fileURLToPath(new URL('./src/features', import.meta.url)) },
        { find: '~game', replacement: fileURLToPath(new URL('./src/game', import.meta.url)) },
        { find: '~helpers', replacement: fileURLToPath(new URL('./src/helpers', import.meta.url)) },
        { find: '~hooks', replacement: fileURLToPath(new URL('./src/hooks', import.meta.url)) },
        { find: '~pages', replacement: fileURLToPath(new URL('./src/pages', import.meta.url)) },
        { find: '~routes', replacement: fileURLToPath(new URL('./src/routes', import.meta.url)) },
        { find: '~appTypes', replacement: fileURLToPath(new URL('./src/types', import.meta.url)) },
        { find: '~ui-kit', replacement: fileURLToPath(new URL('./src/ui-kit', import.meta.url)) },
      ]
    }
  })
}
