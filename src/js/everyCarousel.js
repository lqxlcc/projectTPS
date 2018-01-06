
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

let focus = document.querySelectorAll('.goodsC');
for(var i=0;i<focus.length;i++){
    let ul = focus[i].querySelector('ul');
    
    // 把第一张复制到最后
    ul.appendChild(ul.children[0].cloneNode(true));
    let len = ul.children.length;//5
    // 索引值
    let index = 0;
    let imgWidth = focus[i].clientWidth;
    // 1）设置ul宽度，达到水平排列的效果
    ul.style.width = imgWidth*len + 'px';
    // 生成页码
    let page = document.createElement('div');
    let arrow = document.createElement('div');
    page.classList.add('page');
    arrow.classList.add('arrow');
    for(let j=0;j<2;j++){
        let span = document.createElement('span');
        arrow.appendChild(span);
    }

    focus[i].appendChild(arrow);
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
    focus[i].appendChild(page);

    // 2）水平轮播效果
    /*
        index       left
        0           0
        1           -810
        2           -1620
        3           -2430

        推导公式：left = index*width
     */
    let timer = setInterval(autoPlay,3000);


    // 鼠标移入移出
    focus[i].onmouseenter = ()=>{
        clearInterval(timer);
         page.style.display = 'block';
         arrow.style.display = 'block';
    }

    focus[i].onmouseleave = ()=>{
        timer = setInterval(autoPlay,3000);
         page.style.display = 'none';
         arrow.style.display = 'none';
    }

    focus[i].onclick = e=>{
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
            index = 4;
        }
        
        show();
    }
    arrow.children[1].onclick =()=>{
        if(index!=4){
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
}


