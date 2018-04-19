const Hero = require('../models/hero');
const Type = require("../models/type");
const formidable = require("formidable");
const config = require("../config");
const path = require("path");
const fs = require("fs");

//显示首页
function showIndex(req, res) {
  res.render("index.html");
}

//处理英雄列表请求
function showList(req, res) {
  Hero.getAll((err, data) => {
    if (err) {
      res.status(500).send("服务器异常，请稍后在重试");
      return;
    }
    res.render("hero/list.html", data);
  });
}

//处理查看英雄详情
function showDetail(req, res) {
  let id = req.query.id;
  Hero.getById(id, (err, data) => {
    if (err) {
      res.status(500).send("服务器异常，请稍后在重试");
      return;
    }
    res.render("hero/detail.html", data);
  });
}

//处理get请求的添加页面
function showAdd(req, res) {
  //需要获取所有的类型
  Type.getAll((err, types) => {
    res.render("hero/add.html", {
      types: types
    });
  });
}

//处理post请求的添加功能
function add(req, res) {
  //获取请求参数
  let form = new formidable.IncomingForm();
  //保存后缀
  form.keepExtensions = true;
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.status(500).send("服务端错误");
      return;
    }
    //将两种图片转存到public目录
    let imgPath = path.join(config.imgPath, path.basename(files.avatar.path));
    let mp3Path = path.join(config.mp3Path, path.basename(files.voice.path))
    fs.renameSync(files.avatar.path, imgPath);
    fs.renameSync(files.voice.path, mp3Path);

    fields.avatar = "/public/img/" + path.basename(files.avatar.path);
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

//处理get方式的edit请求
function showEdit(req, res) {
  let id = req.query.id;
  Hero.getById(id, (err, hero) => {
    if (err) {
      res.status(500).send("服务器异常，请稍后在重试");
      return;
    }
    Type.getAll((err, types) => {
      if (err) {
        res.status(500).send("服务器异常，请稍后在重试");
        return;
      }

      res.render("hero/edit.html", {
        hero: hero,
        types: types
      });
    })

  });
}

//处理编辑请求
//如果修改了enctype，req.body获取不到数据
function edit(req, res) {
  //获取请求参数
  let form = new formidable.IncomingForm();
  //保存后缀
  form.keepExtensions = true;

  form.parse(req, function (err, fields, files) {
    if (err) {
      res.status(500).send("服务端错误");
      return;
    }

    //用户可能没有上传图片
    if (files.avatar.size != 0) {
      let imgPath = path.join(config.imgPath, path.basename(files.avatar.path));
      fs.renameSync(files.avatar.path, imgPath);
      fields.avatar = "/public/img/" + path.basename(files.avatar.path);
    } else {
      //如果用户没有上传
      fields.avatar = fields.old_avatar;
    }
    delete fields.old_avatar;

    if (files.voice.size != 0) {
      let mp3Path = path.join(config.mp3Path, path.basename(files.voice.path))
      fs.renameSync(files.voice.path, mp3Path);
      fields.voice = "/public/mp3/" + path.basename(files.voice.path);
    } else {
      fields.voice = fields.old_voice;
    }
    delete fields.old_voice;

    //添加到hero.json
    Hero.edit(fields, err => {
      if (err) {
        res.status(500).send("服务端错误");
        return;
      }
      //重定向到列表页
      res.redirect("/hero/list");
    });

  });
}

function deleteHero(req, res) {
  let id = req.query.id;
  Hero.delete(id, err => {
    if (err) {
      res.status(500).send("服务端错误");
      return;
    }
    //重定向到列表页
    res.redirect("/hero/list");
  });

}

module.exports = {
  showIndex: showIndex,
  showList: showList,
  showDetail: showDetail,
  showAdd: showAdd,
  add: add,
  showEdit: showEdit,
  edit: edit,
  delete: deleteHero
};