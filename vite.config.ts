import { defineConfig as viteDefineConfig } from "vite";
import { defineConfig as lovableDefineConfig } from "@lovable.dev/vite-tanstack-config";
import { cloudflare } from "@cloudflare/vite-plugin";

const base = lovableDefineConfig();

export default viteDefineConfig({
  ...base,
  plugins: [...(base.plugins || []), cloudflare()],
});
