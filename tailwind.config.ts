import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ["Archivo Black", "sans-serif"],
        body: ["Source Sans 3", "sans-serif"],
      },
      maxWidth: {
        marketing: "var(--layout-marketing-max)",
        task: "var(--layout-task-max)",
      },
    },
  },
  plugins: [],
};

export default config;
