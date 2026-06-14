import { defineConfig as lovableDefineConfig } from "@lovable.dev/vite-tanstack-config";

export default lovableDefineConfig({
  nitro: true,
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("fuse.js")) return "search";
              if (id.includes("lucide-react")) return "icons";
              if (id.includes("sonner")) return "toast";
            }
          },
        },
      },
    },
  },
});
