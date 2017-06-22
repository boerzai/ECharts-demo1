window.setTimeout(function() {
  //$(document.body).css('background', 'linear-gradient(to bottom, #031228, #073046)');
}, 1000);


document.title = "云网数据可视化";
// global object
var gb = {
    charts: []
};

function getHash(name) {
    var result = null;
    var hash = document.location.hash;
    if (hash) {
        hash = hash.substr(1);
        var arr = hash.split('&');
        for (var item in arr) {
            var nv = arr[item].split('=');
            if (nv && nv.length >= 1 && nv[0] == name) {
                result = nv.length > 1 ? decodeURIComponent(nv[1]) : '';
                break;
            }
        }
    }

    return result;
}

function getData(arr) {
    var count = Math.random() * 10;
    if (count < 2) {
        count = 3;
    } else if (count < 7) {
        count = 5;
    } else if (count < 9) {
        count = 8;
    } else {
        count = 12;
    }

    var maxValue = 13;
    var now = new Date();
    if(now.getHours() > 9 && now.getHours() < 17) {
        maxValue = 38;
    }

    var result = [], mapping = {};
    while (result.length < count) {
        // use random weight
        var tmp = weight_rand(arr);
        if(mapping[tmp.name]) {
            continue;
        }

        mapping[tmp.name] = 1;

        var coop = _geoCoordMap[tmp.name];
        if (coop) {
          var value = Math.max(1, parseInt(Math.random() * maxValue));
          result.push({
              name: tmp.name,
              value: [coop[0], coop[1], value]
          });
        }
    }

    return result;
}

var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = window._geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

function randomData(min, max) {
    if (typeof(max) == "undefined") {
      max = 1000;
    }

    if (typeof(min) == "undefined") {
      min = 1;
    }

    return Math.random() * (max - min) + min;
}

var _titleHeight = 100;

function showTitle(text) {
    $(document.body).prepend('<div style="position: fixed; top:0; left: 0; width:100%; height:' + _titleHeight + 'px;"><img src="image/nav.png" /></div>'
        + '<div id="title" style="z-index: 999; position: fixed; top:0; left: 0; text-align:center; margin-left:0%; margin-top:10px; width:100%; height:' + _titleHeight + 'px; font-size: 40pt; color: #fff; font-family: 微软雅黑, 黑体; ">' + text + '</div>');
    $(document.body).css({background: 'url(image/bg2.jpg) no-repeat'});
    $('#title').css({color: '#49d9fe'})
}

function showLeftContainer(hw1, hw2, hw3) {
    var margin = 10, leftMargin = 300;
    $('.wrapper').height(window.innerHeight)//.css({'padding-bottom': '3px', 'margin-top':'-3px'});
    var html = '<div style="width: 25%; z-index: 999; position: fixed; bottom:0; left:' + leftMargin + 'px; " class="light">'
        + '<div id="container2" style="height: 100%; width: 100%" _hw="' + hw2 + '"></div>'
     + '</div>'
     + '<div style="width: 25%; z-index: 999; position: fixed; top:' + (2*margin) + 'px; left:' + leftMargin + 'px; " class="light">'
         + '<div id="container1" style="height: 100%; width: 100%;" _hw="' + hw1 + '"></div>'
     + '</div>'
     + '<div style="width: 25%; z-index: 999; position: fixed; bottom:' + margin + 'px; left:' + leftMargin + 'px;" class="light">'
         + '<div id="container3" style="height: 100%; width: 100%;" _hw="' + hw3 + '"></div>'
     + '</div>';
    $(document.body).append(html);

    if(!hw1) {
        if(!hw2) {
            $('#container1, #container2').hide();
            var height = (window.innerHeight - _titleHeight) * 0.35 - margin;
            $('#container3').parent().height(height);
        }
        else {
            $('#container1').hide();
            var height = (window.innerHeight - _titleHeight) * 0.35 - margin;
            $('#container3, #container2').parent().height(height);
            $('#container2').parent().css('bottom', height + margin * 2);
        }
    }
    else {
        var height = (window.innerHeight - _titleHeight - 5 * margin) / 3;
        $('#container1, #container3, #container2').parent().height(height);
        $('#container2').parent().css('bottom', height + margin * 2);
        $('#container1').parent().css('top', _titleHeight + margin * 2);
    }
}

/*
 * show chart
 */
function showChart(id, option) {
    if(option.autoHeight === true) {
        $('#' + id).css('height', window.innerHeight);
    }

    function show(boxId, boxOption) {
        var dom = document.getElementById(boxId);
        var windowHeight = getWindowHeight();
        $('.wraper').css('height', windowHeight);

        if(boxOption.autoHeight === true) {
            $('#' + boxId).css('height', $('#' + boxId).parent().height());
        }
        else {
            var whp = parseFloat($('#' + boxId).attr('_whp'));
            if(whp) {//window高度百分比
                $('#' + boxId).css('height', windowHeight * whp);
            }

            var hwrate = parseFloat($('#' + boxId).attr('_hw'));
            if(hwrate){
                if(whp) {
                    var width = $('#' + boxId).height() / hwrate;
                    $('#' + boxId).width(width);
                }
                else {
                    var height = $('#' + id).width() * hwrate;
                    $('#' + boxId).height(height);
                }
            }
        }

        var myChart = window.echarts.init(dom);
        if (boxOption && typeof boxOption === "object") {
            myChart.setOption(boxOption, true);
        }

        if (!(boxId in gb.charts)) {
            gb.charts[boxId] = myChart;
        }
    }
    show(id, option);

    function getWindowHeight() {
        var doc = document.documentElement;
        return window.innerHeight || (doc && doc.clientHeight) || document.body.clientHeight;
    }
}


/**
* js数组实现权重概率分配，支持数字比模式(支持2位小数)和百分比模式(不支持小数，最后一个元素多退少补)
* @param    Array    arr    js数组，参数类型[Object,Object,Object……]
* @return   Array           返回一个随机元素，概率为其weight/所有weight之和，参数类型Object
* @author   shuiguang
*/
function weight_rand(arr){
    //参数arr元素必须含有weight属性，参考如下所示
    //var arr=[{name:'1',weight:1.5},{name:'2',weight:2.5},{name:'3',weight:3.5}];
    //var arr=[{name:'1',weight:'15%'},{name:'2',weight:'25%'},{name:'3',weight:'35%'}];
    //求出最大公约数以计算缩小倍数，perMode为百分比模式
    var per;
    var maxNum = 0;
    var perMode = false;
    //自定义Math求最小公约数方法
    Math.gcd = function(a,b){
        var min = Math.min(a,b);
        var max = Math.max(a,b);
        var result = 1;
        if(a === 0 || b===0){
            return max;
        }
        for(var i=min; i>=1; i--){
            if(min % i === 0 && max % i === 0){
                result = i;
                break;
            }
        }
        return result;
    };

    //使用clone元素对象拷贝仍然会造成浪费，但是使用权重数组对应关系更省内存
    var weight_arr = new Array();
    for (i = 0; i < arr.length; i++) {
        if('undefined' != typeof(arr[i].weight))
        {
            if(arr[i].weight.toString().indexOf('%') !== -1) {
                per = Math.floor(arr[i].weight.toString().replace('%',''));
                perMode = true;
            }else{
                per = Math.floor(arr[i].weight*100);
            }
        }else{
            per = 0;
        }
        weight_arr[i] = per;
        maxNum = Math.gcd(maxNum, per);
    }
    //数字比模式，3:5:7，其组成[0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2]
    //百分比模式，元素所占百分比为15%，25%，35%
    var index = new Array();
    var total = 0;
    var len = 0;
    if(perMode){
        for (i = 0; i < arr.length; i++) {
            //len表示存储arr下标的数据块长度，已优化至最小整数形式减小索引数组的长度
            len = weight_arr[i];
            for (j = 0; j < len; j++){
                //超过100%跳出，后面的舍弃
                if(total >= 100){
                    break;
                }
                index.push(i);
                total++;
            }
        }
        //使用最后一个元素补齐100%
        while(total < 100){
            index.push(arr.length-1);
            total++;
        }
    }else{
        for (i = 0; i < arr.length; i++) {
            //len表示存储arr下标的数据块长度，已优化至最小整数形式减小索引数组的长度
            len = weight_arr[i]/maxNum;
            for (j = 0; j < len; j++){
                index.push(i);
            }
            total += len;
        }
    }
    //随机数值，其值为0-11的整数，数据块根据权重分块
    var rand = Math.floor(Math.random()*total);
    //console.log(index);
    return arr[index[rand]];
}
