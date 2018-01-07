require(['config'],function(){
    require(['jquery','common','gdszoom'],function(){
        // 拼接头部和尾部的HTML结构
        $('.main-header').load('header.html',function(){
            $('.logo').attr('src','../img/logo.png');
            $('.logo2').attr('src','../img/logo2.png');
            $('.btnSearch img').attr('src','../img/search.png');
            $('.header-car img').attr('src','../img/buycar.png');
            $('.menu img').attr('src','../img/menu.png');
            $('.menu img').attr('src','../img/menu.png');
            $('.home').attr('href','../index.html');
            
        });
        $('.main-footer').load('footer.html',function(){
            $('.li2 img').attr('src','../img/geo.png');
            $('.footerR img').attr('src','../img/weixin.jpg');
        });
        $('.main-data').gdsZoom();
        $('.main-dataF img').click(function(){

            $('.main-data img').attr({
                'src':this.src,
                'imgbig':$(this).attr('imgbig') || this.src
            });
        })
        // 将其他页面的信息传递到详情页
        var params = location.search;
        params = params.slice(1);
        params = params.split('&');
        var paramsUrl = {};
        params.forEach(function(item){
            var data = item.split('=');
            paramsUrl[data[0]] = decodeURI(data[1]);
        });
        var listImg = document.getElementById('listImg');
        var p1=document.getElementById("p1");
        var goodsprice=document.getElementById("price");
        var p3=document.getElementById("p3");
        var smallImg1 = document.querySelector('.smallImg1');
        var smallImg2 = document.querySelector('.smallImg2');
        var smallImg3 = document.querySelector('.smallImg3');
        var dImg1 = document.querySelector('.dImg1');
        var dImg2 = document.querySelector('.dImg2');
        var dImg3 = document.querySelector('.dImg3');
        // var p4=document.getElementById("p4");
        var goodsId=document.getElementById("goodsId");

        var productid = paramsUrl.id;
        listImg.src = '../'+paramsUrl.img;
        $('#listImg').attr('imgbig',listImg.src);
        smallImg1.src = '../'+paramsUrl.img;
        smallImg2.src = '../'+paramsUrl.zoom1;
        smallImg3.src = '../'+paramsUrl.zoom2;
        dImg1.src = '../'+paramsUrl.img;
        dImg2.src = '../'+paramsUrl.zoom1;
        dImg3.src = '../'+paramsUrl.zoom2;
        p1.innerHTML=paramsUrl.decorations;
        goodsprice.innerHTML='￥'+paramsUrl.price;
        p3.innerHTML= '原产地：'+paramsUrl.made;
        // p4.src= '../'+paramsUrl.map;
        goodsId.innerHTML = '商品编码：'+productid;


        // ajax加载热推商品
        var hotGoods = document.querySelector('.hotGoods'); 
       ajax.get({
            url:'../api/hotBanner.php',
            success(res){
                var ul = document.createElement('ul');
                ul.innerHTML = res.map(item=>{
                    return `
                         <li data-guid="${item.id}">
                            <p class="imgs"><img src="../${item.img}"/></p>
                            <div class="decorationsAll">
                                <p class="decorations fl">${item.decorations}</p>
                                
                                <p class="contry fr"><i class="made">${item.made}</i><img src="../${item.map}" class="map"/></p>
                            </div>
                            <p class="price">￥${item.price}</p>
                            
                        </li>
                    `;
                }).join('');
               hotGoods.appendChild(ul);
            }
        });
       // cookie保存商品信息至购物车页面
       var dbuycar = document.querySelector('.dbuycar'); 
       var carlist = [];
        var cookies = document.cookie;
        if(cookies.length){
            cookies = cookies.split('; ');//['carlist=[{},{}]','username=xxx']
            cookies.forEach(function(item){
                var arr = item.split('=');
                if(arr[0] === 'carlist'){
                    carlist = JSON.parse(arr[1]);
                }
            });
        }
        dbuycar.onclick = function(){
           
                // 先获取当前按钮所在的li
                
                //判断carlist中是否存在相同商品
                //判断循环是否跑完
                for(var i=0;i<carlist.length;i++){
                    if(carlist[i].id === productid){
                        break;
                    }
                }
                if(i===carlist.length){
                    //不存在：创建对象，并且数量为1
                    var goods = {
                        id: paramsUrl.id,
                        imgurl: paramsUrl.img,
                        decorations: paramsUrl.decorations,
                        price: paramsUrl.price,
                        qty:1
                    }
                    carlist.push(goods);
                }else{
                    //存在：数量+1
                    carlist[i].qty++;
                }
                // 写入cookie
               var now = new Date();
            now.setDate(now.getDate()+7);
            document.cookie = 'carlist=' + JSON.stringify(carlist) + '; expires='+now.toUTCString();
            console.log(document.cookie);
        
        }
    })
})
    
    
    
