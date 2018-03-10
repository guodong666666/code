const http = require("http");
const fs = require("fs");
const path =require("path");

http.createServer((req, res) => {

  let url = req.url;
  if (url === "/login") {
    fs.readFile(path.join(__dirname, "/pages/login.html"), (err, data) => {
      if(err) {
        throw err;
      }
      res.end(data);
    })
  } else if (url === "/user") {
    fs.readFile(path.join(__dirname, "/pages/user.html"), (err, data) => {
      if(err) {
        throw err;
      }
      res.end(data);
    })
  } else if (url === "/" || url === "/index.html") {
    fs.readFile(path.join(__dirname, "/pages/index.html"), (err, data) => {
      if(err) {
        throw err;
      }
      res.end(data);
    })
  } else {
    fs.readFile(path.join(__dirname, "/pages/error.html"), (err, data) => {
      if(err) {
        throw err;
      }
      res.end(data);
    })
  }

}).listen("80", err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("服务器启动成功");
})