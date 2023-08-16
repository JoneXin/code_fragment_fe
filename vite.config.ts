import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import vitePluginImp from 'vite-plugin-imp';
// import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: path.resolve(__dirname, 'src'),
            },
        ],
    },
    css: {
        preprocessorOptions: {
            less: {
                // modifyVars: { '@textcolor': '#13c2c2' },
                javascriptEnabled: true,
            },
        },
    },
    server: {
        port: 8000,
        proxy: {
            '/api': {
                target: `http://127.0.0.1:8888`,
                changeOrigin: true,
                // rewrite: path => path.replace(/^\/api/, ''),
            },
        },
        host: true,
    },
});
