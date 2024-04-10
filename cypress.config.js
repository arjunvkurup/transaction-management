const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env: {
    apiUrl: 'http://localhost:3000/api/v1',
  },
  e2e: {
    setupNodeEvents(on, config) { },
    supportFile: false,
    baseUrl: 'http://localhost:3001/api/v1',
  },
})
