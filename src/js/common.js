function randomNumber(min,max){
    return parseInt(Math.random()*(max-min+1)) + min;//0:得到一个最小数min,1:得到一个最大值max
}

/*
	cookie操作
		* 增
		* 删
		* 查
		* 改
 */
var cookie = {
	/**
	 * [读取cookie]
	 * @param  {String} name [cookie名]
	 * @return {String}      [返回name对应的cookie值]
	 */
	get:function(name){
		var cookies = document.cookie;
		var res = '';
		if(cookies.length){
			cookies = cookies.split('; ');//[]

			// 循环优化方式
			for(var i=0,len=cookies.length;i<len;i++){
				// 拆分cookie名、cookie值
				var arr = cookies[i].split('=');
				if(arr[0] === name){
					res = arr[1];
				}
			}
		}

		return res;
	},
	/**
	 * [添加cookie]
	 * @param {String} name    [cookie名]
	 * @param {String} val     [cookie值]
	 * @param {[Date]} expires [有效期]
	 * @param {[String]} path    [路径]
	 */
	set:function(name,val,expires,path){
		var str = name+'='+value;

		// 传入有效期时
		if(expire){
			str += ';expires=' + expires.toUTCString();
		}

		if(path){
			str += ';path=' + path;
		}

		document.cookie = str;
	},
	/**
	 * [删除cookie]
	 * @param  {String} name [cookie名]
	 */
	remove:function(name){
		var now = new Date();
		now.setDate(now.getDate()-10);
		// document.cookie = name + '=null;expires=' + now.toUTCString();
		this.set(name,'null',now);
	}
}

// cookie.get('carlistabcdefg');//[{}]
// cookie.set('carlist',JSON.stingify(carlist),now);//[{}]
// cookie.remove('carlist');

function animate(ele,opt,callback){
	var timerQty = 0;
	for(var attr in opt){
		// 记录动画数量
		timerQty++;

		//createTimer(attr);
		(function(attr){
			// 以属性名创建定时器名字
			var timerName = attr + 'timer';

			// 清除之前的定时器,放置多个定时器作用于同一个元素
			clearInterval(ele[timerName]);

			// 目标值
			var target = opt[attr];

			// 创建定时器
			ele[timerName] = setInterval(function(){
				// 获取当前值
				var current = getComputedStyle(ele)[attr];

				// 提取单位
				var unit = current.match(/\d([a-z]*)$/);
				unit = unit ? unit[1] : '';

				// 提取数字
				current = parseFloat(current);

				// 计算缓冲速度
				var speed = (target - current)/10;

				//判断属性是否为opacity
				if(attr === 'opacity'){
					speed = speed>0 ? 0.05 : -0.05;
				}else{
					speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
				}

				// 到达目标值/清除定时器
				if(current === target){
					clearInterval(ele[timerName]);
					current = target - speed;

					// 数量减1
					timerQty--;

					// 执行回调函数
					// 最后一个动画执行完成后才执行回调函数
					if(typeof callback === 'function' && timerQty===0){
						callback();
					}
				}

				ele.style[attr] = current + speed + unit;

			},30);
		})(attr)
	}
}

/**
 * [判断数据类型]
 * @param  {All} data [所有数据]
 * @return {String}      [返回数据类型对应的字符串]
 */
function type(data){
	// data.toString();
	// "[object RegExp]"
	// "[object Array]"
	return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();//
}
// type(10);//'number'
// type([10]);//'array'


/**
 * 	
 * @param  {Object} options [请求的参数]
 */
function ajax(options){
	// 默认值
	var defaults = {
		type:'get',//get,post,jsonp
		jsonpCallbackName:'callback',
		// data:{}
	}

	// var opt = Object.assign({},defaults,options);
	for(var attr in options){
		defaults[attr] = options[attr];
	}
	var opt = defaults;

	// 重置大小写
	opt.type = opt.type.toLowerCase();

	// opt.data:{pageNo:1,qyt:10} => pageNo=1&qty=10
	if(opt.data){
		var params = '';
		for(var attr in opt.data){
			params += attr + '='+ opt.data[attr] + '&'
		}

		// 删除多余的&
		params = params.slice(0,-1)
		
	}

	if(opt.type === 'jsonp'){
		// 预设全局函数
		var fnName = 'getData' + Date.now();
		window[fnName] = function(data){
				typeof opt.success === 'function' && opt.success(data);

				// 移除script标签
				document.body.removeChild(script);
		}

		// 创建script标签
		var script = document.createElement('script');

		// 判断opt.url中是否存在?
		opt.url += opt.url.indexOf('?')>=0 ? params : '?'+params;

		script.src = opt.url + '&'+opt.jsonpCallbackName+'='+fnName;

		// 把script标签写入页面
		document.body.appendChild(script);
		return;
	}


	var xhr = null;
	try{
		xhr = new XMLHttpRequest();
	}catch(error){
		try{
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(err){
			try{
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){
				 alert('你的浏览器太low了，这个世界不适合你');
			}
		}
	}

	// 返回数据
	var status = [200,304];
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && status.indexOf(xhr.status)>=0){
			var res = xhr.responseText;
			try{
				res = JSON.parse(res);
			}catch(err){
				res = res;
			}

			// if(typeof opt.success === 'function'){
			// 	opt.success(res);
			// }

			typeof opt.success === 'function' && opt.success(res);
		}
	}

	
	xhr.open(opt.type,opt.url,true);

	if(opt.type === 'get'){
		opt.url += opt.url.indexOf('?')>=0 ? params : '?'+params;
		params = null;
	}else if(opt.type === 'post'){
		// 添加请求头
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	}

	xhr.send(params);
}

ajax.get = function(options){
	options.type = 'get';
	this(options);
}

ajax.post = function(options){
	options.type = 'post';
	this(options);
}

ajax.jsonp = function(options){
	options.type = 'jsonp';
	this(options);
}

// ajax({
// 	type:'get'
// 	url:'http://localhost/api/football.php?pageNo=1',
// 	data:{qyt:10},
// 	jsonpCallbackName:'cb'
// 	success:250
// })
// ajax.get()
function carousels(options){
	for(let i=0;i<options.img.length;i++){
		options.img[i].style.width = options.imgWidth + 'px';

    }
     // 把第一张复制到最后
    options.ul.appendChild(options.ul.children[0].cloneNode(true));
    let len = options.ul.children.length;//10

     // 索引值
     let index = 0;

     
     // 1）设置ul宽度，达到水平排列的效果
     options.ul.style.width = options.imgWidth*len + 'px';


     // 生成页码
     let page = document.createElement('div');
     let arrow = document.createElement('div');
     page.classList.add('page');
     arrow.classList.add('arrow');
    for(let j=0;j<2;j++){
        let span = document.createElement('span');
        arrow.appendChild(span);
    }
    options.focus.appendChild(arrow);
    arrow.children[0].innerText = '<';
    arrow.children[1].innerText = '>';
     for(let i=1;i<len;i++){
         let span = document.createElement('span');
         span.innerText = i;
         if(i===1){
             span.classList.add('active');
         }
         page.appendChild(span);
     }
     options.focus.appendChild(page);

    // 2）水平轮播效果
    /*
        index		left
        0			0
        1			-810
        2			-1620
        3			-2430

        推导公式：left = index*width
     */
    let timer = setInterval(autoPlay,3000);


    // 鼠标移入移出
    options.focus.onmouseenter = ()=>{
        console.log(3);
        clearInterval(timer);
        page.style.display = 'block';
        arrow.style.display = 'block';
    }

    options.focus.onmouseleave = ()=>{
        timer = setInterval(autoPlay,3000);
        page.style.display = 'none';
        arrow.style.display = 'none';
    }

    options.focus.onclick = e=>{
        if(e.target.parentNode.className === 'page'){
            // 把index改成当前页码对应的索引值
            index = e.target.innerText-1;
 
            show();
        }
    }
    arrow.children[0].onclick =()=>{
        if(index!=0){
            index--;
        }else{
            index = 9;
        }
        
        show();
    }
    arrow.children[1].onclick =()=>{
        if(index!=9){
            index++;
        }else{
            index = 0;
        }
        
        show();
    }
    function autoPlay(){
        index++;

        show();
    }

    function show(){
        if(index>=len){//0,1,2,3,4
            options.ul.style.left = 0;
            index = 1;
        }
        animate(options.ul,{left:-index*options.imgWidth});

        // 页码高亮
        // 先清除所有高亮
        for(var i=0;i<len-1;i++){
            page.children[i].className = '';
        }

        if(index==len-1){
            page.children[0].classList.add('active')
        }else{
            page.children[index].classList.add('active');
        }
	}
}