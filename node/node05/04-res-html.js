// http服务器入门
//响应静态页面
const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
  let url = req.url;
  res.writeHead(200, {
    "content-type": "text/html;charset=utf-8"
  });
  switch (url) {
    case "/":
      //读取首页的内容响应
      fs.readFile("./static/index.html", (err, data) => {
        if(err) throw err;
        res.end(data);
      });
      break;
    case "/register":
      //读取注册的内容响应
      fs.readFile("./static/register.html", (err, data) => {
        if(err) throw err;
        res.end(data);
      });
      break;
    case "/login":
      //读取登陆的内容响应
      fs.readFile("./static/login.html", (err, data) => {
        if(err) throw err;
        res.end(data);
      });
      break;
    default:
      //读取404的内容响应
      fs.readFile("./static/404.html", (err, data) => {
        if(err) throw err;
        res.end(data);
      });
      break;
  }
}).listen("3000", err => {
  if(err) throw err;
  console.log("服务器启动成功");
});