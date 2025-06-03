const express = require('express');
const multer = require('multer');
// form-data上传文件支持
const upload = multer();
const router = express.Router();
const options = require("./wp_option");
/*
wp_options参数查询
查询指定参数：
查询 get请求 Query参数 /api/option?optionName=siteurl'
查询 get请求全部 无参数  /api/optionAll
新增 post请求 x-www-form-urlencoded参数/json参数  /api/option，form-data参数需要使用upload处理
修改 put请求 Query参数  /api/option
删除 delete请求 Query参数  /api/option
*/
router.get('/option', options.getOption);
router.get('/optionAll', options.getAllOptions);
router.put('/option', options.updateOption);
router.post('/option', options.createOption);
router.post('/options',  upload.none(), options.createOption);
router.delete('/option', options.deleteOption);

module.exports = router;