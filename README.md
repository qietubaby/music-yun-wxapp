# 云开发音乐小程序

  点击云开发按钮开通云开发

这是小程序云开发的音乐，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码
- 云调用：基于云函数免鉴权使用小程序开放接口的能力
- HTTP API 使用 HTTP API开发者可在已有服务器上访问云资源 实现与云开发互通

## 云开发参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)


## 创建环境

- 可以先创建一个测试环境
- 环境ID不可更改
- app.js中需要指定当前环境id env
- traceUser 表示是否记录哪些用户访问过小程序


## 创建云函数
- 右击cloudfunctions 创建云函数 （新建Node.js云函数）
- 鼠标右键getPlaylist在终端打开，可以为该函数安装一些第三方库 比如request-promise
- 云函数代码写完后要上传并部署依赖（不上传node_modules）才可以用


## tcb-router

- 一个用户在一个云环境中只能创建50个云函数
- 相似的请求归类到同一个云函数处理
- tcb-router是一个koa风格的云函数路由库


## 在小程序端，如何使用 async/await 语法？

在云函数里，由于 Node 版本最低是 8.9，因此是天然支持 async/await 语法的。而在小程序端则不然。在微信开发者工具里，以及 Android 端手机（浏览器内核是 QQ浏览器的 X5），async/await是天然支持的，但 iOS 端手机在较低版本则不支持，因此需要引入额外的 文件。可把这个 regenerator/runtime.js 文件引用到有使用 async/await 的文件当中。

import regeneratorRuntime from '../../utils/runtime.js'


## 云函数触发器

在config中配置 配置完成后需要右键上传定时触发器

