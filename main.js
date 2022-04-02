const fs = require('fs-extra')
const { Spider } = require("./spider");
const { baseURL, areaList, price, liveRoom } = require('./constant.js')
const configPath = './info.json'
const saveConfig = (config) => {
  fs.writeFileSync(configPath, JSON.stringify(config))
}
// const run = async () => {
//   const hasConfigFile = fs.existsSync(configPath)
//   let config = [0, 0, 0]
//   if (hasConfigFile) {
//     config = fs.readJSONSync(configPath)
//   } else {
//     saveConfig(config)
//   }
//   for (let i = config[0]; i < areaList.length; i++) {
//     for (let j = config[1]; j < liveRoom.length; j++) {
//       for (let k = config[2]; k < price.length; k++) {
//         const spiderName = `${areaList[i].name}-${liveRoom[j].name}-${price[k].name}`
//         const spider = new Spider({ url: `${baseURL}/${areaList[i].code}/${liveRoom[j].code}${price[k].code}`, name: spiderName, sheetName:spiderName})
//         await spider.start()
//         saveConfig([i, j, k])
//       }
//     }
//   }
// }
// run()
const spiderName = `迈皋桥`
const spider = new Spider({ url: `${baseURL}/maigaoqiao1`, name: spiderName, sheetName:spiderName})
spider.start()
