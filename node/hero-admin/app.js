const http = require('http');
const config = require('./config');
const url = require('url');
const mime = require('mime');
const fs = require('fs');
const path = require('path');
const resUtil = require('./utils/ResUtil');
const reqUtil = require('./utils/ReqUtil');
const indexRoute = require("./routes/index");
const heroRoute = require('./routes/hero')


//启动服务
http.createServer((req, res) => {
  resUtil(res);//增强res的功能
  reqUtil(req);//增强req的功能

  
  //判断是否是静态目录
  let isStatic = config.staticPaths.some(item => {
    return req.pathname.startsWith(item);
  });
  if (isStatic) {
    //处理静态资源
    showStatic(req, res);
  }

  indexRoute(req, res);
  heroRoute(req, res);


}).listen(config.port, () => {
  console.log(`服务器启动成功,运行的端口号是${config.port}`);
});

/**
 * 处理静态页面
 * @param {*} req 
 * @param {*} res 
 */
function showStatic(req, res) {
  //读取public下得静态资源
  fs.readFile(path.join(__dirname, req.pathname), (err, data) => {
    if (err) {
      res.end("404, not Found");
      return;
    }

    let type = mime.getType(req.url);

    //设置响应头
    res.writeHead(200, "ok", {
      'content-type': type.startsWith("text/") ? type + ";charset=utf-8" : type
    });
    res.end(data);

  });
}