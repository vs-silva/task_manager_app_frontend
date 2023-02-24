import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // @ts-ignore
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests-setup.js',
        coverage: {
            provider: 'c8',
            reporter: ['text', 'json', 'html'],
        },
    },
});
