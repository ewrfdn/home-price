const fs = require('fs-extra')
const { dirExists, getAction, getDomListByXpath, writeToExcel, sleep } = require('./utils')
const { extractColumns } = require('./constant')
const xpathNameMap = {
  '//div[@id="introduction"]/div/div[1]/div[@class="base"]/div[2]/ul/li': '基本属性',
  '//div[@id="introduction"]/div/div[1]/div[@class="transaction"]/div[2]/ul/li': '交易属性',
  '/html/body/div[@class="overview"]/div[@class="content"]/div[@class="aroundInfo"]/div[@class="communityName"]/a[1]': '小区名称',
  '/html/body/div[@class="overview"]/div[@class="content"]/div[@class="aroundInfo"]/div[@class="areaName"]': '所在区域',
  '/html/body/div[@class="overview"]/div[@class="content"]/div[@class="price-container"]/div': '价格',
  '/html/body/div[@class="m-content"]/div[@class="box-l"]/div[@class="newwrap baseinform"]/div[1]/div[@class="baseattribute clear"]': '房源特色'
}
class Spider {
  constructor(config) {
    const { name, url, sheetName, query } = config
    this.urlList = []
    this.query = query
    this.sheetName = sheetName
    this.isFinished = false
    this.name = name
    this.baseUrl = url
    this.saveDataPath = `./data`
    this.configPath = `./config/${name}.json`
    this.errorRecord=`./errorUrl.json`
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
    let urlList = []
      const hasLog = fs.existsSync(this.errorRecord)
      if (hasLog) {
        urlList = fs.readJSONSync(this.errorRecord)
      } else {
        fs.writeFileSync(this.errorRecord, JSON.stringify(urlList))
      }
    while (!this.isFinished) {
      try {
      await this.getPageData()
      } catch (e) {
        urlList.push({ baseUrl: this.baseUrl, query: this.query, page: this.config.page })
        fs.writeFileSync(this.errorRecord, JSON.stringify(urlList))
      }
    }
  }

  getPageData() {
    return new Promise(async (resolve, reject) => {
      try {
        await this.getPageUrlList()
      const res = []
      for (const item of this.urlList) {
        const promise = this.getContext(item.url)
        await sleep(800)
        res.push(promise)
      }
      Promise.all(res).then(async (values) => {
        values.forEach((element, index) => {
          element.page = this.config.page - 1
          element.pageIndex = index + 1
        });
        await writeToExcel({
          sheets: [{
            name: this.sheetName || 'Sheet1',
            dataSource: values,
            columns: extractColumns,
          }],
          path: this.saveDataPath + `/${this.name}.xlsx`
        })
        this.config.page++
        await this.saveConfig()
        resolve(true)
      }).catch(e => {
        console.log(e)
        reject(e)
      }
      )
      } catch (e) {
        reject(e)
      }
      
    })
  }
  async getPageUrlList() {
    try {
      const pageUrl= `${this.baseUrl}/${this.query}pg${this.config.page}/`
      const pageData = await getAction(pageUrl)
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
      if (urlList.length === 0 || this.config.page > 100) {
        this.isFinished = true
      }
      this.urlList = urlList
    } catch (e) {
      throw new Error(e.message)
    }
   
  }

  async getContext(url) {
    try {
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
        extract['所在区域'] = extract['所在区域'].replaceAll('&nbsp;', ' ')
      } else if (xpathNameMap[item.xpath] === '房源特色') {
        for (const list of item.res) {
          const childNodes = list.childNodes
          const key = childNodes[1].textContent
          let value = childNodes[3].textContent
          value = value.replaceAll(' ', '')
          value = value.replaceAll('\n', '')
          extract[key] = value
        }
      }
    }
    return extract
    } catch (e) {
      throw new Error(e.message)
    }

  }
}
module.exports = {
  Spider
}