// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router')

const rp = require('request-promise')

const BASE_URL = 'http://musicapi.xiecheng.live'

cloud.init()

// 云函数入口函数
// 提供给前端页面用的
//  因为一个云环境最多创建50个云函数  所以用 router的形式
exports.main = async (event, context) => {
  const app = new TcbRouter({ event })

  // 路由的方式返回数据
  app.router('playlist', async (ctx, next) => {
    ctx.body = await cloud.database().collection('playlist')
      .skip(event.start)
      .limit(event.count)
      .orderBy('createTime', 'desc')
      .get()
      .then((res) => {
        return res
      })
  })

  app.router('musiclist', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + '/playlist/detail?id=' + parseInt(event.playlistId))
      .then((res) => {
        return JSON.parse(res)
      })
    // ctx.body = await cloud.database().collection('playlist')
    //   .skip(event.start)
    //   .limit(event.count)
    //   .orderBy('createTime', 'desc')
    //   .get()
    //   .then((res) => {
    //     return res
    //   })
  })

  return app.serve()


  // return await cloud.database().collection('playlist')
  // .skip(event.start)
  // .limit(event.count)
  // .orderBy('createTime','desc')
  // .get()
  // .then((res)=> {
  //   return res
  // })
}