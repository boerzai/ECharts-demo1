var moveLinesA = [{from:'北京',to:'贵州'}];
var moveLinesB = [{from:'北京',to:'贵州'}];
function makeData(arr) {
	var cities = [], mapping = {}, lines = [];
	for(var i = 0; i < arr.length; i++) {
		var fromTo = arr[i];
		if(mapping[fromTo.from]) {
			mapping[fromTo.from]-= fromTo.total;
		} else {
			mapping[fromTo.from] = -fromTo.total;
		}

		if(mapping[fromTo.to]) {
			mapping[fromTo.to] += fromTo.total;
		} else {
			mapping[fromTo.to] = fromTo.total;
		}

		if(window._geoCoordMap[fromTo.from] && window._geoCoordMap[fromTo.to]) {
			var coordFrom = window._geoCoordMap[fromTo.from];
			var coordTo = window._geoCoordMap[fromTo.to];
			lines.push({"fromName":fromTo.from,"toName":fromTo.to,"coords":[[coordFrom[0],coordFrom[1]],[coordTo[0],coordTo[1]]]});
		} else {
			console.log('missing geo: ' + city);
		}
	}

	for(var city in mapping) {
		if(window._geoCoordMap[city]) {
			var coord = window._geoCoordMap[city];
			var value = mapping[city];
			cities.push({
							name: city,
							value: [coord[0], coord[1], value],
							symbolSize: Math.pow(Math.min(600, Math.abs(value)), 0.55)+1,
							itemStyle: {normal: {color: (value > 0 ? "#f88158" : "#20e1fb")}}
						});
		} else {
			console.log('missing geo: ' + city);
		}
	}

	return {citys:cities, moveLines: lines};
}

var waixieData = [
  {"from":"泰州","to":"浦东新区","total":9954},{"from":"扬州","to":"浦东新区","total":4057},{"from":"南京","to":"南京","total":1045},{"from":"扬州","to":"南京","total":787},{"from":"长沙","to":"长沙","total":716},{"from":"西安","to":"西安","total":607},{"from":"宁波","to":"浦东新区","total":506},{"from":"常州","to":"浦东新区","total":478},{"from":"常州","to":"南京","total":397},{"from":"上海","to":"南京","total":225},{"from":"北京","to":"北京","total":218},{"from":"沈阳","to":"沈阳","total":157},{"from":"南京","to":"浦东新区","total":139},{"from":"郑州","to":"长沙","total":132},{"from":"武汉","to":"武汉","total":84},{"from":"呼和浩特","to":"呼和浩特","total":76},{"from":"成都","to":"遵义","total":71},{"from":"苏州","to":"苏州","total":69},{"from":"嘉定区","to":"孝感","total":68},{"from":"东营","to":"哈尔滨","total":66},{"from":"武汉","to":"孝感","total":61},{"from":"北京","to":"丰台区","total":47},{"from":"泰州","to":"沈阳","total":46},{"from":"北京","to":"东城区","total":45},{"from":"洛阳","to":"孝感","total":45},{"from":"滁州","to":"南京","total":44},{"from":"河北区","to":"北京","total":43},{"from":"运城","to":"孝感","total":40},{"from":"海淀区","to":"北京","total":40},{"from":"扬州","to":"沈阳","total":38},{"from":"海淀区","to":"西安","total":37},{"from":"上海","to":"西安","total":36},{"from":"孝感","to":"武汉","total":35},{"from":"北京","to":"泰州","total":34},{"from":"北京","to":"西安","total":34},{"from":"上海","to":"浦东新区","total":34},{"from":"咸阳","to":"遵义","total":33},{"from":"昌平区","to":"沈阳","total":32},{"from":"浦东新区","to":"浦东新区","total":31},{"from":"泰州","to":"南京","total":30},{"from":"孝感","to":"长沙","total":28},{"from":"宿迁","to":"南京","total":28},{"from":"沈阳","to":"北京","total":27},{"from":"奉贤县","to":"浦东新区","total":27},{"from":"长沙","to":"北京","total":27},{"from":"太原","to":"北京","total":26},{"from":"丰台区","to":"北京","total":25},{"from":"成都","to":"沈阳","total":24},{"from":"绵阳","to":"沈阳","total":24},{"from":"孝感","to":"孝感","total":24},{"from":"洛阳","to":"北京","total":23},{"from":"孝感","to":"柳州","total":23},{"from":"郑州","to":"信阳","total":21},{"from":"哈尔滨","to":"沈阳","total":21},{"from":"广安","to":"遵义","total":20},{"from":"上海","to":"遵义","total":19},{"from":"合肥","to":"孝感","total":19},{"from":"北京","to":"天津","total":18},{"from":"南开区","to":"天津","total":18},{"from":"重庆","to":"遵义","total":17},{"from":"本溪","to":"沈阳","total":16},{"from":"合肥","to":"沈阳","total":16},{"from":"忻州","to":"沈阳","total":15},{"from":"成都","to":"东城区","total":15},{"from":"无锡","to":"南京","total":15},{"from":"杭州","to":"孝感","total":15},{"from":"海淀区","to":"孝感","total":14},{"from":"北京","to":"海淀区","total":14},{"from":"镇江","to":"苏州","total":13},{"from":"朝阳区","to":"西安","total":13},{"from":"延庆县","to":"西安","total":12},{"from":"苏州","to":"北京","total":12},{"from":"常州","to":"苏州","total":12},{"from":"北京","to":"海口","total":12},{"from":"郑州","to":"北京","total":11},{"from":"北京","to":"南京","total":11},{"from":"长春","to":"海淀区","total":11},{"from":"南通","to":"南京","total":11},{"from":"绍兴","to":"浦东新区","total":11},{"from":"徐州","to":"南京","total":11},{"from":"南京","to":"北京","total":11},{"from":"北京","to":"武汉","total":10},{"from":"南京","to":"孝感","total":10},{"from":"东莞","to":"武汉","total":10},{"from":"天津","to":"遵义","total":10},{"from":"南京","to":"武汉","total":10},{"from":"天津","to":"天津","total":9},{"from":"长治","to":"西安","total":8},{"from":"无锡","to":"西安","total":8},{"from":"随州","to":"孝感","total":8},{"from":"孝感","to":"北京","total":8},{"from":"郑州","to":"天津","total":8},{"from":"上海","to":"北京","total":8},{"from":"天津","to":"石家庄","total":8},{"from":"重庆","to":"西安","total":8},{"from":"北京","to":"沈阳","total":8},{"from":"西安","to":"北京","total":7},{"from":"武汉","to":"北京","total":7},{"from":"嘉定区","to":"苏州","total":7},{"from":"镇江","to":"南京","total":7},{"from":"丰台区","to":"东城区","total":7},{"from":"淮安","to":"南京","total":7},{"from":"广州","to":"孝感","total":7},{"from":"廊坊","to":"孝感","total":7},{"from":"苏州","to":"南京","total":7},{"from":"贵阳","to":"海淀区","total":7},{"from":"济南","to":"武汉","total":7},{"from":"朝阳区","to":"北京","total":7},{"from":"渝北区","to":"西安","total":7},{"from":"厦门","to":"南京","total":6},{"from":"房山区","to":"北京","total":6},{"from":"合肥","to":"南京","total":6},{"from":"贵阳","to":"贵阳","total":6},{"from":"信阳","to":"苏州","total":6},{"from":"郑州","to":"贵阳","total":6},{"from":"太原","to":"西安","total":6},{"from":"呼和浩特","to":"长沙","total":5},{"from":"成都","to":"南京","total":5},{"from":"浦东新区","to":"南京","total":5},{"from":"西安","to":"苏州","total":5},{"from":"太原","to":"呼和浩特","total":5},{"from":"闸北区","to":"西安","total":5},{"from":"杭州","to":"北京","total":5},{"from":"天津","to":"北京","total":5},{"from":"阜阳","to":"浦东新区","total":5},{"from":"昌平区","to":"东城区","total":4},{"from":"桂林","to":"柳州","total":4},{"from":"常州","to":"信阳","total":4},{"from":"北京","to":"呼和浩特","total":4},{"from":"上海","to":"东城区","total":4},{"from":"顺义区","to":"东城区","total":4},{"from":"宜昌","to":"武汉","total":4},{"from":"镇江","to":"遵义","total":4},{"from":"孝感","to":"鞍山","total":4},{"from":"三门峡","to":"贵阳","total":4},{"from":"东丽区","to":"孝感","total":4},{"from":"宁波","to":"南京","total":4},{"from":"孝感","to":"上海","total":4},{"from":"温州","to":"浦东新区","total":4},{"from":"广州","to":"北京","total":4},{"from":"长沙","to":"遵义","total":4},{"from":"杭州","to":"西安","total":4},{"from":"深圳","to":"南京","total":4},{"from":"信阳","to":"信阳","total":3},{"from":"贵阳","to":"北京","total":3},{"from":"北京","to":"重庆","total":3},{"from":"上海","to":"孝感","total":3},{"from":"宝鸡","to":"西安","total":3},{"from":"济南","to":"南京","total":3},{"from":"孝感","to":"泰州","total":3},{"from":"常州","to":"西安","total":3},{"from":"石家庄","to":"衡水","total":3},{"from":"厦门","to":"北京","total":3},{"from":"深圳","to":"东城区","total":3},{"from":"上海","to":"衡水","total":3},{"from":"南京","to":"呼和浩特","total":3},{"from":"广州","to":"丰台区","total":3},{"from":"西安","to":"成都","total":3},{"from":"北京","to":"成都","total":3},{"from":"北京","to":"孝感","total":3},{"from":"北京","to":"北京","total":3},{"from":"西安","to":"呼和浩特","total":3},{"from":"黄冈","to":"武汉","total":3},{"from":"南京","to":"西安","total":3},{"from":"门头沟区","to":"天津","total":3},{"from":"东丽区","to":"郑州","total":3},{"from":"南京","to":"镇江","total":3},{"from":"东丽区","to":"西安","total":3},{"from":"丰台区","to":"丰台区","total":3},{"from":"无锡","to":"浦东新区","total":2},{"from":"马鞍山","to":"南京","total":2},{"from":"丰台区","to":"遵义","total":2},{"from":"北京","to":"哈尔滨","total":2},{"from":"大兴县","to":"北京","total":2},{"from":"绍兴","to":"南京","total":2},{"from":"潍坊","to":"北京","total":2},{"from":"海口","to":"北京","total":2},{"from":"深圳","to":"北京","total":2},{"from":"沧州","to":"北京","total":2},{"from":"石家庄","to":"呼和浩特","total":2},{"from":"东莞","to":"孝感","total":2},{"from":"孝感","to":"无锡","total":2},{"from":"大理白族自治州","to":"拉萨","total":2},{"from":"东城区","to":"北京","total":2},{"from":"柳州","to":"孝感","total":2},{"from":"北京","to":"上海","total":2},{"from":"衡水","to":"上海","total":2},{"from":"郑州","to":"郑州","total":2},{"from":"朝阳区","to":"东城区","total":2},{"from":"武汉","to":"郑州","total":2},{"from":"南京","to":"天津","total":2},{"from":"深圳","to":"孝感","total":2},{"from":"绵阳","to":"遵义","total":2},{"from":"成都","to":"北京","total":2},{"from":"北京","to":"北京","total":2},{"from":"遵义","to":"遵义","total":2},{"from":"太原","to":"海口","total":2},{"from":"阜阳","to":"南京","total":2},{"from":"苏州","to":"贵阳","total":2},{"from":"泰州","to":"西安","total":2},{"from":"桂林","to":"贵阳","total":2},{"from":"上海","to":"上海","total":2},{"from":"东莞","to":"河源","total":2},{"from":"无锡","to":"福州","total":2},{"from":"海南","to":"郑州","total":2},{"from":"咸阳","to":"西安","total":2},{"from":"福州","to":"南京","total":2},{"from":"扬州","to":"呼和浩特","total":2},{"from":"威海","to":"武汉","total":2},{"from":"丰台区","to":"天津","total":2},{"from":"北京","to":"遵义","total":2},{"from":"沈阳","to":"西安","total":2},{"from":"海淀区","to":"东城区","total":2},{"from":"北京","to":"廊坊","total":2},{"from":"福州","to":"福州","total":2},{"from":"邢台","to":"西安","total":2},{"from":"海淀区","to":"武汉","total":2},{"from":"深圳","to":"西安","total":2},{"from":"武汉","to":"西安","total":2},{"from":"黄石","to":"孝感","total":2},{"from":"丰台区","to":"哈尔滨","total":2},{"from":"衡水","to":"石家庄","total":2},{"from":"海淀区","to":"海淀区","total":1},{"from":"贵阳","to":"重庆","total":1},{"from":"本溪","to":"南京","total":1},{"from":"石家庄","to":"北京","total":1},{"from":"北碚区","to":"西安","total":1},{"from":"东丽区","to":"东丽区","total":1},{"from":"德州","to":"丰台区","total":1},{"from":"东城区","to":"南岸区","total":1},{"from":"遵义","to":"重庆","total":1},{"from":"西安","to":"长沙","total":1},{"from":"北京","to":"西城区","total":1},{"from":"沈阳","to":"信阳","total":1},{"from":"咸阳","to":"孝感","total":1},{"from":"长沙","to":"孝感","total":1},{"from":"南开区","to":"西安","total":1},{"from":"北京","to":"柳州","total":1},{"from":"南昌","to":"北京","total":1},{"from":"贵阳","to":"东城区","total":1},{"from":"新乡","to":"呼和浩特","total":1},{"from":"西安","to":"东城区","total":1},{"from":"朝阳区","to":"海淀区","total":1},{"from":"呼和浩特","to":"上海","total":1},{"from":"九江","to":"南京","total":1},{"from":"金华","to":"东城区","total":1},{"from":"西城区","to":"海淀区","total":1},{"from":"日喀则地区","to":"呼和浩特","total":1},{"from":"柳州","to":"呼和浩特","total":1},{"from":"呼和浩特","to":"西安","total":1},{"from":"延庆县","to":"武汉","total":1},{"from":"南京","to":"信阳","total":1},{"from":"深圳","to":"抚州","total":1},{"from":"保定","to":"西安","total":1},{"from":"常州","to":"镇江","total":1},{"from":"无锡","to":"孝感","total":1},{"from":"汉中","to":"孝感","total":1},{"from":"南京","to":"丰台区","total":1},{"from":"嘉定区","to":"武汉","total":1},{"from":"淄博","to":"南京","total":1},{"from":"河北区","to":"孝感","total":1},{"from":"成都","to":"贵阳","total":1},{"from":"郑州","to":"东城区","total":1},{"from":"咸阳","to":"北京","total":1},{"from":"苏州","to":"孝感","total":1},{"from":"沙坪坝区","to":"郑州","total":1},{"from":"南昌","to":"南昌","total":1},{"from":"杭州","to":"遵义","total":1},{"from":"西青区","to":"东丽区","total":1},{"from":"贵阳","to":"孝感","total":1},{"from":"广州","to":"天津","total":1},{"from":"沈阳","to":"呼和浩特","total":1},{"from":"宜春","to":"孝感","total":1},{"from":"广州","to":"东城区","total":1},{"from":"扬州","to":"西安","total":1},{"from":"沈阳","to":"南京","total":1},{"from":"北京","to":"贵阳","total":1},{"from":"海口","to":"郑州","total":1},{"from":"苏州","to":"西安","total":1},{"from":"洛阳","to":"东城区","total":1},{"from":"海淀区","to":"丰台区","total":1},{"from":"宝鸡","to":"孝感","total":1},{"from":"房山区","to":"丰台区","total":1},{"from":"新乡","to":"遵义","total":1},{"from":"上海","to":"浦东新区","total":1},{"from":"北辰区","to":"西安","total":1},{"from":"北京","to":"苏州","total":1},{"from":"延庆县","to":"丰台区","total":1},{"from":"石家庄","to":"廊坊","total":1},{"from":"海口","to":"丰台区","total":1},{"from":"丰台区","to":"苏州","total":1},{"from":"浦东新区","to":"北京","total":1},{"from":"金华","to":"太原","total":1},{"from":"南京","to":"苏州","total":1},{"from":"丰台区","to":"呼和浩特","total":1}
]
var waigouData = [
  {"from":"南京","to":"南京","total":562},{"from":"北京","to":"北京","total":543},{"from":"沈阳","to":"沈阳","total":121},{"from":"盐城","to":"南京","total":98},{"from":"上海","to":"南京","total":89},{"from":"贵阳","to":"北京","total":88},{"from":"海淀区","to":"北京","total":87},{"from":"广安","to":"贵阳","total":82},{"from":"常州","to":"南京","total":77},{"from":"长沙","to":"长沙","total":76},{"from":"遵义","to":"贵阳","total":60},{"from":"杭州","to":"南京","total":57},{"from":"天津","to":"石家庄","total":55},{"from":"哈尔滨","to":"哈尔滨","total":54},{"from":"石家庄","to":"廊坊","total":53},{"from":"天津","to":"廊坊","total":52},{"from":"丰台区","to":"北京","total":50},{"from":"福州","to":"福州","total":48},{"from":"天津","to":"上海","total":48},{"from":"北京","to":"丰台区","total":46},{"from":"武汉","to":"北京","total":44},{"from":"房山区","to":"哈尔滨","total":40},{"from":"廊坊","to":"廊坊","total":40},{"from":"沈阳","to":"哈尔滨","total":36},{"from":"北京","to":"呼和浩特","total":36},{"from":"宁波","to":"南京","total":33},{"from":"呼和浩特","to":"呼和浩特","total":32},{"from":"十堰","to":"南京","total":32},{"from":"北京","to":"长沙","total":31},{"from":"北京","to":"廊坊","total":30},{"from":"武汉","to":"孝感","total":30},{"from":"扬州","to":"南京","total":30},{"from":"北京","to":"哈尔滨","total":29},{"from":"西安","to":"信阳","total":29},{"from":"北京","to":"孝感","total":28},{"from":"西安","to":"西安","total":27},{"from":"成都","to":"南京","total":26},{"from":"遵义","to":"成都","total":25},{"from":"静海县","to":"廊坊","total":25},{"from":"泰州","to":"南京","total":23},{"from":"金山区","to":"南京","total":23},{"from":"沈阳","to":"北京","total":23},{"from":"北京","to":"海淀区","total":22},{"from":"北京","to":"东城区","total":22},{"from":"北京","to":"朝阳","total":21},{"from":"孝感","to":"孝感","total":21},{"from":"贵阳","to":"遵义","total":21},{"from":"北京","to":"石家庄","total":21},{"from":"浦东新区","to":"南京","total":21},{"from":"遵义","to":"遵义","total":19},{"from":"","to":"南京","total":19},{"from":"广州","to":"长沙","total":19},{"from":"贵阳","to":"贵阳","total":19},{"from":"郑州","to":"北京","total":19},{"from":"成都","to":"呼和浩特","total":18},{"from":"嘉兴","to":"南京","total":18},{"from":"廊坊","to":"孝感","total":18},{"from":"北京","to":"南京","total":18},{"from":"上海","to":"廊坊","total":18},{"from":"武汉","to":"呼和浩特","total":17},{"from":"廊坊","to":"石家庄","total":17},{"from":"天津","to":"北京","total":17},{"from":"保定","to":"海淀区","total":17},{"from":"合肥","to":"孝感","total":17},{"from":"郑州","to":"郑州","total":16},{"from":"武汉","to":"武汉","total":16},{"from":"深圳","to":"北京","total":15},{"from":"株洲","to":"贵阳","total":15},{"from":"西城区","to":"北京","total":15},{"from":"武汉","to":"浦东新区","total":15},{"from":"娄底","to":"长沙","total":15},{"from":"绍兴","to":"长沙","total":14},{"from":"镇江","to":"青岛","total":14},{"from":"嘉定区","to":"南京","total":14},{"from":"北京","to":"黄石","total":14},{"from":"北京","to":"西安","total":14},{"from":"黄浦区","to":"北京","total":14},{"from":"深圳","to":"南昌","total":14},{"from":"赣州","to":"长沙","total":13},{"from":"西安","to":"孝感","total":13},{"from":"本溪","to":"长沙","total":13},{"from":"宝山区","to":"南京","total":13},{"from":"孝感","to":"郑州","total":12},{"from":"上海","to":"北京","total":12},{"from":"济南","to":"东城区","total":12},{"from":"本溪","to":"沈阳","total":12},{"from":"武汉","to":"长沙","total":12},{"from":"朝阳区","to":"北京","total":12},{"from":"武汉","to":"随州","total":11},{"from":"福州","to":"北京","total":11},{"from":"苏州","to":"信阳","total":11},{"from":"南京","to":"北京","total":11},{"from":"北京","to":"信阳","total":11},{"from":"徐汇区","to":"南京","total":11},{"from":"绍兴","to":"南京","total":11},{"from":"宁波","to":"贵阳","total":10},{"from":"信阳","to":"信阳","total":10},{"from":"怀柔县","to":"南京","total":10},{"from":"海淀区","to":"南京","total":10},{"from":"北京","to":"成都","total":10},{"from":"青岛","to":"海淀区","total":10},{"from":"呼和浩特","to":"北京","total":9},{"from":"孝感","to":"北京","total":9},{"from":"温州","to":"南京","total":8},{"from":"西安","to":"丰台区","total":8},{"from":"无锡","to":"南京","total":8},{"from":"西安","to":"南京","total":8},{"from":"深圳","to":"贵阳","total":8},{"from":"天津","to":"郑州","total":8},{"from":"西安","to":"北京","total":8},{"from":"西安","to":"呼和浩特","total":8},{"from":"长沙","to":"金华","total":7},{"from":"杭州","to":"遵义","total":7},{"from":"西安","to":"海淀区","total":7},{"from":"孝感","to":"武汉","total":7},{"from":"泰州","to":"贵阳","total":6},{"from":"淮安","to":"南京","total":6},{"from":"苏州","to":"郑州","total":6},{"from":"沧州","to":"南京","total":6},{"from":"绍兴","to":"遵义","total":6},{"from":"闵行区","to":"北京","total":6},{"from":"徐汇区","to":"东城区","total":6},{"from":"成都","to":"北京","total":6},{"from":"巴南区","to":"贵阳","total":6},{"from":"海淀区","to":"昌吉回族自治州","total":6},{"from":"郑州","to":"贵阳","total":6},{"from":"南京","to":"孝感","total":5},{"from":"深圳","to":"长沙","total":5},{"from":"徐州","to":"南京","total":5},{"from":"常州","to":"丰台区","total":5},{"from":"海淀区","to":"济南","total":5},{"from":"重庆","to":"孝感","total":5},{"from":"北京","to":"天津","total":5},{"from":"孝感","to":"上海","total":5},{"from":"重庆","to":"贵阳","total":5},{"from":"杭州","to":"孝感","total":5},{"from":"延庆县","to":"西安","total":5},{"from":"南京","to":"东城区","total":5},{"from":"长沙","to":"遵义","total":5},{"from":"济南","to":"廊坊","total":5},{"from":"广州","to":"南昌","total":5},{"from":"延庆县","to":"孝感","total":5},{"from":"郑州","to":"南京","total":5},{"from":"北京","to":"郑州","total":5},{"from":"沈阳","to":"呼和浩特","total":5},{"from":"三门峡","to":"贵阳","total":4},{"from":"呼和浩特","to":"包头","total":4},{"from":"镇江","to":"丰台区","total":4},{"from":"九龙坡区","to":"贵阳","total":4},{"from":"广州","to":"北京","total":4},{"from":"西安","to":"长沙","total":4},{"from":"洛阳","to":"孝感","total":4},{"from":"宿迁","to":"南京","total":4},{"from":"杭州","to":"北京","total":4},{"from":"北京","to":"武汉","total":4},{"from":"北京","to":"遵义","total":4},{"from":"桂林","to":"贵阳","total":4},{"from":"北京","to":"上海","total":4},{"from":"镇江","to":"宜昌","total":4},{"from":"铜陵","to":"北京","total":4},{"from":"东丽区","to":"廊坊","total":4},{"from":"邯郸","to":"长沙","total":4},{"from":"成都","to":"西安","total":4},{"from":"南京","to":"长沙","total":4},{"from":"徐州","to":"海淀区","total":4},{"from":"遵义","to":"武汉","total":4},{"from":"天津","to":"烟台","total":4},{"from":"宝鸡","to":"南京","total":4},{"from":"朝阳区","to":"青岛","total":3},{"from":"大兴县","to":"北京","total":3},{"from":"深圳","to":"海淀区","total":3},{"from":"南岸区","to":"东城区","total":3},{"from":"合肥","to":"呼和浩特","total":3},{"from":"苏州","to":"长沙","total":3},{"from":"宜昌","to":"武汉","total":3},{"from":"新乡","to":"武汉","total":3},{"from":"铜陵","to":"丰台区","total":3},{"from":"闵行区","to":"保定","total":3},{"from":"郑州","to":"沈阳","total":3},{"from":"北京","to":"西城区","total":3},{"from":"嘉兴","to":"西安","total":3},{"from":"孝感","to":"长沙","total":3},{"from":"温州","to":"保定","total":3},{"from":"长沙","to":"西安","total":3},{"from":"北京","to":"济南","total":3},{"from":"厦门","to":"南京","total":3},{"from":"长沙","to":"北京","total":3},{"from":"鄂州","to":"北京","total":3},{"from":"门头沟区","to":"北京","total":3},{"from":"洛阳","to":"北京","total":3},{"from":"上海","to":"镇江","total":3},{"from":"长沙","to":"孝感","total":3},{"from":"海淀区","to":"上海","total":3},{"from":"济南","to":"镇江","total":3},{"from":"大兴县","to":"长沙","total":3},{"from":"长春","to":"朝阳","total":3},{"from":"武汉","to":"青岛","total":3},{"from":"常州","to":"浦东新区","total":3},{"from":"广州","to":"贵阳","total":3},{"from":"南京","to":"南宁","total":2},{"from":"朝阳","to":"天津","total":2},{"from":"南京","to":"廊坊","total":2},{"from":"济南","to":"青岛","total":2},{"from":"奉贤县","to":"浦东新区","total":2},{"from":"北京","to":"贵阳","total":2},{"from":"沈阳","to":"朝阳","total":2},{"from":"天津","to":"成都","total":2},{"from":"重庆","to":"沈阳","total":2},{"from":"昌平区","to":"孝感","total":2},{"from":"湖州","to":"北京","total":2},{"from":"成都","to":"贵阳","total":2},{"from":"贵阳","to":"郑州","total":2},{"from":"洛阳","to":"长沙","total":2},{"from":"成都","to":"孝感","total":2},{"from":"遵义","to":"苏州","total":2},{"from":"东莞","to":"贵阳","total":2},{"from":"沈阳","to":"上海","total":2},{"from":"丰台区","to":"沈阳","total":2},{"from":"广州","to":"南京","total":2},{"from":"海淀区","to":"东城区","total":2},{"from":"石家庄","to":"呼和浩特","total":2},{"from":"呼和浩特","to":"孝感","total":2},{"from":"南京","to":"海淀区","total":2},{"from":"淮南","to":"贵阳","total":2},{"from":"海淀区","to":"合肥","total":2},{"from":"北京","to":"重庆","total":2},{"from":"遵义","to":"咸阳","total":2},{"from":"石家庄","to":"上海","total":2},{"from":"青浦区","to":"南京","total":2},{"from":"黄石","to":"孝感","total":2},{"from":"贵阳","to":"沈阳","total":2},{"from":"南京","to":"广州","total":2},{"from":"杭州","to":"贵阳","total":2},{"from":"西安","to":"成都","total":2},{"from":"常州","to":"武汉","total":2},{"from":"日喀则地区","to":"呼和浩特","total":2},{"from":"九龙坡区","to":"孝感","total":2},{"from":"淄博","to":"上海","total":2},{"from":"海淀区","to":"南宁","total":2},{"from":"成都","to":"东城区","total":2},{"from":"南京","to":"丰台区","total":2},{"from":"武汉","to":"大连","total":2},{"from":"青岛","to":"镇江","total":2},{"from":"海淀区","to":"杭州","total":2},{"from":"威海","to":"武汉","total":2},{"from":"浦东新区","to":"浦东新区","total":2},{"from":"宝鸡","to":"信阳","total":2},{"from":"郑州","to":"孝感","total":2},{"from":"廊坊","to":"北京","total":1},{"from":"佛山","to":"长沙","total":1},{"from":"深圳","to":"南京","total":1},{"from":"阜阳","to":"南京","total":1},{"from":"贵阳","to":"苏州","total":1},{"from":"延庆县","to":"丰台区","total":1},{"from":"成都","to":"长沙","total":1},{"from":"海口","to":"北京","total":1},{"from":"上海","to":"东城区","total":1},{"from":"房山区","to":"北京","total":1},{"from":"杭州","to":"杭州","total":1},{"from":"沈阳","to":"天津","total":1},{"from":"武清区","to":"呼和浩特","total":1},{"from":"苏州","to":"北京","total":1},{"from":"北京","to":"海口","total":1},{"from":"呼和浩特","to":"沈阳","total":1},{"from":"宁波","to":"北京","total":1},{"from":"北京","to":"北京","total":1},{"from":"广州","to":"青岛","total":1},{"from":"宁波","to":"孝感","total":1},{"from":"朝阳","to":"海淀区","total":1},{"from":"扬州","to":"浦东新区","total":1},{"from":"长沙","to":"南京","total":1},{"from":"西安","to":"东城区","total":1},{"from":"鄂州","to":"丰台区","total":1},{"from":"信阳","to":"长沙","total":1},{"from":"南京","to":"苏州","total":1},{"from":"天津","to":"杭州","total":1},{"from":"上海","to":"呼和浩特","total":1},{"from":"上海","to":"西城区","total":1},{"from":"昆明","to":"南京","total":1},{"from":"武汉","to":"宜宾","total":1},{"from":"济南","to":"南京","total":1},{"from":"包头","to":"呼和浩特","total":1},{"from":"海淀区","to":"西安","total":1},{"from":"青岛","to":"北京","total":1},{"from":"郑州","to":"合肥","total":1},{"from":"石家庄","to":"天津","total":1},{"from":"廊坊","to":"济南","total":1},{"from":"大兴县","to":"丰台区","total":1},{"from":"南昌","to":"深圳","total":1},{"from":"宁波","to":"呼和浩特","total":1},{"from":"北碚区","to":"长沙","total":1},{"from":"铁岭","to":"海淀区","total":1},{"from":"泰州","to":"廊坊","total":1},{"from":"拉萨","to":"大理白族自治州","total":1},{"from":"景德镇","to":"北京","total":1},{"from":"朝阳区","to":"丰台区","total":1},{"from":"扬州","to":"呼和浩特","total":1},{"from":"昌平区","to":"天津","total":1},{"from":"常州","to":"海淀区","total":1},{"from":"孝感","to":"南京","total":1},{"from":"上海","to":"上海","total":1},{"from":"青浦区","to":"呼和浩特","total":1},{"from":"南京","to":"贵阳","total":1},{"from":"海淀区","to":"丰台区","total":1},{"from":"天津","to":"嘉兴","total":1},{"from":"孝感","to":"贵阳","total":1},{"from":"丰台区","to":"海淀区","total":1},{"from":"衡水","to":"石家庄","total":1},{"from":"河西区","to":"天津","total":1},{"from":"北京","to":"镇江","total":1},{"from":"泉州","to":"海淀区","total":1},{"from":"南通","to":"南京","total":1},{"from":"随州","to":"武汉","total":1},{"from":"遵义","to":"上海","total":1},{"from":"威海","to":"孝感","total":1},{"from":"静安区","to":"南京","total":1},{"from":"海淀区","to":"保定","total":1},{"from":"沈阳","to":"长沙","total":1},{"from":"忻州","to":"呼和浩特","total":1},{"from":"海淀区","to":"九龙坡区","total":1},{"from":"西安","to":"昆明","total":1},{"from":"丰台区","to":"丰台区","total":1},{"from":"天津","to":"南京","total":1},{"from":"泰安","to":"南京","total":1},{"from":"保定","to":"天津","total":1},{"from":"遵义","to":"乌鲁木齐","total":1},{"from":"武汉","to":"南京","total":1},{"from":"东丽区","to":"北京","total":1},{"from":"北京","to":"太原","total":1},{"from":"武汉","to":"上海","total":1},{"from":"静海县","to":"镇江","total":1},{"from":"大理白族自治州","to":"北京","total":1},{"from":"南昌","to":"南昌","total":1},{"from":"郑州","to":"呼和浩特","total":1},{"from":"朝阳","to":"北京","total":1},{"from":"漯河","to":"孝感","total":1},{"from":"海淀区","to":"海淀区","total":1},{"from":"广州","to":"孝感","total":1},{"from":"上海","to":"西安","total":1},{"from":"丰台区","to":"哈尔滨","total":1},{"from":"徐汇区","to":"北京","total":1},{"from":"天津","to":"松江区","total":1},{"from":"昌平区","to":"北京","total":1},{"from":"遵义","to":"桂林","total":1},{"from":"青岛","to":"孝感","total":1},{"from":"厦门","to":"北京","total":1},{"from":"湛江","to":"长沙","total":1},{"from":"河东区","to":"天津","total":1},{"from":"天津","to":"长沙","total":1},{"from":"宝山区","to":"呼和浩特","total":1},{"from":"宝鸡","to":"北京","total":1},{"from":"北京","to":"青岛","total":1},{"from":"贵阳","to":"孝感","total":1},{"from":"丰台区","to":"西安","total":1},{"from":"北京","to":"沈阳","total":1},{"from":"昆明","to":"北京","total":1},{"from":"济南","to":"北京","total":1},{"from":"青浦区","to":"长沙","total":1},{"from":"温州","to":"呼和浩特","total":1},{"from":"西城区","to":"拉萨","total":1},{"from":"青岛","to":"武汉","total":1},{"from":"大连","to":"北京","total":1},{"from":"东丽区","to":"西安","total":1},{"from":"广州","to":"海淀区","total":1},{"from":"成都","to":"上海","total":1},{"from":"扬州","to":"东城区","total":1},{"from":"丰台区","to":"南京","total":1},{"from":"济南","to":"呼和浩特","total":1}
];

waigou = makeData(waigouData);
waixie = makeData(waixieData);

var waixieBuy = {
	name: "外协采购",
	data: [2.41, 12.5, 10.95, 3.07, 3.78, 3.43, 4.66, 9.04, 3.92, 0.4, 1.08, 2.84, 6.29, 9.02]
};

var waixieSell = {
	name: '外协销售',
	data: [0.09, 3.89, 7.8, 1.14, 3.67, 1.11, 1.18, 3.65, 3.67, 0.18, 1.27, 6.38, 10.51, 22.3]
};

var waigouBuy = {
	name: '外购采购',
	data: [3.75, 11.41, 15.9, 6.85, 14.11, 10.78, 11.94, 18.3, 16.69, 1.25, 4.48, 7.72, 7.33, 21.31]
};

var waigouSell = {
	name: '外购销售',
	data: [0.72, 5.33, 6.89, 2.46, 2.05, 1.58, 2.5, 5.64, 6.54, 11.11, 11.22, 21.75, 13.67, 52.17]
};

var jiaWaiGou = [
  {
    "name": "专用设备制造",
    "value": 3368174058
  },
  {
    "name": "科技推广",
    "value": 3238961344
  },
  {
    "name": "批发",
    "value": 2943974242
  },
  {
    "name": "传输服务",
    "value": 1964034292
  },
  {
    "name": "汽车制造",
    "value": 1955294176
  },
  {
    "name": "零售",
    "value": 946226657.9
  },
  {
    "name": "研究试验",
    "value": 786960571.8
  },
  {
    "name": "建筑安装",
    "value": 600088169.5
  },
  {
    "name": "仪器仪表",
    "value": 556166509.8
  },
  {
    "name": "计算机电子",
    "value": 519431283.8
  },
  {
    "name": "保险",
    "value": 158380000
  },
  {
    "name": "运输设备制造",
    "value": 157135826.6
  },
  {
    "name": "通用设备",
    "value": 145468961
  },
  {
    "name": "道路运输",
    "value": 142365600
  },
  {
    "name": "化学原料和化学制品制造",
    "value": 114352870.8
  },
  {
    "name": "机械器材制造",
    "value": 86755454.27
  },
  {
    "name": "金属制品",
    "value": 70596746.5
  },
  {
    "name": "石油加工、炼焦和核燃料加工",
    "value": 58474694
  },
  {
    "name": "有色金属冶炼加工",
    "value": 56521786.63
  },
  {
    "name": "土木工程建筑",
    "value": 52180871.12
  },
  {
    "name": "黑色金属冶炼和压延加工",
    "value": 24805129.73
  },
  {
    "name": "机动车、电子产品和日用产品修理",
    "value": 23020003
  },
  {
    "name": "纺织",
    "value": 18389145.88
  },
  {
    "name": "互联网和相关服务",
    "value": 10170309.7
  },
  {
    "name": "建筑装饰和其他建筑",
    "value": 9500838.125
  },
  {
    "name": "家具制造",
    "value": 7706306
  },
  {
    "name": "其他服务",
    "value": 7368000
  },
  {
    "name": "房地产",
    "value": 7278597.797
  },
  {
    "name": "商务服务",
    "value": 6979739.063
  },
  {
    "name": "皮革、毛皮、羽毛及其制品和制鞋",
    "value": 3746224.5
  },
  {
    "name": "教育",
    "value": 2714458.875
  },
  {
    "name": "住宿",
    "value": 1320755.008
  },
  {
    "name": "橡胶和塑料",
    "value": 442008.5
  },
  {
    "name": "专业技术服务",
    "value": 383800.3281
  },
  {
    "name": "煤炭开采和洗选",
    "value": 176800
  },
  {
    "name": "医药制造",
    "value": 151379.9785
  },
  {
    "name": "燃气生产和供应",
    "value": 66000
  },
  {
    "name": "餐饮",
    "value": 2150
  },
  {
    "name": "农",
    "value": 98.29000092
  }
];

var yiWaiGou = [
  {
    "name": "科技推广",
    "value": 4048426053
  },
  {
    "name": "批发",
    "value": 3322669810
  },
  {
    "name": "橡胶和塑料",
    "value": 1537403748
  },
  {
    "name": "计算机电子",
    "value": 1354105535
  },
  {
    "name": "汽车制造",
    "value": 1328000797
  },
  {
    "name": "传输服务",
    "value": 1099685446
  },
  {
    "name": "机械器材制造",
    "value": 779052584.4
  },
  {
    "name": "专用设备制造",
    "value": 678587801.9
  },
  {
    "name": "研究试验",
    "value": 575362285.5
  },
  {
    "name": "仪器仪表",
    "value": 254773767.9
  },
  {
    "name": "通用设备",
    "value": 203402044.5
  },
  {
    "name": "有色金属冶炼加工",
    "value": 166560118.3
  },
  {
    "name": "化学原料和化学制品制造",
    "value": 152863550
  },
  {
    "name": "道路运输",
    "value": 110727579.6
  },
  {
    "name": "黑色金属冶炼和压延加工",
    "value": 110400439.7
  },
  {
    "name": "石油加工、炼焦和核燃料加工",
    "value": 106480660.6
  },
  {
    "name": "金属制品",
    "value": 96431479.58
  },
  {
    "name": "建筑安装",
    "value": 93765338.36
  },
  {
    "name": "零售",
    "value": 92352523.45
  },
  {
    "name": "建筑装饰和其他建筑",
    "value": 60723363.23
  },
  {
    "name": "机动车、电子产品和日用产品修理",
    "value": 56732223.97
  },
  {
    "name": "纺织",
    "value": 45698592.66
  },
  {
    "name": "商务服务",
    "value": 42999341.5
  },
  {
    "name": "土木工程建筑",
    "value": 35516896.75
  },
  {
    "name": "运输设备制造",
    "value": 24878605.3
  },
  {
    "name": "皮革、毛皮、羽毛及其制品和制鞋",
    "value": 8052509.629
  },
  {
    "name": "家具制造",
    "value": 7523130.01
  },
  {
    "name": "教育",
    "value": 6675920
  },
  {
    "name": "其他服务",
    "value": 2170000
  },
  {
    "name": "互联网和相关服务",
    "value": 2169168.119
  },
  {
    "name": "专业技术服务",
    "value": 1000000
  },
  {
    "name": "医药制造",
    "value": 895000
  },
  {
    "name": "农",
    "value": 324269
  },
  {
    "name": "燃气生产和供应",
    "value": 286386.4402
  },
  {
    "name": "餐饮",
    "value": 147438
  },
  {
    "name": "文化艺术",
    "value": 1170
  }
];

var jiaWaiXie = [
  {
    "name": "保险",
    "value": 778000000
  },
  {
    "name": "研究试验",
    "value": 634000000
  },
  {
    "name": "建筑安装",
    "value": 616000000
  },
  {
    "name": "商务服务",
    "value": 466000000
  },
  {
    "name": "科技推广应用",
    "value": 408000000
  },
  {
    "name": "房地产",
    "value": 407000000
  },
  {
    "name": "设备制造",
    "value": 362000000
  },
  {
    "name": "批发",
    "value": 286000000
  },
  {
    "name": "仪器仪表",
    "value": 219000000
  },
  {
    "name": "通用设备",
    "value": 160000000
  },
  {
    "name": "计算机通信",
    "value": 150000000
  },
  {
    "name": "传输服务",
    "value": 143000000
  },
  {
    "name": "运输设备制造",
    "value": 81400000
  },
  {
    "name": "专业技术服务",
    "value": 37700000
  },
  {
    "name": "机械器材制造",
    "value": 37000000
  },
  {
    "name": "土木工程建筑",
    "value": 33100000
  },
  {
    "name": "黑色金属冶炼和压延加工",
    "value": 31000000
  },
  {
    "name": "汽车制造",
    "value": 25900000
  },
  {
    "name": "零售",
    "value": 18300000
  },
  {
    "name": "建筑装饰和其他建筑",
    "value": 16600000
  },
  {
    "name": "金属制品",
    "value": 11700000
  },
  {
    "name": "互联网和相关服务",
    "value": 9820000
  },
  {
    "name": "道路运输",
    "value": 5960000
  },
  {
    "name": "住宿",
    "value": 5200000
  },
  {
    "name": "化学原料和化学制品制造",
    "value": 3730000
  },
  {
    "name": "其他服务",
    "value": 2500000
  },
  {
    "name": "医药制造",
    "value": 1930000
  },
  {
    "name": "纺织",
    "value": 1110000
  },
  {
    "name": "石油加工、炼焦和核燃料加工",
    "value": 917000
  },
  {
    "name": "文化艺术",
    "value": 131000
  }
];

var yiWaiXie = [
  {
    "name": "建筑安装",
    "value": 1060000000
  },
  {
    "name": "科技推广",
    "value": 874000000
  },
  {
    "name": "批发",
    "value": 623000000
  },
  {
    "name": "土木工程建筑",
    "value": 516000000
  },
  {
    "name": "保险",
    "value": 473000000
  },
  {
    "name": "专用设备制造",
    "value": 359000000
  },
  {
    "name": "计算机电子",
    "value": 221000000
  },
  {
    "name": "研究试验",
    "value": 204000000
  },
  {
    "name": "通用设备",
    "value": 177000000
  },
  {
    "name": "仪器仪表",
    "value": 169000000
  },
  {
    "name": "建筑装饰和其他建筑",
    "value": 168000000
  },
  {
    "name": "传输服务",
    "value": 156000000
  },
  {
    "name": "金属制品",
    "value": 128000000
  },
  {
    "name": "机械器材制造",
    "value": 110000000
  },
  {
    "name": "汽车制造",
    "value": 91700000
  },
  {
    "name": "运输设备制造",
    "value": 83300000
  },
  {
    "name": "黑色金属冶炼和压延加工",
    "value": 63700000
  },
  {
    "name": "专业技术服务",
    "value": 40200000
  },
  {
    "name": "房地产",
    "value": 34600000
  },
  {
    "name": "零售",
    "value": 19600000
  },
  {
    "name": "商务服务",
    "value": 16300000
  },
  {
    "name": "互联网和相关服务",
    "value": 16300000
  },
  {
    "name": "橡胶和塑料",
    "value": 13400000
  },
  {
    "name": "其他服务",
    "value": 12400000
  },
  {
    "name": "有色金属冶炼加工",
    "value": 12200000
  },
  {
    "name": "石油加工、炼焦和核燃料加工",
    "value": 11600000
  },
  {
    "name": "道路运输",
    "value": 7520000
  },
  {
    "name": "化学原料和化学制品制造",
    "value": 6540000
  },
  {
    "name": "纺织",
    "value": 3000000
  },
  {
    "name": "教育",
    "value": 2130000
  },
  {
    "name": "煤炭开采和洗选",
    "value": 2000000
  },
  {
    "name": "文化艺术",
    "value": 1900000
  },
  {
    "name": "机动车、电子产品和日用产品修理",
    "value": 1390000
  },
  {
    "name": "家具制造",
    "value": 1200000
  },
  {
    "name": "医药制造",
    "value": 840000
  },
  {
    "name": "住宿",
    "value": 352000
  },
  {
    "name": "皮革、毛皮、羽毛及其制品和制鞋",
    "value": 349000
  }
];
