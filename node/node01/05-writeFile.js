// node具有文件读写的能力

//Node中除了最基本的EcmaScript可以直接使用。例如Date、Math、Array等

//node还提供了特定的编程接口，这些接口被封装到了一个一个的模块中,这些模块不能
//直接使用，例如fs、http、path等模块。需要引入了才能使用。

//先加载fs模块(对象中有所有文件操作的所有api)
const fs = require("fs");

//参数1：写入的文件路径，如果没有会新建，如果有，会覆盖。
//参数2：写入的内容
//参数3：编码
//参数4：写入的回调函数，如果失败，err中会有失败的消息，如果没有目录，不会创建目录，会报错
fs.writeFile("data.txt", "你好世界", "utf-8", err => {
  if (err) {
    throw err;
  }
  console.log("ok");
})