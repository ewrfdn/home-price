const fs = require('fs-extra')
const { Spider } = require("./spider");
const { baseURL, areaList, price, liveRoom } = require('./constant.js')
const configPath = './info.json'
const {  sleep } = require('./utils')

const saveConfig = (config) => {
  fs.writeFileSync(configPath, JSON.stringify(config))
}
const run = async () => {
  const spiderName = `${areaList[0].name}-${liveRoom[4].name}-${price[3].name}`
  const spider = new Spider({ url: `${baseURL}/${areaList[0].code}`, query:`${liveRoom[4].code}${price[3].code}`, name: spiderName, sheetName:spiderName})
  await spider.start()
  // const hasConfigFile = fs.existsSync(configPath)
  // let config = [0, 0, 0]
  // if (hasConfigFile) {
  //   config = fs.readJSONSync(configPath)
  // } else {
  //   saveConfig(config)
  // }
  // for (let i = config[0]; i < areaList.length; i++) {
  //   for (let j = config[1]; j < liveRoom.length; j++) {
  //     for (let k = config[2]; k < price.length; k++) {
  //       let tryCount = 0
  //       const spiderName = `${areaList[i].name}-${liveRoom[j].name}-${price[k].name}`
  //       while (tryCount < 3) {
  //         try {
  //           const spider = new Spider({ url: `${baseURL}/${areaList[i].code}`, query:`${liveRoom[j].code}${price[k].code}`, name: spiderName, sheetName:spiderName})
  //           await spider.start()
  //           saveConfig([i, j, k])
  //           tryCount = 4
  //         } catch (e) {
  //           tryCount++
  //           fs.writeFileSync('/errorlog.json',JSON.stringify(e))
  //           await sleep(30000)
  //           if (tryCount > 3) {
  //             throw new Error('超出重试限次')
  //           }
  //         }
  //       }
        
  //     }
  //   }
  // }
}
run()
// const spiderName = `迈皋桥`
// const spider = new Spider({ url: `${baseURL}/maigaoqiao1`, name: spiderName, sheetName:spiderName})
// spider.start()
