import { ConfigEnv, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig(({mode}: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), eslint({})],
    build: {
      outDir: "demo",
    },
    server: {
      host: true,
      // port: parseInt(env.PORT ?? "9100", 10),
      // strictPort: true,
    },
  }
});