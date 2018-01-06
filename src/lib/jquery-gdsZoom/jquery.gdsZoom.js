;(function($){
	$.fn.gdsZoom = function(options){
		// 默认值
		var defaults = {
			// 宽高
			width:400,
			height:300,

			// 大图显示位置
			position:'right',//bottom,top,left,

			// 小图与大图的间距
			gap:15
		}

		// 这里的this指向实例
		return this.each(function(){
			// 这里的this指向DOM节点

			var opt = $.extend({},defaults,options);

			var $small = $(this);
			var $smallImg = $small.children('img');

			// 添加特性类
			$small.addClass('gds-zoom');

			// 生成大图容器
			var $big = $('<div/>').addClass('gds-zoom-big');

			// 定位大图容器
			var left,top;
			if(opt.position === 'right'){
				top = $small.offset().top+$smallImg.outerHeight()/3;
				left = $small.offset().left + $smallImg.outerWidth() + opt.gap;
			}
			else if(opt.position === 'left'){
				top = $small.offset().top;
				left = $small.offset().left - opt.width - opt.gap;
			}
			else if(opt.position === 'top'){
				top = $small.offset().top - opt.height - opt.gap;
				left = $small.offset().left;
			}
			else if(opt.position === 'bottom'){
				top = $small.offset().top + $small.outerHeight() + opt.gap;
				left = $small.offset().left;
			}

			$big.css({
				left:left,
				top:top
			})

			// 生成大图
			var $bigImg = $('<img/>');

			// 把大图写入容器
			$bigImg.appendTo($big);

			// 把大图容器写入页面
			$big.appendTo('body');

			

			// 生成放大镜
			var $zoom = $('<span/>').addClass('minzoom');
			$zoom.appendTo($small);

			// 创建图片，为了加载
			var img = new Image();
			img.onload = function(){
				//图片加载完成执行这里的代码
				//图片只有显示到页面后才能获取宽高
				// console.log(img.offsetWidth)
				 $bigImg.attr('src',img.src);
			}


			// 大图与小图的比例
			var ratio;

			// 鼠标移入移出
			$small.on('mouseenter',function(){
				// 图片宽高
				img.src = $smallImg.attr('data-big');//得到data-big的属性值
				$big.fadeIn();
				$zoom.fadeIn();

				ratio = $bigImg.outerWidth()/$smallImg.outerWidth();

				// 设置放大镜尺寸
				// 跟放大区域成比例
				$zoom.css({
					width:opt.width/ratio,
					height:opt.height/ratio
				});
			}).on('mouseleave',function(){
				$big.fadeOut();
				$zoom.fadeOut();
			}).on('mousemove',function(e){
				// 放大镜移动的距离
				var left = e.pageX - $small.offset().left - $zoom.outerWidth()/2;
				var top = e.pageY - $small.offset().top  - $zoom.outerHeight()/2;
				// 边缘判断
				if(left < 0){
					left = 0;
				}else if(left > $smallImg.outerWidth()-$zoom.outerWidth()){
					left = $small.outerWidth()-$zoom.outerWidth();
				}

				if(top < 0){
					top = 0;
				}else if(top > $smallImg.outerHeight()-$zoom.outerHeight()){
					top = $smallImg.outerHeight()-$zoom.outerHeight();
				}


				$zoom.css({
					left:left,
					top:top
				});

				$bigImg.css({
					left:-left*ratio,
					top:-top*ratio
				})
			});
		});
	}
})(jQuery)