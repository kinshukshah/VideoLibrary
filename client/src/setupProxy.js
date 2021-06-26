const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
//const app = express();

module.exports = function (app) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    // dev code
    app.use(
      "/api",
      createProxyMiddleware({
        target: "http://localhost:5000",
        //target: "https://play-videolibrary.herokuapp.com",
        changeOrigin: true,
      })
    );
  } else {
    // production code
    app.use(
      "/api",
      createProxyMiddleware({
        //target: "http://localhost:5000",
        target: "https://play-videolibrary.herokuapp.com",
        changeOrigin: true,
      })
    );
  }
};
