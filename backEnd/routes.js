const router = require('koa-router')();
let jwt = require('jsonwebtoken'); // 用于写入鉴权密钥

router.get('/testGet', (ctx) => {
    ctx.body = {
        code: '10001',
        success: true,
        data: {},
        message: 'token失效，请重新登录'
    }
})

router.get('/testGet2', (ctx) => {
    let {query} = ctx.request.query
    ctx.body = {
        code: '10000',
        success: true,
        data: {},
        message: `你给我发${query}是几个意思咩？`
    }
})

router.post('/login', (ctx) => {
    let {account,password} = ctx.request.body
    const token = jwt.sign({
        account: account
    }, 'ut', {expiresIn: '2h'})
    ctx.body ={
        code: '10000',
        success: true,
        data: {
            account,
            password,
            token: token
        }
    }
})

module.exports = router