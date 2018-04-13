const handler = require("./handler");

module.exports = (req, res) => {
  let url = req.url;
  let method = req.method.toLowerCase();
  if (url === "/" || url === "/index") {
    handler.showIndex(req, res);
  } else if (url === "/submit") {
    handler.showSubmit(req, res);
  } else if (url === "/add" && method === "post") {
    handler.doSubmit(req, res);
  } else if (url.startsWith("/public")) {
    handler.showStatic(req, res);
  } else {
    handler.show404(req, res);
  }

};