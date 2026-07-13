module.exports = {
  default: {
    formatOptions: {
      snippetInterface: "async-await"
    },
    paths: [
      "features/**/*.feature"
    ],
    require: [
      "steps/**/*.ts",
      "hooks/**/*.ts"
    ],
    requireModule: [
      "ts-node/register"
    ],
    // Increase timeout to 15 seconds to prevent the "promise resolves within 5000ms" error
    timeout: 12000 
  }
};