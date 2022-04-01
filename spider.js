const fs = require('fs-extra')
const { dirExists, getAction, getDomListByXpath, writeToExcel } = require('./utils')
const { extractColumns } = require('./constant')
const xpathNameMap = {
  '//div[@id="introduction"]/div/div[1]/div[@class="base"]/div[2]/ul/li': '基本属性',
  '//div[@id="introduction"]/div/div[1]/div[@class="transaction"]/div[2]/ul/li': '交易属性',
  '/html/body/div[@class="overview"]/div[@class="content"]/div[@class="aroundInfo"]/div[@class="communityName"]/a[1]': '小区名称',
  '/html/body/div[@class="overview"]/div[@class="content"]/div[@class="aroundInfo"]/div[@class="areaName"]': '所在区域',
  '/html/body/div[@class="overview"]/div[@class="content"]/div[@class="price-container"]/div': '价格'
}
class Spider {
  constructor(config) {
    const { name, url } = config
    this.urlList = []
    this.baseUrl = url
    this.saveDataPath = `./data/${name}`
    this.configPath = `./config/${name}.json`
    this.config = {
      page: 1,
    }
  }
  saveConfig() {
    fs.writeFileSync(this.configPath, JSON.stringify(this.config))
  }
  async start() {
    await dirExists(this.saveDataPath)
    await dirExists('./config')
    const hasConfigFile = fs.existsSync(this.configPath)
    if (hasConfigFile) {
      this.config = fs.readJSONSync(this.configPath)
    } else {
      this.saveConfig()
    }
    await this.getPageUrlList()
    const res = []
    for (const item of this.urlList) {
      const row = await this.getContext(item.url)
      res.push(row)
    }
    await writeToExcel({
      sheets: [{
        name: 'Sheets1',
        dataSource: res,
        columns: extractColumns,
      }],
      path: this.saveDataPath + 'data.xlsx'
    })

  }
  async getPageUrlList() {
    const pageData = await getAction(`${this.baseUrl}/pg${this.config.page}/`)
    const resList = getDomListByXpath(pageData, '//div[@id="content"]/div[@class="leftContent"]/ul[1]/li/div[1]/div[@class="title"]/a[1]')
    const urlList = []
    let i = 0
    for (const res of resList) {
      const attributes = res.attributes
      for (let index = 0; index < res.attributes.length; index++) {
        const attribute = attributes[index]
        if (attribute.name === 'href') {
          urlList.push({ page: this.config.page, url: attribute.value, index: i })
          break
        }
      }
      i++
    }
    this.urlList = urlList
    this.config.page++
  }

  async getContext(url) {
    const content = await getAction(url)
    const xpathList = []
    for (const key in xpathNameMap) {
      xpathList.push(key)
    }
    const resList = getDomListByXpath(content, xpathList)
    const extract = {}
    for (const item of resList) {
      if (xpathNameMap[item.xpath] === '价格') {
        const res = item.res[0]
        extract['总价'] = res.childNodes[0].textContent
        extract['每平米价格'] = parseInt(res.childNodes[2].textContent)
      } else if (xpathNameMap[item.xpath] === '基本属性') {
        const res = item.res
        for (const basicProperty of res) {
          extract[basicProperty.firstChild.textContent] = basicProperty.lastChild.textContent
        }
      } else if (xpathNameMap[item.xpath] === '交易属性') {
        const res = item.res
        for (const basicProperty of res) {
          const key = basicProperty.childNodes[1].textContent
          const value = basicProperty.childNodes[3].textContent
          extract[key] = value
        }
      } else if (xpathNameMap[item.xpath] === '小区名称') {
        extract['小区名称'] = item.res[0].textContent
      } else if (xpathNameMap[item.xpath] === '所在区域') {
        const childNodes = item.res[0].childNodes
        extract['所在区域'] = childNodes[2].textContent + childNodes[3].textContent
      }
    }
    return extract

  }
}
module.exports = {
  Spider
}