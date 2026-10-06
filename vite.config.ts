import { defineConfig } from 'vite-plus'

export default defineConfig({
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://release-v1-1-0-viteplus-dev.voidzero-docs.workers.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
    server: { deps: { inline: ['@devframes/service-open'] } },
  },
  staged: {
    '*': 'vp check --fix',
  },
  pack: {
    deps: {
      // tsdown <0.23 compatibility: resolve external dependency subpaths.
      // Remove to preserve subpath imports as written (the new default).
      // https://tsdown.dev/options/dependencies#deps-resolvedepsubpath
      resolveDepSubpath: true,
    },
    entry: ['src/*.ts'],
    dts: true,
    format: ['esm', 'cjs'],
    clean: true,
    outputOptions: {
      exports: 'named',
    },
    onSuccess: 'vp run build:client',
  },
  lint: {
    plugins: ['unicorn', 'typescript', 'oxc', 'vue', 'vitest'],
    categories: {
      correctness: 'error',
      suspicious: 'warn',
      perf: 'warn',
    },
    rules: {
      'no-console': 'off',
      'no-await-in-loop': 'off',
      'unicorn/no-array-sort': 'off',
      'no-restricted-globals': 'error',
      'typescript/consistent-type-imports': 'error',
      'prefer-add-event-listener': 'off',
    },
    ignorePatterns: [
      '.output/**',
      '.data/**',
      '.nuxt/**',
      '.nitro/**',
      '.cache/**',
      'dist/**',
      'node_modules/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
  fmt: {
    semi: false,
    singleQuote: true,
    arrowParens: 'avoid',
    quoteProps: 'consistent',
  },
})
