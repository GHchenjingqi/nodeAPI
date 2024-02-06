let comFun = {
    arrToObj(arr){
        let res = {}
        if(Array.isArray(arr) && arr.length>0){
            arr.forEach(item =>{
                res[item.option_name] = item.option_value;
                res.id = item.option_id;
            })
        }
        return res;
    },
    RandomNum(len) {
        var rdmString = "";
        for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
        return rdmString.substr(0, len).toUpperCase();
    },
}
module.exports = comFun;