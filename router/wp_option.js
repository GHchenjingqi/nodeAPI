let db = require("../db/config");
let comFun = require('../utill/comFun');
// 基础配置接口
let options = {
    // 查询
    query(req, res){
        let params = req.query.name;
        let resDate={};
        let sql = `select * from wp_options where option_name  in('siteurl' ,'blogname' ,'blogdescription','current_theme' ,'admin_email','QUI_Theme')`;
        if(params && params !=""){
            sql = `select * from wp_options where option_name='${params}'`;
        }
        db(sql).then((data) => {
            let getData = comFun.arrToObj(data);
            resDate = {
                status:"200",
                messages:"成功",
                data:getData
            }
            res.send(resDate)
        }).catch((err) => {
            resDate = {
                status:"203",
                messages:"失败",
                error:err
            }
            res.send(resDate)
        })
    },
    // 修改
    update(req,res){
        let name = req.body.name;
        let val = req.body.value;
        let resDate={};
        let sql = `UPDATE wp_options SET option_value='${val}'  WHERE option_name='${name}'`;
        db(sql,'update').then((data) => {
                resDate = {
                    status:"200",
                    messages:"修改成功",
                }
                res.send(resDate);
        }).catch((err) => {
            resDate = {
                status:"203",
                messages:"失败",
                error:err
            }
            res.send(resDate)
        })
    },
    // 添加
    add(req,res){
        let name = req.body.name;
        let val = req.body.value;
        let resDate={};
        let sql = `select * from wp_options where option_name='${name}'`;
        db(sql).then((data) => {
            if(Array.isArray(data)  && data.length>0 && data[0].option_name == name){
                resDate = {
                    status:"201",
                    messages:`${name}已经存在，不允许新增！`
                }
                res.send(resDate);
            }else{
                sql = `INSERT INTO wp_options (option_name,option_value) VALUES ('${name}','${val}')`;
                db(sql,'insert').then((data) => {
                        resDate = {
                            status:"200",
                            messages:"新增成功！"
                        }
                        res.send(resDate);
                }).catch((err) => {
                    resDate = {
                        status:"203",
                        messages:"失败",
                        error:err
                    }
                    res.send(resDate)
                 })
            }
        })
        
    },
    // 删除
    delete(req,res){
        let name = req.body.name;
        let resDate={};
        let sql = `select * from wp_options where option_name='${name}'`;
        db(sql).then((data) => {
            if(Array.isArray(data)  && data.length>0 && data[0].option_name == name){
                sql = `DELETE FROM wp_options WHERE option_name='${name}'`;
                db(sql,'delete').then((data) => {
                        resDate = {
                            status:"200",
                            messages:"删除成功！"
                        }
                        res.send(resDate);
                }).catch((err) => {
                    resDate = {
                        status:"203",
                        messages:"删除成功！",
                        error:err
                    }
                    res.send(resDate)
                })
            }else{
                resDate = {
                    status:"202",
                    messages:`${name}不存在，删除失败！`
                }
                res.send(resDate);
            }
            
        })
        
    },
}

module.exports = options