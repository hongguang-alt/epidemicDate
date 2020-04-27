const rp = require('request-promise')

getDataList = async ()=>{
   const data =  await rp.get("http://api.tianapi.com/txapi/ncovcity/index?key=da05eff01b87e74005064c28764a98e3")
   return data
}

module.exports = getDataList





