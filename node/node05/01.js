// http服务器入门

const http = require("http");

http.createServer((req, res) => {
  res.end("hello world");
}).listen("3000", err => {
  if(err) throw err;
  console.log("服务器启动成功");
});