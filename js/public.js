
define([],function(){
	return {
		// 数组去重封装1----创建空对象的方法
		delArrarr1:function(arr){
			var obj={};
			for(var i=0;i<arr.length;i++){
				if(obj[arr[i]]){
					obj[arr[i]]++;
				}else{
					obj[arr[i]]=1;
				}
			}
			var newArr=[];
			for(var i in obj){
				newArr.push(i);//此时的i为字符,如需数字可 newArr.push(parseInt(i))
			}
			return newArr;
		},

		// 数组去重封装2----indexOf方法
		delArrarr2:function(arr){
			var newArr=[];
			for(var i=0;i<arr.length;i++){
				if(newArr.indexOf(arr[i]) == -1){
					newArr.push(arr[i]);
				}
			}
			return newArr;
		},


		//日期的格式化
		createDate:function(){
			var d = new Date();
			
			var y = d.getFullYear()
			var mos = d.getMonth()
			var mydate = d.getDate()
			var day = d.getDay()
			
			var h = d.getHours()
			var m = d.getMinutes()
			var s = d.getSeconds()
			
			switch(day){
				case 0:day="星期日";break;
				case 1:day="星期一";break;
				case 2:day="星期二";break;
				case 3:day="星期三";break;
				case 4:day="星期四";break;
				case 5:day="星期五";break;
				case 6:day="星期六";break;
			}
			
			var str = y+"年"+createZero(mos+1)+"月"+createZero(mydate)+"日 "+day+" "+createZero(h)+":"+createZero(m)+":"+createZero(s);
			
			return str;
		},

		//补零
		createZero:function(n){
			var str="";
			if(n.length==1){
				str="0"+n;
			}else{
				str=n;
			}
			return str;
		},

		// 范围随机数
		randomNum:function(a,b){
			return Math.round(Math.random()*(a-b)+b);
		},

		// 随机颜色
		createColor:function(){
				var str1=createZero(randomNum(0,255).toString(16));
				var str2=createZero(randomNum(0,255).toString(16));
				var str3=createZero(randomNum(0,255).toString(16));
				return  "#"+str1+str2+str3;
		},

		// 两个时间的时间差
		dateCha:function(oldDate,nowDate){

			var oT = oldDate.getTime();
			var nT = nowDate.getTime();
			var time = oT - nT;

			var day = Math.abs(parseInt(time/1000/60/60/24));
			var h = Math.abs(parseInt(time/1000/60/60)%24);
			var m = Math.abs(parseInt(time/1000/60)%60);
			var s = Math.abs(parseInt(time/1000)%60);

			return "两个时间相差："+day+"天"+h+"小时"+m+"分钟"+s+"秒钟";

		},


		// 获取非行内样式
		//用法：getStyle(odiv).width  获取元素宽度
		getStyle:function(ele){
			// if(ele.currentStyle){
			// 	return ele.currentStyle[attr];
			// }else{
			// 	return getComputedStyle(ele,false)[attr];
			// }
			return ele.currentStyle || getComputedStyle(ele);
		},

		//样式兼容
			// function getStyle(ele) {
			// 	return ele.currentStyle || getComputedStyle(ele);
			// }

		// 阻止冒泡事件
		stopBubble:function(e){
			if(e.stopPropagation){
				e.stopPropagation();	//正常浏览器
			}else{
				e.cancelBubble =true;	//兼容IE
			}
		},


		//阻止默认事件
		stopDefault:function(e){
			if(e.preventDefault){
				e.preventDefault();		//正常浏览器
			}else{
				e.returnValue =false;	//兼容IE
			}
		},


		// 监听事件绑定
		addEvent:function(ele,myeve,callback){
			if(ele.addEventListener){
				ele.addEventListener(myeve,callback);	//正常浏览器
			}else{
				ele.attachEvent("on"+myeve,callback);	//兼容IE
			}
		},


		// 监事事件删除
		removeEvent:function(ele,myeve,callback){
			if(ele.removeEventListener){
				ele.removeEventListener(myeve,callback);	//正常浏览器
			}else{
				ele.detachEvent("on"+myeve,callback);		//兼容IE
			}
		},


		// 设置cookie
		setCookie:function(key,value,num){
			var d=new Date();
			d.setDate(d.getDate()+num);
			if(num==undefined){
				document.cookie = key+"="+value;
			}else{
				document.cookie = key+"="+value+";expires="+d;
			}
		},

		// 删除cookie
		removeCookie:function(key){
			setCookie(key,1,-1);
		},
		// 获取cookie
		getCookie:function(key){
			var arr=document.cookie.split("; ");
			for(var i=0;i<arr.length;i++){
				if(arr[i].split("=")[0]==key){
					return arr[i].split("=")[1];
				}
			}
			return "";
		},

		//鼠标生成元素跟随效果
		mouseFollow:function(){	//需要给i标签设置样式，具体单独调整，例如：i{width: 20px;height: 20px;position: absolute;background: url(img/mk.png) no-repeat center;background-size: cover;z-index:-1;}s{position: absolute;border-radius: 50%;width: 15px;height: 15px;top: -5px;z-index:-1;}
			this.addEvent(document,"mousemove",function(eve){
				var ev=eve || window.event;
				var oi=document.createElement("i");
				var ois1=document.createElement("s");
				var ois2=document.createElement("s");
				oi.appendChild(ois1);
				oi.appendChild(ois2);
				document.body.appendChild(oi);
				ois1.style.left="-5px";
				ois2.style.right="-5px";
				oi.style.backgroundColor=createColor();
				ois1.style.backgroundColor=createColor();
				ois2.style.backgroundColor=createColor();
				oi.style.left=ev.pageX+"px";
				oi.style.top=ev.pageY+"px";
				var timer=setInterval(function(){
					oi.remove();
				},300);

			})
		}
		
	}
})









