var allType = document.querySelector('.allType');
ajax.post({
    url:'http://localhost:368/project/src/api/allGoodsType.php',
    success(res){
        var ul = document.createElement('ul');
        ul.innerHTML = res.data.map(item=>{
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
       allType.appendChild(ul);
       drumpDetail(res);
    }
})