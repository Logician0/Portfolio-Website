import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// ❌ REMOVED: vite-plugin-singlefile (This was causing the slow loading)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    // We removed singleFile to allow "Code Splitting"
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // ✅ 1. Enable modern JS targeting for smaller bundles
    target: 'esnext',
    // ✅ 2. Minify with Terser for the smallest possible code size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Removes console.logs for production
        drop_debugger: true,
      },
    },
    // ✅ 3. Advanced Chunking (Split heavy libraries)
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    // ✅ 4. Increase chunk size limit to avoid warnings
    chunkSizeWarningLimit: 1000,
  },
});