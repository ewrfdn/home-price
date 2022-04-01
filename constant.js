const extractColumns = [
  {
    title: '小区名称',
    dataIndex: '小区名称'
  },
  {
    title: '所在区域',
    dataIndex: '所在区域'
  },
  {
    title: '总价',
    dataIndex: '总价'
  },
  {
    title: '每平米价格',
    dataIndex: '每平米价格'
  },
  {
    title: '建筑面积',
    dataIndex: '建筑面积'
  },
  {
    title: '套内面积',
    dataIndex: '套内面积'
  }
  , {
    title: '所在楼层',
    dataIndex: '所在楼层'
  }, {
    title: '房屋户型',
    dataIndex: '房屋户型'
  },
  {
    title: '产权所属',
    dataIndex: '产权所属'
  },
  {
    title: '房屋年限',
    dataIndex: '房屋年限'
  },
  {
    title: '房屋用途',
    dataIndex: '房屋用途'
  },
  {
    title: '上次交易',
    dataIndex: '上次交易'
  },
  {
    title: '交易权属',
    dataIndex: '交易权属'
  },
  {
    title: '配备电梯',
    dataIndex: '配备电梯'
  },
  {
    title: '梯户比例',
    dataIndex: '梯户比例'
  },
  {
    title: '装修情况',
    dataIndex: '装修情况'
  }, {
    title: '建筑结构',
    dataIndex: '建筑结构'
  }, {
    title: '房屋朝向',
    dataIndex: '房屋朝向'
  }
  , {
    title: '户型结构',
    dataIndex: '户型结构'
  },
]
const areaList = ['xuanwu']
const baseURL = 'https://nj.lianjia.com/ershoufang/xuanwu'
module.exports = {
  extractColumns,
  baseURL,
  areaList,
}