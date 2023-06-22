module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:nuxt/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": 0,
    'vue/multi-word-component-names': 'off',
    "vue/order-in-components": 0,
    "vue/require-explicit-emits": 0,
    "vue/v-on-event-hyphenation": 0,
  },
  settings: {
    'import/resolver': {
      nuxt: {
        extensions: ['.js', '.ts', '.vue'],
      },
    },
  },
};