const PROXY_CONFIG = [
  {
    context: [
      "/log",
      "/profile",
    ],
    target: "http://localhost:3000",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
