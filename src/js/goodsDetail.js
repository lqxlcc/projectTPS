(function(){
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
    // var p4=document.getElementById("p4");
    var goodsId=document.getElementById("goodsId");
    var productid = paramsUrl.id;
    listImg.src = '../'+paramsUrl.img;
    p1.innerHTML=paramsUrl.decorations;
    goodsprice.innerHTML='￥'+paramsUrl.price;
    p3.innerHTML= '原产地：'+paramsUrl.made;
    // p4.src= '../'+paramsUrl.map;
    goodsId.innerHTML = '商品编码：'+productid;
    // var carlist = [];
    // var buyBtn = document.getElementById('buyBtn');
    // var cookies = document.cookie;
    // if(cookies.length){
    //     cookies = cookies.split('; ');
    //     cookies.forEach(function(item){
    //         var arr = item.split('=');
    //         if(arr[0] === 'carlist'){
    //             carlist = JSON.parse(arr[1]);
    //         }
    //     });
    // }
    // buyBtn.onclick = function(){
    //     for(var i=0;i<carlist.length;i++){
    //         if(carlist[i].id === productid){
    //             break;
    //         }
    //     }
    //     if(i === carlist.length){
    //         var goods = {
    //             guid:guid,
    //             imgurl:target.querySelector('img'),
    //             decorations:target.querySelector('.decorations'),
    //             price:target.querySelector('.price'),
    //             made:target.querySelector('.made'),
    //             map:target.querySelector('.map'),
    //             qty:1 
    //         }
    //         carlist.push(goods);

    //     }
    //     else{
    //         carlist[i].qty++;
    //     }
    //     var now = new Date();
    //     now.setDate(now.getDate()+7);
    //     document.cookie = 'cartlist=' + JSON.stringify(cartlist) + '; expires='+now.toUTCString();
    //     }
    // }
    
})();