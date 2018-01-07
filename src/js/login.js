require(['config'],function(){
    require(['jquery','common'],function($){
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
        document.querySelector('.verifiRandom').innerHTML = randomNumber(1000,9999);
        $('.verifi').on('input',function(){
            if($('.verifi').val()===$('.verifiRandom').html()){

                $('.agreenLogin').css({'background-color':'#ed4242'}); 
                $('.agreenLogin').attr('disabled',false);
            }
        })
        
        $('.agreenLogin').on('click',function(){

            // 发起ajax请求
            $.ajax({

                // hardcode
                url:'../api/login.php',
                data:{
                    email:$('.email').val(),
                    userpasswd:$('.passwd').val()
                },
                success:function(data){
                    if(data === 'fail'){
                    console.log(data)
                    alert('登录失败')
                        return;
                    }
                  
                $('.disuser').css({'display':'block'});
                $('.dis').css({'display':'none'});
               
                 $('.user').html($('.email').val());
                
            
                $('.userin').html('恭喜你！登录成功！');
                }
            })
         }) ;  
        
    })
})