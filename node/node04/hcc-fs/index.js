const fs = require("fs");

//异步的读取一个文件
//参数一：读取的文件路径
//参数二：回调函数
// fs.readFile("./data.txt", (err,data) => {
//   if(err) throw err;//回调函数的第一个参数，表示错误信息，如果是null，表示没有错误
//   console.log(data);//回调函数第二个参数，读取到得文件内容（是一个buffer对象），可以说文本内容，也可以是视频音频的内容
//   console.log(data.toString("utf-8"));//如果读取的文本文件，可以将文本内容转换成utf-8格式的字符串。
// });


//参数一：读取的文件路径
//参数二：读取的内容的编码（只有文本文件的时候才会传递这个参数）
//参数三：回调函数
// fs.readFile("./data.txt", "utf-8", (err, data) => {
//   if(err) throw err;
//   console.log(data);//data可以直接获取到字符串格式的内容
// });

// let data = fs.readFileSync("./data.txt", "utf-8");
// console.log(data);

// fs.writeFile("./data.txt", "我是清流", err => {
//   if(err) throw err;
//   console.log("文件写入成功了")
// });

// try {
//   fs.writeFileSync("./data.txt", "我是清流");
//   console.log("文件写入成功");
// } catch (e) {
//   throw e;
// }

// fs.rename("./data.txt", "./data1.txt", err => {
//   if(err) throw err;
//   console.log("重命名成功");
// });


// //将data.txt文件移动到data目录下，注意data目录不存在会报错
// fs.rename("./data.txt", "./data/data.txt", err => {
//   if(err) throw err;
//   console.log("重命名成功");
// });


// fs.renameSync("./data.txt", "./data1.txt");

// fs.unlink("./data1.txt", err => {
//   console.log("文件删除成功");
// });

// fs.mkdir("./demo1", err => {
//   console.log("文件夹创建成功");
// });

// fs.mkdirSync("./demo2");

// fs.rmdir("./demo", err => {
//   if(err) throw err;
//   console.log("删除成功");
// });


// fs.readdir("./demo", (err, files) => {
//   if(err) throw err;
//   console.log(files);
// });


fs.stat("./index.js", (err, status) => {
  if(err) throw err;
  if(status.isFile()) {
    console.log("是文件");
  }else if(status.isDirectory()) {
    console.log("是目录");
  }
});


