import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: /^react-native$/, replacement: "react-native-web" }],
    extensions: [".web.tsx", ".web.ts", ".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  optimizeDeps: {
    exclude: ["react-native"],
    include: ["react-native-web"],
  },
  server: {
    // CodeSandbox runs on *.csb.app
    port: 3000,
    strictPort: true,
    host: true,
    allowedHosts: [".csb.app"],
  },
  preview: {
    // Vite preview (vite preview) also needs this
    port: 3000,
    strictPort: true,
    allowedHosts: [".csb.app"],
  },
});
