// 云函数入口文件
const cloud = require('wx-server-sdk')

// 一定要先初始化 才能调用其他方法
cloud.init()

const rp = require('request-promise')
const db = cloud.database()

// 推荐歌单
const URL = 'http://musicapi.xiecheng.live/personalized'

const playlistCollection = db.collection('playlist')

const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {

  //从数据库取数据 最多获取100条
  //const list = await playlistCollection.get()

  // 突破小程序获取100条限制 
  const countResult = await playlistCollection.count()
  const total = countResult.total //获取到数据的总条数

  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {

    //skip 从第几条开始取
    let promise = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT)
    tasks.push(promise)
  }
  let list = {
    data: []
  }
  if (tasks.length > 0) {
    list = (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }



  const playlist = await rp(URL).then((res) => {
    return JSON.parse(res).result
  })

  // 让list和playlist做去重处理  已经存储到数据库中的数据没必要重复存储
  const newData = []
  for (let i = 0, len1 = playlist.length; i < len1; i++) {
    let flag = true
    for (let j = 0, len2 = list.data.length; j < len2; j++) {
      if (playlist[i].id === list.data[j].id) {
        flag = false
        break
      }
    }
    if (flag) {
      newData.push(playlist[i])
    }
  }


  // 将获取到数据存储到云数据库当中
  // 数据库只能一条一条插入
  for (let i = 0, len = newData.length; i < len; i++) {
    await playlistCollection.add({
      data: {
        ...newData[i],
        createTime: db.serverDate()
      }
    }).then((res) => {
      console.log('插入成功')
    }).catch((err) => {
      console.error('插入失败')
    })
  }

  return newData.length

}