 require(['config'],function(){

    require(['jquery','common','everyCarousel'],function(){

        $('.main-header').load('html/header.html',function(){
                $('.home').attr('href','index.html');
                $('.appDownload img').attr('src','img/phone.png');
                $('.header-bar .down img').attr('src','img/cn.jpg');
                $('.c-o').attr('href','html/register.html');
                $('.login').attr('href','html/login.html');
                $('.header-car .down').attr('href','html/buyCar.html');
                $('.newList').attr('href','html/newList.html');
        });
        $('.main-footer').load('html/footer.html');
         $('.user').html($('.email').val());
         console.log($('.email').val())
        /*
        1）设置ul宽度，达到水平排列的效果
        2）水平轮播效果
        3）移入移出，清除轮播效果
        4）添加分页效果
            * 点击分页切换
        5）无缝滚动
            * 把第一张复制到最后
            * 当滚动到复制那张图片时，瞬间重置回初始状态，并把index改成1
        */

        let focus = document.querySelector('.main-banner');
        let ul = focus.querySelector('ul');
        let img = ul.querySelectorAll('img');
        let imgWidth = focus.clientWidth;
        carousels({
            focus:document.querySelector('.main-banner'),
            ul:focus.querySelector('ul'),
            img:ul.querySelectorAll('img'),
            imgWidth:focus.clientWidth});
         
        /*...............动态生成“新品”.............................................. */
        var new_goods = document.querySelector('.new-goods');
        var goodsWireList = document.querySelectorAll('.goodsWireList');
        ajax.get({
            url:'http://localhost:368/project/src/api/index.php',
            success(res){
                var ul = document.createElement('ul');
                var ulGoodsWire = document.createElement('ul');
                ul.innerHTML = res.map(item=>{
                    return `
                        <li data-id="${item.id}">
                            <p class="imgs"><img src="${item.img}"/></p>
                            <div class="decorations">${item.decorations}
                                <p class="price">￥${item.price}</p>
                            </div>
                        </li>
                    `;
                }).join('');
                for(var i=0;i<new_goods.querySelectorAll('ul').length;i++){
                   new_goods.querySelectorAll('ul')[i].innerHTML = ul.innerHTML;

                }

                // 动态生成食品饮酒等页面
                ulGoodsWire.innerHTML = res.map(item=>{

                    return `
                        <li data-guid="${item.id}">
                            <p class="imgs"><img src="${item.img}"/></p>
                            <div class="decorationsAll">
                                <p class="decorations">${item.decorations}</p>
                                <p class="price">￥${item.price}</p>
                                <p class="contry"><i class="made">${item.made}</i><img src="${item.map}" class="map"/></p>
                            </div>
                            <img src="img/percent.png" class="imgPercent"/>
                            <img src="img/free.png" class="imgFree"/>
                            <img src="img/scale.png" class="imgScale"/>
                        </li>
                    `;
                }).join('');
                for(var i=0;i<goodsWireList.length;i++){
                   goodsWireList[i].querySelector('ul').innerHTML = ulGoodsWire.innerHTML;

                }
                    drumpDetail(res);
                 // 鼠标停在商品上时，商品描述高度升高
                for(let j=0;j<goodsWireList.length;j++){
                    var lis = goodsWireList[j].querySelectorAll('li');
                    for(let i=0;i<lis.length;i++){
                        lis[i].onmouseenter = function(){
                            var div = document.querySelectorAll('.decorationsAll');
                            div[i].style.top = 143 + 'px';
                            div[i].style.backgroundColor = '#FFFFF2';
                        }
                        lis[i].onmouseleave = function(){
                            var div = document.querySelectorAll('.decorationsAll');
                            div[i].style.top = 170 + 'px';
                            div[i].style.backgroundColor = 'white';
                        }
                    }
                }
                    
            }
        });

        /*...............动态生成“热推”.............................................. */
        var hot_goods = document.querySelector('.hot-goods');
        ajax.get({
            url:'http://localhost:368/project/src/api/hotBanner.php',
            success(res){
                var ul = document.createElement('ul');
                ul.innerHTML = res.map(item=>{
                    return `
                        <li data-id="${item.id}">
                            <img src="img/hot.png" class="imgHot"/>
                            <img src="img/free.png" class="imgFree"/>
                            <img src="img/bao.png" class="imgBao"/>
                            <img src="img/scale.png" class="imgScale"/>
                            <p class="imgs fl"><img src="${item.img}"/></p>
                            <div class="decorations fr">${item.decorations}
                                <p class="price">￥${item.price}</p>
                                <p class="contry">${item.made}<img src="${item.map}"/></p>
                            </div>
                        </li>
                    `;
                }).join('');
               hot_goods.appendChild(ul);
               drumpDetail(res);
            }
        })
        
        // 全球购
        var mainGlobalBuy = document.querySelector('.main-globalBuy');
        var ulGlobalBuy = mainGlobalBuy.querySelector('ul');
        var lisGlobalBuy = ulGlobalBuy.querySelectorAll('li');
        for(let i=0;i<lisGlobalBuy.length;i++){
            lisGlobalBuy[i].onmouseenter = function(){
                var a = lisGlobalBuy[i].querySelector('a');
                a.style.top = -20 + 'px';
            }
            lisGlobalBuy[i].onmouseleave = function(){
                var a = lisGlobalBuy[i].querySelector('a');
                a.style.top = 0;
            }
        }
       /*
            .......跳转到详情页...............
         */
        
        function drumpDetail(res){

            for(var z=0;z<goodsWireList.length;z++){
                var goodsDetailUl = goodsWireList[z].querySelector('ul');
                    for(var i=0;i<goodsDetailUl.children.length;i++){
                        goodsDetailUl.children[i].onclick = function(e){
                            var tagname = ['li','img','i','p'];
                            if(tagname.indexOf(e.target.tagName.toLowerCase())){
                                
                                var params = '?';
                                var _id = this.getAttribute('data-guid');
                                console.log(_id)
                                for(var j=0;j<res.length;j++){
                                

                                    if(_id == res[j].id){
                                        for(var attr in res[j]){
                                            params += attr + '=' + encodeURI(res[j][attr]) + '&';
                                        }
                                    }
                                }
                                // console.log(params);
                                 //删除多余的&
                                params = params.slice(0,-1);
                                // 跳转页面
                                location.href = 'html/goodsDetail.html' + params;
                            }
                        }
                    }
            }
            
        }


    });
 });
    