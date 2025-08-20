const jwt = require('jsonwebtoken');
const { ErrorCode, ErrorMessage } = require('../../utill/constant');
const { getUser, createUser, isUsernameExists } = require('../../datas');
const config = require('../../config');

module.exports = {
    login: async function (req, res) {
        const { username, password } = req.body;
        if (username && password) {
            let { password, id: userid, ...rest } = await getUser(username)
            if (password) {
                if (password === password) {
                    // 生成token令牌
                    const token = jwt.sign(
                        { id: userid, username },
                        config.JWT_SECRET,
                        { expiresIn: config.JWT_EXPIRES_IN }
                    );
                    res.json({
                        code: ErrorCode.SUCCESS,
                        data: {
                            token,
                            ...rest
                        },
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
    },
    register: async (req, res) => {
        const { username, password } = req.body;
        if (username && password) {
            const user = await isUsernameExists(username)
            if (user) {
                return res.json({
                    code: ErrorCode.NOT_ALLOWED,
                    data: null,
                    message: ErrorMessage.USER_IS_EXIST
                });
            }
            let userid = await createUser({ id: new Date().getTime(), username, password })
            if (userid) {
                const token = jwt.sign(
                    { id: userid, username },
                    config.JWT_SECRET,
                    { expiresIn: config.JWT_EXPIRES_IN }
                );
                res.json({
                    code: ErrorCode.SUCCESS,
                    data: {
                        token,
                        username
                    },
                    message: ErrorMessage.SUCCESS
                })
            }
        }
    },
};