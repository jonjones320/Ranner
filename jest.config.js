module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js'],
    moduleNameMapper: {
      // Handle CSS imports (if you're using CSS in your components)
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      // Handle image imports
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
      // Handle module aliases (if you're using them)
      '^@/(.*)$': '<rootDir>/src/$1'
    },
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest'
    },
    testMatch: [
      '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
      '<rootDir>/src/**/*.{spec,test}.{js,jsx}'
    ],
    moduleFileExtensions: ['js', 'jsx'],
    // Optional: Configure coverage
    collectCoverageFrom: [
      'src/**/*.{js,jsx}',
      '!src/main.jsx',
      '!src/vite-env.d.ts',
      '!**/*.d.ts',
      '!**/node_modules/**'
    ]
  };