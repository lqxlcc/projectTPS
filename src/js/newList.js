
document.addEventListener('DOMContentLoaded',function(){
     let focus = document.querySelector('.main-banner');
    let ul = focus.querySelector('ul');
    let img = ul.querySelectorAll('img');
    let imgWidth = focus.clientWidth;
    carousels({
        focus:document.querySelector('.main-banner'),
        ul:focus.querySelector('ul'),
        img:ul.querySelectorAll('img'),
        imgWidth:focus.clientWidth});
        var goodsList = document.querySelector('.goodsList');
     
    /*
        * 实现分页加载
        * 实现滚动加载更多
     */
    var goodsList = document.querySelector('.goodsList');
    var pages = document.querySelector('.pages');

    var pageNo = 1;
    var qty = 16;

    var status = [200,304];


    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        console.log(1)
        if(xhr.readyState ===4 &&status.indexOf(xhr.status)>=0){
            console.log(2)
            var res = JSON.parse(xhr.responseText);
            console.log(res)
            var ul = document.createElement('ul');

             ul.innerHTML = res.data.map(item=>{

                return `
                    <li data-guid="${item.id}">
                        <p class="imgs"><img src="${item.img}"/></p>
                        <div class="decorationsAll">
                            <p class="decorations fl">${item.decorations}</p>
                            
                            <p class="contry fr"><i class="made">${item.made}</i><img src="${item.map}" class="map"/></p>
                        </div>
                        <p class="price">￥${item.price}</p>
                        
                    </li>
                `;
            }).join('');
            goodsList.innerText = '';
            goodsList.appendChild(ul);


            // 处理分页
            pages.innerText = '';
            var pageQty = Math.ceil(res.total/res.qty);
            for(var i=1;i<=pageQty;i++){
                var span = document.createElement('span');
                span.innerHTML = i;

                if(i === pageNo){
                    span.className = 'active';
                }
                pages.appendChild(span);
            }
        }
    }

    xhr.open('post','http://localhost:368/project/src/api/newList.php',true);

    // post请求需要设置一个请求头
    // setRequestHeader(key,val)
    xhr.setRequestHeader('Content-Type',"application/x-www-form-urlencoded");

    // post请求，数据写在send方法中
    xhr.send(`pageNo=${pageNo}&qty=${qty}`);


    // 点击分页切换
    pages.onclick = function(e){
        if(e.target.tagName.toLowerCase() === 'span'){
            pageNo = e.target.innerText*1;

            xhr.open('post','http://localhost:368/project/src/api/newList.php',true);
            xhr.setRequestHeader('Content-Type',"application/x-www-form-urlencoded");
            xhr.send(`pageNo=${pageNo}&qty=${qty}`);
        }
    }


    
});