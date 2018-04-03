// http服务器入门
// 访问 /  响应 hello index
// 访问 /register  响应 hello register
// 访问 /login     响应hello login
// 访问 其他        响应hello 404
const http = require("http");

http.createServer((req, res) => {
  let url = req.url;
  switch (url) {
    case "/":
      res.end("hello index");
      break;
    case "/register":
      res.end("hello register");
      break;
    case "/login":
      res.end("hello login");
      break;
    default:
      res.end("hello 404");
      break;
  }
  res.end("hello world");
}).listen("3000", err => {
  if(err) throw err;
  console.log("服务器启动成功");
});