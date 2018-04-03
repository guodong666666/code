const express = require("express");

let app = express();

app.get("/index", (req, res, next) => {
  console.log("访问首页了");
  res.send("我先响应了，89888");
  return;
  next();
}, (req, res) => {
  console.log("我继续处理");
  res.send("哈哈哈");
});


app.listen(8080, function() {
  console.log("服务器启动成功了");
});