require(["js/config.js"], function() {
    require(["jquery", "swiper", "swiperAnimate1"], function($, Swiper) {

        $(function() {
            // ============== echarts 图表=======================
            // let myechart1 = echarts.init(document.getElementById('echartPhotoCode'), 'light');
            // // 指定图表的配置项和数据
            // let option1 = {
            //     title: {
            //         text: '技能：',
            //         textStyle: {
            //             color: "#FF8604",
            //             fontSize: 20,
            //             fontWeight: 600
            //         }

            //     },
            //     tooltip: {
            //         show: false,
            //     },

            //     series: [{
            //         type: 'pie',
            //         // roseType: 'angle',
            //         clickable: false,
            //         color: ['#67E0E3', '#9FE6B8', '#FFDB5C', '#ff9f7f', '#E690D1', '#e7bcf3', '#9d96f5', '#FF8604', '#96BFFF'],
            //         label: {
            //             fontSize: 13,
            //             fontWeight: 600
            //         },
            //         data: [
            //             { name: 'HTML5/CSS3', value: 10 },
            //             { name: 'javascript', value: 15 },
            //             { name: 'gulp/webpack', value: 10 },
            //             { name: 'sass/Less/requireJs', value: 10 },
            //             { name: 'bootstrap/swiper', value: 10 },
            //             { name: 'PhotoShop', value: 5 },
            //             { name: 'Office', value: 5 },
            //             { name: 'VUE/React', value: 10 },
            //             { name: 'CSS3', value: 10 },
            //         ]
            //     }]
            // };

            // // 使用刚指定的配置项和数据显示图表。
            // myechart1.setOption(option1);

            // let myechart2 = echarts.init(document.getElementById('echartPhotoHoby'), 'light');
            // // 指定图表的配置项和数据
            // let option2 = {
            //     title: {
            //         text: '爱好：',
            //         textStyle: {
            //             color: "#FF8604",
            //             fontSize: 20,
            //             fontWeight: 600
            //         }

            //     },
            //     tooltip: {
            //         show: false,
            //     },
            //     series: [{
            //         type: 'pie',
            //         clickable: false,
            //         color: ['#67E0E3', '#9FE6B8', '#FFDB5C', '#ff9f7f', '#E690D1', '#e7bcf3', '#9d96f5', '#FF8604', '#96BFFF'],
            //         label: {
            //             fontSize: 15,
            //             fontWeight: 600
            //         },
            //         data: [
            //             { name: '篮球', value: 120 },
            //             { name: '台球', value: 70 },
            //             { name: '吉他', value: 60 },
            //             { name: '游戏', value: 90 },
            //             { name: '旅行', value: 90 },
            //             { name: '音乐', value: 90, itemStyle: { color: '#FF8604' } },

            //         ]
            //     }]
            // };

            // // 使用刚指定的配置项和数据显示图表。
            // myechart2.setOption(option2)
            // ============== echarts 图表 END=======================


            // ======================================
            //实时获取地理坐标位置
            var cityName;
            navigator.geolocation.getCurrentPosition(
                // 成功
                (ev) => {
                    console.log(ev)
                    // alert("经度",ev.coords.longitude,"纬度",ev.coords.latitude)
                    // alert("经度",ev.)
                    // var map = new BMap.Map("allmap");
                    var point = new BMap.Point(ev.coords.longitude, ev.coords.latitude);
                    // map.centerAndZoom(point, 12);

                    function myFun(result) {
                        cityName = result.name;
                        // map.setCenter(cityName);
                        // alert("当前定位城市:" + cityName);
                        weather(cityName)
                    }
                    var myCity = new BMap.LocalCity();
                    myCity.get(myFun);
                },
                // 失败
                (error) => {
                    cityName = `上海`;
                    weather(cityName)
                }
            )

            // console.log()


            // =====================================

            // BGM
            var obgm = document.getElementById("bgm");

            obgm.controls = false;
            obgm.loop = true;
            obgm.volume = 0.2;
            let onOff = true;
            let btnDeg = 0;
            let timerBgm = setInterval(function() {
                btnDeg += 5;
                $("#bgmOnOff").css("transform", "rotate(" + btnDeg + "deg)")
            }, 40)

            //解决移动端自动播放问题
            if (window.WeixinJSBridge) {
                WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                    obgm.play();
                }, false);
            } else {
                document.addEventListener("WeixinJSBridgeReady", function() {
                    WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                        obgm.play();
                    });
                }, false);
            }

            $("#bgmOnOff").on("click", function() {
                if (onOff) {
                    obgm.pause();
                    onOff = false;
                    clearInterval(timerBgm)
                } else {
                    obgm.play();
                    onOff = true;
                    timerBgm = setInterval(function() {
                        btnDeg += 5;
                        $("#bgmOnOff").css("transform", "rotate(" + btnDeg + "deg)")
                    }, 40)

                }

                // console.log(onOff)

            })

            function weather(cityName){

                // 跨域请求天气
                $.ajax({
                    url: `http://restapi.amap.com/v3/weather/weatherInfo`,
                    type: `post`,
                    data: {
                        key: "dfb9a576fbcb2c9a13a65ab736e47004", //密匙
                        city: cityName,
                        extensions: "all" //显示后几天的天气
                    },
                    success: function(response) {
                        console.log(response)
                        var weekStr;
                        var timeData = "";
                        var dayTemp = "";
                        var nightTemp = "";
                        var dayWeather = "";
                        var weatherIconUrl = "";
                        switch (response.forecasts[0].casts[0].week) {
                            case "1":
                                weekStr = "一";
                                break;
                            case "2":
                                weekStr = "二";
                                break;
                            case "3":
                                weekStr = "三";
                                break;
                            case "4":
                                weekStr = "四";
                                break;
                            case "5":
                                weekStr = "五";
                                break;
                            case "6":
                                weekStr = "六";
                                break;
                            case "7":
                                weekStr = "日";
                                break;
                        }

                        switch (response.forecasts[0].casts[0].dayweather) {
                            case "阴":
                                weatherIconUrl = "img/阴.png";
                                break;
                            case "多云":
                                weatherIconUrl = "img/多云.png";
                                break;
                            case "小雨":
                                weatherIconUrl = "img/小雨.png";
                                break;
                            case "中雨":
                                weatherIconUrl = "img/中雨.png";
                                break;
                            case "大雨":
                                weatherIconUrl = "img/大雨.png";
                                break;
                            case "阵雨":
                                weatherIconUrl = "img/阵雨.png";
                                break;
                            case "雨夹雪":
                                weatherIconUrl = "img/雨夹雪.png";
                                break;
                            case "小雪":
                                weatherIconUrl = "img/小雪.png";
                                break;
                            case "中雪":
                                weatherIconUrl = "img/中雪.png";
                                break;
                            case "大雪":
                                weatherIconUrl = "img/大雪.png";
                                break;
                            case "暴雪":
                                weatherIconUrl = "img/暴雪.png";
                                break;
                            case "阵雪":
                                weatherIconUrl = "img/暴雪.png";
                                break;
                            case "晴":
                                weatherIconUrl = "img/晴.png";
                                break;
                        }


                        timeData = `${response.forecasts[0].casts[0].date}&nbsp;星期${weekStr}`;
                        dayWeather = `${response.forecasts[0].casts[0].dayweather}`;
                        dayTemp = `${response.forecasts[0].casts[0].daytemp}℃`;
                        nightTemp = `${response.forecasts[0].casts[0].nighttemp}℃`;

                        $(".weatherL").html(timeData);
                        $(".weatherM").html(`<i class="weatherIcon"></i>${dayWeather}`);
                        $(".weatherM>.weatherIcon").css({ "backgroundImage": "url(" + weatherIconUrl + ")", "backgroundSize": "cover" })
                        $(".weatherR").html(`<i class="sun"></i>${dayTemp}&nbsp;<i class="moon"></i>${nightTemp}`);
                    }

                })
            }


            // var headPortrait = $("<div>");
            // headPortrait.addClass("headPortrait");
            // $(".page1").append(headPortrait);

            // headPortrait.fadeIn("slow", function() {
            //     $(this).animate({ width: "6em", height: "6em" }, 500, function() {
            //         $(this).animate({ top: "3em", width: "5em", height: "5em" }, 1000, function() {

            //             var myName = $(`<div class="myName">`); //名字等信息
            //             myName.html("myName");
            //             $(".page1").append(myName);

            //             var phone = $(`<p class="myMesage">`);
            //             phone.html(`Tel:&nbsp;135-0385-9958`);
            //             $(".page1").append(phone);

            //             var emall = $(`<p class="myMesage">`);
            //             emall.html(`E-Mall:&nbsp;13503859958@163.com`);
            //             $(".page1").append(emall);

            //             var workTimer = $(`<p class="myMesage">`);
            //             workTimer.html(`开发经验：2年`)
            //             $(".page1").append(workTimer);


            //             myName.fadeIn("slow", function() {
            //                 phone.show("fast", function() {
            //                     emall.show("fast", function() {
            //                         workTimer.show("fast", function() {

            //                         })
            //                     });
            //                 });
            //             });


            //         })
            //     })
            // })



            var mySwiper = new Swiper('.swiper-container-box', {
                autoplay: false, //可选选项，自动滑动
                direction: 'vertical',
                on: {
                    init: function() {
                        swiperAnimateCache(this); //隐藏动画元素 
                        swiperAnimate(this); //初始化完成开始动画
                    },
                    slideChangeTransitionEnd: function() {
                        swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
                        //this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
                        if (this.activeIndex > 1) {
                            $(".weather").fadeOut();
                        } else {
                            $(".weather").fadeIn();
                        }

                    }

                },
                hashNavigation: {
                    watchState: true,
                },

            });


            var mySwiper2 = new Swiper('.swiper-container-page3', {
                autoplay: {
                    delay: 2000,
                    // stopOnLastSlide: false,
                    disableOnInteraction: true,
                },
                loop: true,
                effect: 'cube'



            })

            //防止系统默认行为
            document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);



        })
    })
})