const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = (options, webpack) => {
  const lazyImports = [
    "@nestjs/microservices/microservices-module",
    "@nestjs/websockets/socket-module",
    "@nestjs/platform-express",
    "@nestjs/common",
    "@nestjs/config",
    "@nestjs/core",
    "@nestjs/typeorm"
  ];

  return {
    ...options,
    externals: [],
    mode: "production",
    plugins: [
      ...options.plugins,
      new Dotenv({ path: "./.env.aws" }),
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        }
      })
    ],
    output: {
      ...options.output,
      libraryTarget: "commonjs2",
      path: path.resolve(__dirname, "dist"),
      filename: "index.js"
    }
  };
};
