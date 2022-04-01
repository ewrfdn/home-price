const xlsx = require('node-xlsx');
const fs = require('fs')
const path = require('path')
const $ = require('cheerio')
const xpath = require('xpath')
const dom = require('xmldom').DOMParser
const writeToExcel = ({ sheets, path }) => {

  let sheetList = []
  const hasExcelFile = fs.existsSync(path)
  if (hasExcelFile) {
    sheetList = xlsx.parse(path);
  }
  let index = sheetList.length
  for (const sheetData of sheets) {
    const { dataSource, columns } = sheetData
    index++
    if (!sheetData.name) {
      sheetData.name = "Sheet" + index
    }
    let sheet = sheetList.find(item => item.name === sheetData.name)
    if (!sheet) {
      sheet = {
        name: sheetData.name,
        data: []
      }
      const header = []
      for (const column of columns) {
        header.push(column.title)
      }
      sheet.data.push(header)
      sheetList.push(sheet)
    }
    for (const data of dataSource) {
      const row = []
      for (const column of columns) {
        row.push(data[column.dataIndex])
      }
      sheet.data.push(row)
    }
  }
  const buffer = xlsx.build(sheetList)
  fs.writeFileSync(path, buffer)
}
const { createInstance } = require('./request.js')

const getAction = async (url, options) => {
  const request = await createInstance().get(url, options)
  return request.data
}
const dirExists = async (dir) => {
  const isExists = await getStat(dir)
  if (isExists && isExists.isDirectory()) {
    return true
  } else if (isExists) {
    return false
  }
  const tempDir = path.parse(dir).dir
  const status = await dirExists(tempDir)
  let mkdirStatus
  if (status) {
    mkdirStatus = fs.mkdirSync(dir)
  }
  return mkdirStatus
}

function getStat(filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        resolve(false)
      } else {
        resolve(stats)
      }
    })
  })
}

const getDomListByXpath = (rootDom, xpathString) => {
  let root = rootDom
  if(typeof(rootDom)==='string'){
   root = new dom().parseFromString(rootDom)
  }
  if (Array.isArray(xpathString)) {
    const res = []
    for (const xpathItem of xpathString) {
      const result = xpath.select(xpathItem, root)
      res.push({
        xpath: xpathItem,
        res: result,
      })
    }
    return res
  } else {
    const result = xpath.select(xpathString, root)
    return result
  }
}
module.exports = {
  writeToExcel,
  getAction,
  dirExists,
  getDomListByXpath
}