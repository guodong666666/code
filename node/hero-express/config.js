const path = require("path");

module.exports = {
  port: 3000,//启动端口
  staticPaths: ['/public', '/assets', '/node_modules'], //静态资源目录
  imgPath: path.join(__dirname, "/public/img/"),
  mp3Path: path.join(__dirname, "/public/mp3")
}