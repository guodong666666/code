//对hero.json实现增删改查
const fs = require('fs');
const path = require("path");


var dbPath = path.join(__dirname, "../db/hero.json");


/**
 * 返回所有的英雄数据
 * @param {function} callback 
 */
function getAll(callback) {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    let heros = data.heros;
    let types = data.types;
    heros.forEach(item => {

      //查找对应的类型
      let type = types.find(type => {
        return item.type == type.id;
      });

      item.type = type.type;

    });
    callback(null, data);
  });
}

/**
 * 根据id获取数据
 * @param {string} id 
 * @param {function} callback 
 */
function getById(id, callback) {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    //查找对应的英雄
    let hero = data.heros.find(item => {
      return item.id == id;
    });

    //查找改英雄的类型
    let type = data.types.find(type => {
      return type.id == hero.type;
    });

    hero.type = type.type;

    callback(null, hero);


  });
}

function add(fileds, callback) {
  //将fileds添加到hero.json文件中
  //设置id
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    fileds.id = data.heros[data.heros.length - 1].id * 1 + 1;

    data.heros.push(fileds);

    fs.writeFile(dbPath, JSON.stringify(data), err => {
      if(err) throw err;

      callback(null);
    })
  });
}

module.exports = {
  getAll: getAll,
  getById: getById,
  add: add
}