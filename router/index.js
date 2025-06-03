const express = require('express');
const router = express.Router();
const options = require("./wp_option");
/*
wp_options参数查询
查询指定参数：
http://localhost:3000/api/option?optionName=siteurl'
查询默认参数
http://localhost:3000/api/option
*/
router.get('/option', options.getOption);
/*更新wp_options参数查询*/ 
router.put('/option', options.updateOption);
/*插入更新wp_options参数查询*/
router.post('/option', options.createOption);
/*全部*/
router.get('/optionAll', options.getAllOptions);
/*删除*/
router.delete('/option', options.deleteOption);


module.exports = router;