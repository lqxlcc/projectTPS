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
        /*
            验证表单：
                验证不符合的情况
                []：单个字符
                    * 范围：-
                        * 数字：\d,[0-9]
                        * 字母：[a-zA-Z]
                    * 非：^（在方括号内部的尖角号表示非）
                ()：分组
                    * 
        */
            
        
        $('.email').on('blur',function(){
            
            /*
                电子邮件
                    jinrong.xie@qq.com
                    123@qq.com
                    x@163.com
                    x@a-r.com.cn
             */
            var reg = /^[a-z|0-9][\w\-\.]{5,17}@[a-z0-9\-]{2,}(\.[a-z]{2,}){1,2}$/i;
            if(!reg.test($('.email').val())){
                $('.emailCon').html('邮箱不合法,必须6-18位');
                return false;
            }else{
                 console.log(23)
                $('.emailCon').html('正确');
            }
        }); 
            /*
                手机号码
                   11位
                   158 8888 8888
                   1 [34578]
             */
               
         
             // var reg = /^1[34578]\d{9}$/i
             // if(!reg.test(_phone)){
             //     alert('手机号不合法');
             //     return false;
             // }
            /*
                密码  
                   长度小于20 
                    不能包含空格
            */
   
        $('.passwd').on('blur',function(){
            console.log($('.passwd').val())
            var reg = /^\S{1,20}$/
            if(!reg.test($('.passwd').val())){
               $('.passwdCon').html('密码不合法，不能包含空格') ;
            
               return false;
            }else{
               $('.passwdCon').html('正确');

            }
        });
        $('.conPasswd').on('input',function(){
            console.log($('.conPasswd').val())
            if($('.passwd').val()!=$('.conPasswd').val()){
               $('.conPasswdCon').html('两次密码输入不一致');

                return false;
            }
            else{
                 $('.conPasswdCon').html('正确');
                 
            }
        });
        $('.checkm').on('click',function(){
            if($("input[type='checkbox']").is(':checked')){
                console.log(444)
                 $('.agreen').css({'background-color':'#ed4242'}); 
                $('.agreen').attr('disabled',false);
            }
        })
        
        $('.agreen').on('click',function(){
            
            // 发起ajax请求
            $.ajax({
                // hardcode
                url:'../api/register.php',
                data:{
                    email:$('.email').val(),
                    userpasswd:$('.passwd').val()
                },
                success:function(data){
                    if(data === 'fail'){
                        alert('注册失败，账号已存在')

                        return;
                    }
                    $('.show').css({'display':'block'})
                }
            })
        })
    })
})
   


    