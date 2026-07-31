/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-use-logical',
    'stylelint-use-nesting',
  ],
  overrides: [
    {
      files: ['**/*.svelte'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    // Svelte uses the `:global(...)` / `:global { }` selector, which is not a standard CSS pseudo-class.
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
    'plugin/declaration-block-no-ignored-properties': true,
    'csstools/use-logical': ['always', { except: ['top', 'right', 'bottom', 'left'] }],
    'csstools/use-nesting': 'always',
  },
};
