const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const config = require("../config");

// form-data上传文件支持
const upload = multer();
const router = express.Router();
const loginApi = require("./apis/login");
const menusApi = require("./apis/menus");

// 验证 JWT 的中间件
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Bearer <token>
    
    jwt.verify(token, config.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); 
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // 未提供 token
  }
};


// 公开路由
router.post('/login', loginApi.login);
router.post('/register', loginApi.register);
// 受保护路由
router.get('/menus', authenticateJWT , menusApi.menuLists);

module.exports = router;