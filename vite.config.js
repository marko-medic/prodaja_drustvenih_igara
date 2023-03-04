// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';

import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@aseti': path.resolve(__dirname, './src/@aseti'),
      '@stranice': path.resolve(__dirname, './src/@stranice'),
      '@komponente': path.resolve(__dirname, './src/@komponente'),
      '@helperi': path.resolve(__dirname, './src/@helperi'),
      '@store': path.resolve(__dirname, './src/@store'),
      '@storage': path.resolve(__dirname, './src/@storage'),
      '@servisi': path.resolve(__dirname, './src/@servisi'),
      '@hooks': path.resolve(__dirname, './src/@hooks'),
      '@remote': path.resolve(__dirname, './src/@remote'),
    },
  },
});
