const { getMenus } = require('../../datas');
const { ErrorCode, ErrorMessage } = require('../../utill/constant');

module.exports = {
    menuLists: async function (req, res) {
        let RES = await getMenus()
        if (RES) {
            res.json({
                code: ErrorCode.SUCCESS,
                data: RES,
                message: ErrorMessage.SUCCESS
            })
        } else {
            res.json({
                code: ErrorCode.USER_NOT_EXIST,
                data: null,
                message: ErrorMessage.PASSWORD_ERROR
            })
        }
    }
}