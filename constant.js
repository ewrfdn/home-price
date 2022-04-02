const extractColumns = [
  {
    title: '页数',
    dataIndex: 'page'
  },
  {
    title: '当页索引',
    dataIndex: 'pageIndex'
  },
  {
    title: '小区名称',
    dataIndex: '小区名称'
  },
  {
    title: '所在区域',
    dataIndex: '所在区域'
  },
  {
    title: '总价/万元',
    dataIndex: '总价'
  },
  {
    title: '每平米价格/元',
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
  }, {
    title: '户型结构',
    dataIndex: '户型结构'
  },
  {
    title: '核心卖点',
    dataIndex: '核心卖点'
  }, {
    title: '小区介绍',
    dataIndex: '小区介绍'
  }, {
    title: '周边配套',
    dataIndex: '周边配套'
  }, {
    title: '交通出行',
    dataIndex: '交通出行'
  },
]
const areaList = [
{ name: '玄武区', code: 'xuanwu' },
{ name: '鼓楼区', code: 'gulou' }, 
{ name: "栖霞区", code: 'qixia' },
{ name: '秦淮区', code: 'qinhuai' }, 
{ code: '建业区', code: 'jianye' },
{ name: '雨花台区', code: 'yuhuatai' }
]
const price = [
  {name:'80万以下',code:'p1'},
  {name:'80-100万',code:'p2'},
  {name:'100-150万',code:'p3'},
  {name:'150-200万',code:'p4'},
  {name:'200-300万',code:'p5'},
  {name:'300-500万',code:'p6'},
  {name:'500-700万',code:'p7'},
  {name:'700万以上',code:'p8'},
]
const liveRoom = [
  {name:'一室',code:'l1'},
  {name:'两室',code:'l2'},
  {name:'三室',code:'l3'},
  {name:'四室',code:'l4'},
  {name:'四室以上',code:'l5'},
]
const baseURL = 'https://nj.lianjia.com/ershoufang/xuanwu'
module.exports = {
  extractColumns,
  baseURL,
  areaList,
  price,
  liveRoom
}