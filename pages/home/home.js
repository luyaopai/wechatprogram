import {
  Request
} from '../../service/request.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsTypes: [],
    detail:[],
    typeId:"",
    pageNum:1,
    newsId:''
  },

  // 获取列表id
  chooseList:function(event){
    const typeid = event.detail;
    this.setData({
      typeId: typeid
    })
  },

  // 列表更新
  handClick:function(){
    this.setData({
      pageNum:1,
      detail:[]
    })
    this.requestList()
  },

  // 获取列表数据
  requestList(){
    Request({
      url: '/news/list?typeId=' + this.data.typeId + '&page='+this.data.pageNum
    }).then((res) => {
      const detail = res.data.data;
      detail.forEach((item, index, arr) => {
        item.postTime = item.postTime.split(' ')[0]
      })
      this.setData({
        detail: this.data.detail.concat(detail)
      })
    })
  },

  // 跳转到详情页面
  checkDetail(event){
    const newsId = event.detail
    this.setData({
      newsId: newsId
    })
    wx.navigateTo({
      url: '../detail/detail?newsId=' + this.data.newsId,
      complete: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    Request({
      url: "/news/types"
    }).then((res) => {
      const types = res.data.data;
      this.setData({
        newsTypes: types,
        typeId:types[0].typeId
      })
      this.requestList()
    }).catch((res) => {
      wx.showToast({
        title: '加载失败',
        icon: 'none',
        duration: 2000
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    this.requestList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})