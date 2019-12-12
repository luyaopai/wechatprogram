// components/category/category.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
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
    handleClick(event) {
      let typeId = event.currentTarget.dataset.typeid
      this.triggerEvent('chooseList', typeId)
    }
  }
})
