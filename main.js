const { Spider } = require("./spider");
const { baseURL, areaList } =require('./constant.js') 
const spider1 = new Spider({ url:`${baseURL}/${areaList[0]}` , name: '玄武区' })
spider1.start()