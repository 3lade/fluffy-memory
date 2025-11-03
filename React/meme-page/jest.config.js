// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/', // allow axios to be transformed
  ],
};