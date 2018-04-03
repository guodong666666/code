// http服务器入门
// 访问 /  响应 hello index
// 访问 /register  响应 hello register
// 访问 /login     响应hello login
// 访问 其他        响应hello 404
const http = require("http");

http.createServer((req, res) => {
  let url = req.url;
  res.writeHead(200, {
    "content-type": "text/html;charset=utf-8"
  });
  switch (url) {
    case "/":
      res.end("<h3>hello index</h3>");
      break;
    case "/register":
      res.end("<h3>hello 注册页面</h3>");
      break;
    case "/login":
      res.end("<h3>hello login</h3>");
      break;
    default:
      res.end("<h3>hello 404</h3>");
      break;
  }
  res.end("hello world");
}).listen("3000", err => {
  if(err) throw err;
  console.log("服务器启动成功");
});