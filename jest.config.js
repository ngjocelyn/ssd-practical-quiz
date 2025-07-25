module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(react-router-dom|react-router)/)", // allow ESM packages
  ],
  moduleFileExtensions: ["js", "jsx"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
};
