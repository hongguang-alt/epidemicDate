const express = require('express')
const app = express()
const path = require('path')
const getDataList = require('./data/data')

//模板后缀，使用的模板引擎
app.engine('art', require('express-art-template'))
//告诉express框架模板存放的位置是什么
app.set('views', path.join(__dirname, 'views'))
//告诉express框架模板的默认后缀是什么
app.set('view engine', 'art')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
    res.render('epidemic', {})
})

app.get('/list', async (req, res) => {
    const body = await getDataList()
    const data = JSON.parse(body).newslist
    let dataNum = 0
    let datacity = {}
    data.forEach(item => {
      dataNum+=item.confirmedCount
      if(item.provinceShortName=='安徽'){
          item.cities.forEach(citys=>{
              if(citys.cityName=='蚌埠'){
                  datacity = citys
              }
          })
      }   
    })
    res.render('epidemic-list', {
        data,
        dataNum,
        datacity
    })
})


app.get('/data', async (req,res)=>{
    const body = await getDataList()
    const data = JSON.parse(body).newslist
    const datalist = []
    data.forEach(item => {
        const dataOne = {}
        dataOne.name = item.provinceName
        dataOne.value = item.confirmedCount
        datalist.push(dataOne)
    });

    res.json(datalist)
})
app.listen(80)
console.log('服务器启动成功！请访问80端口')