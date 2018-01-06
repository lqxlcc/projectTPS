;(function($){
	// $.prototype.lxCarousel = function(options){
	$.fn.lxCarousel = function(options){
		var defaults = {
			// 宽高
			width:320,
			height:320,

			autoPlay:true,

			// 默认索引值
			index:0,

			// 页码与左右按钮
			page:true,
			buttons:false,
			// 轮播类型
			type:'vertical',//horizontal,seamless,fade,

			duration:3000
		}

		
		this.each(function(idx,ele){
			var $self = $(ele);
			var opt = $.extend({},defaults,options);
			// 这里的this：实例$('#box')
			console.log(options)


			// 添加特定类
			$self.addClass('lx-carousel');

			// 设置基础样式
			$self.css({
				width:opt.width,
				height:opt.height
			})

			var lx = {
				init:function(){
					var $ul = $('<ul/>');

					$ul.html(opt.imgs.map(function(url){
						return '<li><img src="'+ url +'"></li>'
					}).join(''));

					// 把ul写入页面
					$self.append($ul);

					if(opt.buttons){
						$('<span/>').addClass('btn-prev').html('&lt;').appendTo($self);
						$('<span/>').addClass('btn-next').html('&gt;').appendTo($self);
					}

					// 移入移除
					$self.hover(function(){
						clearInterval($self.timer);
					},function(){
						lx.move();
					}).on('click','.btn-prev',function(){
						opt.index--;
						lx.show();
					}).on('click','.btn-next',function(){
						opt.index++;
						lx.show();
					})

					opt.len = opt.imgs.length;

					this.show();
					this.move()


					return this;
				},
				move:function(){
					$self.timer = setInterval(function(){
						opt.index++;

						this.show();
					}.bind(this),opt.duration);

					return this;
				},
				show:function(){
					// 处理index
					if(opt.index>=opt.len){
						opt.index = 0;
					}else if(opt.index<0){
						opt.index = opt.len-1;
					}

					var $ul = $self.find('ul');

					// 动画
					$ul.animate({left:-opt.index*opt.width})

					return this;
				}
			}

			lx.init();
		})

		

		return this;
	}

	// $.fn.extend({
	// 	lxCarousel(){},

	// })
})(jQuery);
