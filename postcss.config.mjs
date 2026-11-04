// Tailwind first, then a small local step that keeps the styles working on
// older phones (see postcss-old-phones.cjs).
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "./postcss-old-phones.cjs": {},
  },
};

export default config;
