import { defineConfig } from "vite";
import { defineConfig as lovableDefineConfig } from "@lovable.dev/vite-tanstack-config";
import { cloudflare } from "@cloudflare/vite-plugin";

const base = lovableDefineConfig();

export default defineConfig({
  ...base,
  plugins: [...(base.plugins ?? []), cloudflare({ viteEnvironment: { name: "ssr" } })],
});
