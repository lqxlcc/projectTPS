    /*
                读取cookie中的carlist
                把json字符串转换成对象/数组：JSON.parse()
                json字符串格式：
                    1.必须用双引号
                    2.不能右注释
             */
            var buyList = document.querySelector('.buyList');
            var money = document.querySelector('.money');
            var jieBtn = document.querySelector('.jieBtn');

            // 读取cookie
            var carlist;//undefined

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


            console.log(carlist);
            var total = 0;
            var ul = document.createElement('ul');
            ul.innerHTML = carlist.map(function(goods){
                // 计算总价
                total += goods.price*goods.qty;
                return '<li data-guid="' + goods.id + '">'
                    + '<img src="../' + goods.imgurl + '">'
                    + '<h4>' + goods.decorations + '<br /><s>商品编码:'+goods.id+'</s></h4>'
                    + '<p class="price"><span>￥' + goods.price + '</span><i>'+goods.qty+'</i></p>'
                    + '<span class="btn-close">&times;</span>'
                +'</li>'
            }).join('');

            // 把ul写到#carList
            buyList.appendChild(ul);

            // 写入总价
            money.innerHTML = total;

            // 删除商品
            buyList.onclick = function(e){
                e = e || window.event;
                var target = e.target || e.srcElement;

                if(target.className === 'btn-close'){
                    // 先找到当前商品在数组中的位置(根据guid)
                    // 删除:获取索引值，splice(idx,1)
                    // 重写cookie
                    // 删除DOM节点

                    var currentLi = target.parentNode;
                    var guid = currentLi.getAttribute('data-guid');

                    for(var i=0;i<carlist.length;i++){
                        if(carlist[i].guid === guid){
                            carlist.splice(i,1);
                            break;
                        }
                    }

                    document.cookie = 'carlist=' + JSON.stringify(carlist);


                    // 删除DOM节点
                    currentLi.parentNode.removeChild(currentLi);
                }
            }

            // 清空购物车
            // 1、删除DOM节点
            // 2、删除cookie
            jieBtn.onclick = function(){
                var now = new Date();
                now.setDate(now.getDate()-10)
                document.cookie = 'carlist=x;expires='+now.toUTCString();

                oCarList.innerText = '';
                oSubPrice.innerText = '';
            }
