// pages/musiclist/musiclist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musiclist: [],
    listInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.cloud.callFunction({
      name: 'music',
      data: {
        playlistId: options.playlistId || '2163003993',
        $url: 'musiclist'
      }
    }).then((res) => {
      const pl = res.result.playlist
      this.setData({
        musiclist: pl.tracks,
        listInfo: {
          coverImgUrl: pl.coverImgUrl,
          name: pl.name
        }
      })
      this._setMusiclist()
    })
  },
  _setMusiclist() {
    wx.setStorageSync('musiclist', this.data.musiclist)
  }
})