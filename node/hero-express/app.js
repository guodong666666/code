const express = require("express");
const bodyParser = require("body-parser");
const heroRouter = require("./routes/hero");

//创建app
let app = express();

//处理静态资源
app.use("/public", express.static('public'));
app.use("/node_modules", express.static('node_modules'));

//配置art-template,配置html后缀文件，使用express-art-template模板引擎
app.engine('html', require('express-art-template'));

//使用body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//使用路由对象
app.use(heroRouter);


//启动服务
app.listen(3000, () => {
  console.log("服务器启动成功了");
})