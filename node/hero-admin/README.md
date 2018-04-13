# 路由设计
| 请求路径         | 请求方法 | 查询参数 | 说明        | 备注   |
| ------------ | ---- | ---- | --------- | ---- |
| /            | GET  | 无    | 首页渲染     | 无    |
| /hero        | GET  | 无    | 渲染英雄列表    | 无    |
| /hero/add    | GET  | 无    | 跳转到添加英雄页面 | 无    |
| /hero/add    | POST |      | 添加英雄      | 无    |
| /hero/edit   | GET  | id   | 跳转到英雄编辑页  | 无    |
| /hero/edit   | POST |      | 英雄编辑      | 无    |
| /hero/delete | GET  | id   | 删除英雄      | 无    |

# 启动服务

## 启动服务

在`app.js`中，书写以下代码
```javascript
const http = require('http');

//启动服务
http.createServer((req, res) =>{

  //开始代码
  
}).listen(3000, () => {
  console.log("服务器启动成功");
});
```

## 使用config.js
> 在上面的代码中，可能要对端口号这种配置经常修改，因此可以把这种常用的配置写到一个单独的文件`config.js`中

```javascript
module.exports = {
  port: 3000,  
}
```

修改`app.js`
```javascript
const http = require('http');
const config = require('./config');

//启动服务
http.createServer((req, res) => {



}).listen(config.port, () => {
  console.log(`服务器启动成功,运行的端口号是${config.port}`);
});
```

## 配置npm start
在`package.json`中增加start命令
```javascript
  "scripts": {
    "start": "node app.js",
    "abc": "node app.js"
  },
```

注意`start`比较特殊，可以直接使用`npm start`命令启动，如果是自定义的命令，比如`abc`，需要使用`npn run abc`进行启动。