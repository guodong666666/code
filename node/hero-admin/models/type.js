//对type的操作
const fs = require('fs');
const path = require("path");


var dbPath = path.join(__dirname, "../db/hero.json");

/**
 * 获取所有的type，返回一个数组
 */
exports.getAll = function(callback) {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if(err) {
      //错误交给回调函数
      return callback(err);
    }

    data = JSON.parse(data || {});

    //将types的结果交给回调函数
    callback(null, data.types);
  });
}