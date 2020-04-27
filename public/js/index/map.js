var myChart = echarts.init(document.getElementById('main'));
//    let dataList = document.getElementById('data').getAttribute("data")
       let  dataList= $.ajax({url:"/data",async:false}).responseText;

option = {
    tooltip: {
        fontSize:'8',
        extraCssText:'font-size: 10',
        triggerOn: "click",
        formatter: function(e, t, n) {
            return .5 == e.value ? e.name + "：有疑似病例" : e.seriesName + "<br />" + e.name + "：" + e.value
        }
    },
    visualMap: {
        min: 0,
        max: 1000,
        left: 20,
        bottom:70,
        showLabel: !0,
        text: ["高", "低"],
        pieces: [{
            gt: 10000,
            label: "> 10000 人",
            color: "#7f1100"
        }, {
            gte: 1000,
            lte: 10000,
            label: "1000 - 10000 人",
            color: "#ff5428"
        }, {
            gte: 500,
            lt: 1000,
            label: "500 - 1000 人",
            color: "#ff8c71"
        }, {
            gte: 100,
            lt: 500,
            label: "100 - 500 人",
            color: "#ffd768"
        }, {
            lt: 100,
            label: "< 100 人",
            color: "#ffffef"
        }],
        show: !0,
        textStyle: {
            color: '#7B93A7',
            fontSize: '8'
        },
       textGap:5,
       itemGap:5,   
    },
    geo: {
        map: "china",
        roam: !1,
        scaleLimit: {
            min: 1,
            max: 2
        },
        zoom: 1.23,
        top: 120,
        label: {
            normal: {
                show: !0,
                fontSize: "8",
                color: "rgba(0,0,0,0.7)"
            }
        },
        itemStyle: {
            normal: {
                //shadowBlur: 50,
                //shadowColor: 'rgba(0, 0, 0, 0.2)',
                borderColor: "rgba(0, 0, 0, 0.2)",
            },
            emphasis: {
                areaColor: "#f2d5ad",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderWidth: 0,
            }
        }
    },
    series: [{
        name: "确诊病例",
        type: "map",
        geoIndex: 0 ,
        data: JSON.parse(dataList)
    }]
};

myChart.setOption(option);