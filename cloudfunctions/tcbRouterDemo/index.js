// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const TcbRouter = require('tcb-router')


// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event })

  // 路由的公共中间件
  app.use(async(ctx, next) => {
    ctx.data = {}
    ctx.data.openId = event.userInfo.openId
    await next()
  })

  app.router('music', async(ctx, next) => {
    ctx.data.musicName = '数鸭子'
    await next()
  },async (ctx, next) => {
    ctx.data.musicType = '儿歌'
    ctx.body = {
      data: ctx.data
    }
  })

  app.router('movie', async (ctx, next) => {
    ctx.data.musicName = '千与千寻'
    await next()
  }, async (ctx) => {
    ctx.data.musicType = '日本动画片'
    ctx.body = {
      data: ctx.data
    }
  })

  return app.serve()

























  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}