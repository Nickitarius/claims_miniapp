import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import basicSsl from '@vitejs/plugin-basic-ssl';
import Terminal from 'vite-plugin-terminal';
import mkcert from 'vite-plugin-mkcert';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // basicSsl(),
    // mkcert(),
    Terminal({
      console: 'terminal',
      output: ['terminal', 'console'],
    }),
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
      // cert: readFileSync(resolve('./secrets/full.chain.pem')),
      // // cert: readFileSync(resolve('./secrets/cert.crt')),
      // key: readFileSync(resolve('./secrets/cert.key')),

      cert: readFileSync(resolve('./secrets/example.cert.pem')),
      // cert: readFileSync(resolve('./secrets/cert.crt')),
      key: readFileSync(resolve('./secrets/example.key.pem')),
    },
  },
});
