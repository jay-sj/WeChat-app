const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids:[],
    lists1:[],
    isEnded:false,
    page:1
  },
 //获取所有分类
 fetchAllCates(){
  app._get({url:"goods/getCategoryList"}).then(res=>{
    this.setData({
      grids:res.data.message
    })
  })
},
// 获取 楼层数据
fetchFloorData(page){
  if( this.data.isEnded ){
    return;
  }
  app._post({
    url:"goods/getGoodsListByCategorySubID",
    data:{
      categorySubId: "402880e86016d1b5016016e4dca2001e",
      page
    }
  }).then(res=>{
    console.log(res.data.message);
    if (!res.data.message.length){
      this.setData({
        isEnded:true
      });
    }
    this.setData({
      lists1: [...this.data.lists1,...res.data.message]
    })
  })
}, 
                        
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchAllCates();
    this.fetchFloorData(this.data.page);
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
    this.fetchAllCates();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page:++this.data.page
    },()=>{
      
      this.fetchFloorData(this.data.page);
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})