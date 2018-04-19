const express = require('express');
//导入模块
const bodyParser = require('body-parser')

//新建app示例
let app = express();


// false表示使用默认的querystring来解析表单数据，如果是true表示使用qs来解析表单数据
// querystring是内置模块，qs需要安装
app.use(bodyParser.urlencoded({ extended: false }))

// 创建一个json的解析器，会把参数解析成一个对象，并且挂在到req.body上
app.use(bodyParser.json())


var urlencodedParser = bodyParser.urlencoded({ extended: false });

//配置静态目录
app.use("/static", express.static("node_modules"));
app.use("/static", express.static("public"));


//配置art-template,配置art文件
app.engine('html', require('express-art-template'));

//跳转到login页面
app.get('/login', (req, res) => {
  res.render("login.html");
});

//处理post请求
//express需要配置body-parser插件才能处理post请求的参数
app.post("/login", (req, res) => {
  console.log(req.body);
  res.end("hello world");
});


//监听3000端口
app.listen(3000, () => {
  console.log("服务器启动成功了");
});