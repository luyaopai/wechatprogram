// pages/user/user.js
import {Request} from '../../service/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avaurl:'../../assets/wode-weixuan.png',
    username:'',
    isShow:false,
    detail:[]
  },

  // 展示收藏内容
  showDetail(){
    const _this = this;
    let detail = [];
    wx.getStorage({
      key: 'docidArr',
      success: function(res) {
        const newsIdArr = new Set(res.data)
        newsIdArr.forEach((item)=>{
          Request({
            url: '/news/details?newsId='+item
          }).then((res)=>{
            const data = res.data.data;
            let imgList = [];
            imgList.push(data.cover)
            detail.push({
              postTime: data.ptime.split(' ')[0],
              source:data.source,
              title: data.title,
              imgList: imgList,
              newsId: data.docid
            })
            _this.setData({
              detail: detail
            })
          })
        })
      },
    })
  },

  // 加载个人信息
  loadMessage(){
    const _this = this
    wx.getSetting({
      success(resolve) {
        if (resolve.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              let userInfo = res.userInfo
              _this.setData({
                avaurl: userInfo.avatarUrl,
                username: userInfo.nickName,
                isShow: true
              })
              _this.showDetail()
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '请点击登录',
          })
        }
      }
    })  
  },

  checkDetail(event) {
    console.log(event)
    const newsId = event.detail
    wx.navigateTo({
      url: '../detail/detail?newsId=' + newsId,
      complete: function (res) {
        console.log(res)
      }
    })
  },

  handleLogin:function(){
    this.loadMessage()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMessage()
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
    this.loadMessage()
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
    // this.loadMessage()
    wx.stopPullDownRefresh()   
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