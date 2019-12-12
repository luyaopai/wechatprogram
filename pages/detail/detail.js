// pages/detail/detail.js
import {Request} from '../../service/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    source:'',
    ptime:'',
    cover:'',
    content:'',
    imgs:[],
    docid:''
  },

  favorite(){
    let _this = this;
    wx.getStorage({
      key: 'docidArr',
      success: function(res) {
        let rids = res.data
        rids.push(_this.data.docid)
          wx.setStorage({
            key: 'docidArr',
            data: rids,
            success: function () {
              wx.showToast({
                title: '收藏成功',
              })
            }
          })
      },
      fail:function(){
        let docidArr = [];
        docidArr.push(_this.data.docid)
        wx.setStorage({
          key: 'docidArr',
          data: docidArr,
          success: function () {
            wx.showToast({
              title: '收藏成功',
            })
          }
        })
      }
    })
  },

  getUser(){
    const _this = this;
    wx.getSetting({
      success(res){
        if(res.authSetting['scope.userInfo']){
          _this.favorite()
        }else {
          wx.showModal({
            title: '提示',
            content: '登录后才能收藏喔~',
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Request({
      url: '/news/details?newsId='+options.newsId
    }).then((res)=>{
      let content = res.data.data
      let imgs = content.images || []
      let contents = content.content
      imgs.forEach((item)=>{
        contents = contents.replace(item.position, `<img src="${item.imgSrc}"/>`)
      })
      this.setData({
        title: content.title,
        source: content.source,
        ptime: content.ptime,
        cover: content.cover,
        content: contents,
        imgs: imgs,
        docid: content.docid
      })
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