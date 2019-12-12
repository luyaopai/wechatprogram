export function Request(para){
  let req = new Promise ((resolve,reject)=>{
    wx.request({
      url: 'https://www.mxnzp.com/api' + para.url,
      method: para.method,
      success: resolve,
      fail: reject
    })
  })
  return req;
}