const express = require("express");
const heroHandler = require("../controllers/hero");
let router = express.Router();

//处理首页请求
router.get('/', heroHandler.showIndex);

//处理英雄列表请求
router.get("/hero/list", heroHandler.showList);

//处理查看英雄详情的请求
router.get("/hero/view", heroHandler.showDetail);

//处理get请求的添加页面
router.get("/hero/add", heroHandler.showAdd);

//处理post请求的添加功能
router.post("/hero/add", heroHandler.add);

//处理get请求的edit页面
router.get("/hero/edit", heroHandler.showEdit);

//处理post方式的edit请求
router.post("/hero/edit", heroHandler.edit);

//处理get方式的删除请求
router.get("/hero/delete", heroHandler.delete);

module.exports = router;