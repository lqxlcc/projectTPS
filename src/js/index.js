document.addEventListener('DOMContentLoaded',function(){
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
    for(let i=0;i<img.length;i++){
       img[i].style.width = imgWidth + 'px';
   
    }
     // 把第一张复制到最后
    ul.appendChild(ul.children[0].cloneNode(true));
    let len = ul.children.length;//10

     // 索引值
     let index = 0;

     
     // 1）设置ul宽度，达到水平排列的效果
     ul.style.width = imgWidth*len + 'px';


     // 生成页码
     let page = document.createElement('div');
     page.classList.add('page');
     for(let i=1;i<len;i++){
         let span = document.createElement('span');
         span.innerText = i;
         if(i===1){
             span.classList.add('active');
         }
         page.appendChild(span);
     }
     focus.appendChild(page);

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
    focus.onmouseenter = ()=>{
        console.log(3);
        clearInterval(timer);
        page.style.display = 'block';
    }

    focus.onmouseleave = ()=>{
        timer = setInterval(autoPlay,3000);
        page.style.display = 'none';
    }

    focus.onclick = e=>{
        if(e.target.parentNode.className === 'page'){
            // 把index改成当前页码对应的索引值
            index = e.target.innerText-1;

            show();
        }
    }

    function autoPlay(){
        index++;

        show();
    }

    function show(){
        if(index>=len){//0,1,2,3,4
            ul.style.left = 0;
            index = 1;
        }
        animate(ul,{left:-index*imgWidth});

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
/*...............动态生成“新品”.............................................. */
    var new_goods = document.querySelector('.new-goods');
    var goodsWireList = document.querySelectorAll('.goodsWireList');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 &&(xhr.status ===200||xhr.status === 304)){
            var data = JSON.parse(xhr.responseText);
            var ul = document.createElement('ul');
            var ulGoodsWire = document.createElement('ul');
            ul.innerHTML = data.map(item=>{
                return `
                    <li data-id="$">
                        <p class="imgs"><img src="${item.img}"/></p>
                        <div class="decorations">${item.decorations}
                            <p class="price">￥${item.price}</p>
                        </div>
                    </li>
                `;
            }).join('');
            new_goods.appendChild(ul);

            ulGoodsWire.innerHTML = data.map(item=>{
                return `
                    <li data-guid="${item.id}">
                        <p class="imgs"><img src="${item.img}"/></p>
                        <div class="decorationsAll">
                            <p class="decorations">${item.decorations}</p>
                            <p class="price">￥${item.price}</p>
                            <p class="contry"><span class="made">${item.made}</span><img src="${item.map}" class="map"/></p>
                        </div>
                        <img src="img/percent.png" class="imgPercent"/>
                        <img src="img/free.png" class="imgFree"/>
                        <img src="img/scale.png" class="imgScale"/>
                    </li>
                `;
            }).join('');
            // <!-- 食品酒水 -->
            goodsWireList[0].appendChild(ulGoodsWire);
            // <!-- 美妆个护 -->
            goodsWireList[1].innerHTML = goodsWireList[0].innerHTML ;
            // <!-- 家具日用 -->
            goodsWireList[2].innerHTML = goodsWireList[1].innerHTML ;
            // <!-- 服饰鞋帽 -->
            goodsWireList[3].innerHTML = goodsWireList[2].innerHTML ;
            // <!-- 营养保健 -->
            goodsWireList[4].innerHTML = goodsWireList[3].innerHTML ;
            // <!-- 钟表首饰 -->
            goodsWireList[5].innerHTML = goodsWireList[4].innerHTML ;
            // <!-- 母婴用品 -->
            goodsWireList[6].innerHTML = goodsWireList[5].innerHTML ;
            // <!-- 礼品箱包 -->
            goodsWireList[7].innerHTML = goodsWireList[6].innerHTML ;
            // <!-- 数码电子 -->
            goodsWireList[8].innerHTML = goodsWireList[7].innerHTML ;
            // <!-- 汽车用品 -->
            goodsWireList[9].innerHTML = goodsWireList[8].innerHTML ;
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
            /*
                cookie传递数据
             */
            var carlist = [];
            var cookies = document.cookie;
            if(cookies.length){
                cookies = cookies.split('; ');
                cookies.forEach(function(item){
                    var arr = item.split('=');
                    if(arr[0] === 'carlist'){
                        carlist = JSON.parse(arr[1]);
                    }
                });
            }
            document.onclick = function(e){
                e = e||window.event;
                var target = e.target||e.srcElement;
                if(target.tagName.toLowerCase() ==='li'){
                    var guid = target.getAttribute('data-guid');
                    for(var i=0;i<carlist.length;i++){
                        if(carlist[i].guid === guid){
                            break;
                        }
                    }
                    if(i === carlist.length){
                        var goods = {
                            guid:guid,
                            imgurl:target.querySelector('img'),
                            decorations:target.querySelector('.decorations'),
                            price:target.querySelector('.price'),
                            made:target.querySelector('.made'),
                            map:target.querySelector('.map'),
                            qty:1

                        }
                        carlist.push(goods);

                    }
                    else{
                        carlist[i].qty++;
                    }
                    document.cookie = 'carlist='+JSON.stringify(carlist);

                }
               
                var classname = ['li','p','del','img','h4','u','span'];
                if(classname.indexOf(target.tagName.toLowerCase())){
                    
                    var params = '?';
                    var _id = target.getAttribute('data-guid');
                    console.log(_id);
                    for(var j=0;j<carlist.length;j++){
                        if(_id == carlist[j].id){
                            for(var attr in carlist[j]){
                                params += attr + '=' + encodeURI(carlist[j][attr]) + '&'
                           console.log(params)
                            }
                        }
                    }
                     //删除多余的&
                    params = params.slice(0,-1);
                    // 跳转页面
                    location.href = 'html/goodsdetail.html' + params;

                }
            }
            
        }
    }
    xhr.open('get','http://localhost:368/project/src/api/index.php');
    xhr.send();

    
    /*...............动态生成“热推”.............................................. */
    var hot_goods = document.querySelector('.hot-goods');
    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function(){
        if(xhr1.readyState === 4 &&(xhr1.status ===200||xhr1.status === 304)){
            var dataOne = JSON.parse(xhr1.responseText);
            var ul = document.createElement('ul');
            ul.innerHTML = dataOne.map(item=>{
                return `
                    <li data-id="$">
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
            
        }
    }
    xhr1.open('get','http://localhost:368/project/src/api/hotBanner.php');
    xhr1.send();
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
    
});