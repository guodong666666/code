const express = require('express');

//新建app示例
let app = express();

//配置art-template,配置art文件
app.engine('art', require('express-art-template'));

//配置静态目录
app.use("/static", express.static("node_modules"));
app.use("/static", express.static("public"));

//监听get类型的/路径请求
app.get('/', (req, res) => {
  res.render('index.art', {
    user: {
      name:"zs",
      age:18
    },
    friends: ["张三", "李四", "王五"]
  });
});

//监听3000端口
app.listen(3000, () => {
  console.log("服务器启动成功了");
});