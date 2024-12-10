module.exports = {
  '**/*.{ts,tsx}': ['pnpm fix:eslint', 'git add --force'],
  '**/*.scss': ['pnpm fix:stylelint', 'git add --force'],
  '**/*.{js,mjs,json,css,scss}': ['pnpm prettier', 'git add --force'],
};
