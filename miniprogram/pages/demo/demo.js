// pages/demo/demo.js
import regeneratorRuntime from '../../utils/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   * 
   * wx.cloud.callFunction 调用云函数
   * 只有上传了云函数才能调用
   * 
   */
  onLoad: function (options) {
    // wx.cloud.callFunction({
    //   name: 'login'
    // }).then(function (res) {
    //   console.log(res)
    // })

    this.foo()
    this.getMovieInfo()
    this.getMusicInfo()
  },

  getMovieInfo(){
    wx.cloud.callFunction({
      name:'tcbRouterDemo',
      data: {
        $url:'movie'
      }
    }).then((res) => {
      console.log(res)
    })
  },

  getMusicInfo() {
    wx.cloud.callFunction({
      name: 'tcbRouterDemo',
      data: {
        $url: 'music'
      }
    }).then((res) => {
      console.log(res)
    })
  },


  async foo() {
    let res = await this.timeout()
    console.log(res)
  },

  timeout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(1)
        resolve('resolved')
      },1000)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})