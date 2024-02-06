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
router.get('/option', options.query);
/*更新wp_options参数查询*/ 
router.put('/option', options.update);
/*插入更新wp_options参数查询*/
router.post('/option', options.add);
/*删除*/
router.delete('/option', options.delete);

module.exports = router;