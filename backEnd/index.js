const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const staticCache = require('koa-static-cache');
const cors = require('koa2-cors');
const koajwt = require('koa-jwt');
const app = new Koa();
app.use(cors());

app.use(staticCache(path.join(__dirname, './public'), {dynamic: true},{
    maxAge: 365 * 24 * 60 * 60
}))
app.use(staticCache(path.join(__dirname, './images'), { dynamic: true }, {
    maxAge: 365 * 24 * 60 * 60
}))
app.use(bodyParser({
    formLimit: '1mb'
}))

// 错误处理
app.use((ctx, next) => {
    return next().catch((err) => {
        if(err.status === 401){
            ctx.body = {
                code: 'access_error',
                message: '没有权限访问',
                success: false
            };
        }else{
            throw err;
        }
    })
})

const noNeedLogin = [
    '/common',
    '/login', // 登录不要jwt鉴权，不登录无法获取token
]

app.use(koajwt({
    secret: 'ut'
}).unless({
    // 不需要jwt鉴权的接口路径
    path: noNeedLogin
}))

// 批量鉴权 中间件
app.use(async (ctx, next) => {
    let url = ctx.url.split('?')[0]
    // 需要鉴权
    if(noNeedLogin.indexOf(url) === -1){
        try{
            // 用户登录信息（jwt自动解析到ctx.state.user中）
            if (ctx.state.user.uid) {
                let ts = Date.parse(new Date())/1000
                if(ts - ctx.state.user.exp > 0){
                    ctx.body = {
                        code: 'no_access',
                        success: false,
                        message: '登录已失效'
                    }
                }
            } else {
                ctx.body = {
                    code: 'no_access',
                    success: false,
                    message: '缺少用户登录信息'
                }
            }
        }catch (e) {
            ctx.body = {
                code: 'no_access',
                success: false,
                message: '缺少用户登录信息'
            }
        }
        await next()
    }
    // 无需鉴权
    else {
        await next()
    }
})

app.use(require('./routes').routes())

app.listen(3000)

console.log(`listening on port 3000`)
