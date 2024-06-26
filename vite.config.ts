import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

import react from '@vitejs/plugin-react';

dotenv.config();

const serverConfig: { port: number; https?: { key: Buffer; cert: Buffer } } = {
    port: 8443,
};

if (process.env.DEV_PEM_PATH && process.env.CERT_PEM_PATH) {
    serverConfig.https = {
        key: fs.readFileSync(path.resolve(process.env.DEV_PEM_PATH)),
        cert: fs.readFileSync(path.resolve(process.env.CERT_PEM_PATH)),
    };
}

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'deriv-com': ['@deriv-com/api-hooks', '@deriv-com/utils'],
                    react: ['react', 'react-dom'],
                },
            },
        },
    },
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@cfd': path.resolve(__dirname, './src/cfd/'),
        },
    },
    server: serverConfig,
});
