const http = require('http');
const config = require('./config');

//启动服务
http.createServer((req, res) => {



}).listen(config.port, () => {
  console.log(`服务器启动成功,运行的端口号是${config.port}`);
});