// components/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detail:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    lookDetail(event) {
      const newsId = event.currentTarget.dataset.newsid
      this.triggerEvent('checkDetail', newsId)
    },
  }
})