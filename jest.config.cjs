module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "clover"],
};
