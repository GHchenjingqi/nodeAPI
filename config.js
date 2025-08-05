let config = {
    database:{
        host: 'localhost',
        user: 'root',
        database: 'wptest_com',
        password: 'root',
    },
    serve:{
        host:'127.0.0.1',
        port:30001
    },
    JWT_SECRET:"NODEAPI_JWT_SECRET", // JWT密钥
    JWT_EXPIRES_IN:"2h", // JWT有效期
}
module.exports = config;