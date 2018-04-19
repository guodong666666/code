const heroController = require('../controllers/hero')

//处理首页的路由
module.exports = function (req, res) {
  let pathname = req.pathname;
  let method = req.method.toLowerCase();
  if (pathname == "/hero/list") {
    heroController.showList(req, res);
  } else if (pathname == "/hero/view") {
    heroController.showDetail(req, res);
  } else if (pathname == "/hero/add" && method == "get") {
    heroController.showAdd(req, res);
  } else if (pathname == "/hero/add" && method == "post") {
    heroController.add(req, res);
  }
}