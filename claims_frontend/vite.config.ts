import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import Terminal from 'vite-plugin-terminal';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Terminal({
    //   console: 'terminal',
    //   output: ['terminal', 'console'],
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 3600,
    https: {
      cert: readFileSync(resolve('./secrets/example.cert.pem')),
      key: readFileSync(resolve('./secrets/example.key.pem')),
    },
  },
});
