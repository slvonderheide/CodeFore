module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn', // Keep as a warning
    'react/prop-types': 'off', // Already disabled
    '@typescript-eslint/no-unused-vars': 'off', // Disable unused variable checks
    'no-console': 'warn', // Allow console logs but show a warning
    'no-debugger': 'off', // Allow debugger statements
  },
}
