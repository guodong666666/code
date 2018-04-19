const Hero = require('../models/hero');
const Type = require("../models/type");
const formidable = require("formidable");
const config = require("../config");
const path = require("path");
const fs = require("fs");

function showList(req, res) {
  Hero.getAll((err, data) => {
    if (err) {
      res.status(500).send("服务器异常，请稍后在重试");
      return;
    }
    res.render("hero/list.html", data);
  });
}

function showDetail(req, res) {
  let id = req.query.id;
  Hero.getById(id, (err, data) => {
    if (err) {
      res.status(500).send("服务器异常，请稍后在重试");
      return;
    }
    res.render("/hero/detail.html", data);

  });
}


function showAdd(req, res) {
  //需要获取所有的类型
  Type.getAll((err, types) => {
    res.render("/hero/add.html", {
      types: types
    });
  });
}


function add(req, res) {

  //获取请求参数
  let form = new formidable.IncomingForm();
  //保存后缀
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files) {
    if (err) {
      res.status(500).send("服务端错误");
      return;
    }

    console.log(files.avatar);

    //将两种图片转存到public目录
    let imgPath = path.join(config.imgPath, path.basename(files.avatar.path));
    let mp3Path = path.join(config.mp3Path, path.basename(files.voice.path)) 
    fs.renameSync(files.avatar.path, imgPath);
    fs.renameSync(files.voice.path, mp3Path);
    
    fields.avatar = "/public/img/"+path.basename(files.avatar.path);
    fields.voice = "/public/mp3/" + path.basename(files.voice.path);

    //添加到hero.json
    Hero.add(fields, err => {
      if (err) {
        res.status(500).send("服务端错误");
        return;
      }

      //重定向到列表页
      res.redirect("/hero/list");
    });

  });

}
module.exports = {
  showList: showList,
  showDetail: showDetail,
  showAdd: showAdd,
  add: add
};