const path = require("path");
const fs = require("fs");
const template = require("art-template");
const querystring = require("querystring");
const moment = require("moment");
const mime = require("mime");

let dbPath = path.join(__dirname, 'data', "data.json");
/**
 * 显示首页
 * @param {*} req 
 * @param {*} res 
 */
function showIndex(req, res) {
  //读取views下的feedback.html文件
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      res.end("404, not Found");
      return;
    }
    let tpl = template(path.join(__dirname, "views", "feedback.html"), JSON.parse(data));
    res.end(tpl);
  });
}

/**
 * 显示提交页面
 * @param {*} req 
 * @param {*} res 
 */
function showSubmit(req, res) {
  //读取views下的form.html文件
  fs.readFile(path.join(__dirname, 'views', "form.html"), (err, data) => {
    if (err) {
      res.end("404, not Found");
      return;
    }
    res.end(data);
  });
}

/**
 * 处理提交请求
 * @param {*} req 
 * @param {*} res 
 */
function doSubmit(req, res) {
  let postData = "";
  //注册data事件,会触发多次
  req.on("data", chunk => {
    postData += chunk;
  });

  //注册end事件
  req.on("end", () => {
    //在end事件中表示代码提交完成了
    //使用querystring模块处理post请求的数据
    let result = querystring.parse(postData);
    result.time = moment().format("YYYY-MM-DD hh:mm:ss");

    //把结果写入到data.json中
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) throw err;
      let temp = JSON.parse(data);
      temp.message.unshift(result);

      fs.writeFile(dbPath, JSON.stringify(temp), err => {
        if (err) throw err;
        //如果文件写入成功了，跳转到首页
        res.writeHead(302, {
          "location": "/"
        });
        res.end();
      });
    });

  });
}

/**
 * 处理静态页面
 * @param {*} req 
 * @param {*} res 
 */
function showStatic(req, res) {
  //读取public下得静态资源
  fs.readFile(path.join(__dirname, req.url), (err, data) => {
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

/**
 * 处理错误页面
 * @param {*} req 
 * @param {*} res 
 */
function show404(req, res) {
  //读取404页面
  fs.readFile(path.join(__dirname, 'views', "404.html"), (err, data) => {
    if (err) {
      res.end("404, not Found");
      return;
    }
    res.end(data);
  });
}

module.exports = {
  showIndex: showIndex,
  showSubmit: showSubmit,
  doSubmit: doSubmit,
  showStatic: showStatic,
  show404: show404
};