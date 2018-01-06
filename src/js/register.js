$(function(){
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
    var btnAgreen = document.querySelector('.agreen');
    var email = document.querySelector('.email');
    var emailCon = document.querySelector('.emailCon');
    var passwd = document.querySelector('.passwd');
    var passwdCon = document.querySelector('.passwdCon');
    var conPasswd = document.querySelector('.conPasswd');
    var conPasswdCon = document.querySelector('.conPasswdCon');

    email.onblur = function(e){
        e = e || window.event;
        /*
            电子邮件
                jinrong.xie@qq.com
                123@qq.com
                x@163.com
                x@a-r.com.cn
         */
        var emailVlue = email.value;
        var reg = /^[a-z|0-9][\w\-\.]{5,17}@[a-z0-9\-]{2,}(\.[a-z]{2,}){1,2}$/i
        if(!reg.test(emailVlue)){
            emailCon.innerText = '邮箱不合法';
            return false;
        }else{
            emailCon.innerText = '';
        }
        /*
            手机号码
                11位
                158 8888 8888
                1 [34578]
         */
        // var phone = document.getElementById('phone').value;
        // var reg = /^1[34578]\d{9}$/i
        // if(!reg.test(phone)){
        //     alert('手机号不合法');
        //     return false;
        // }
        /*
            密码  
                长度小于20 
                不能包含空格
         */

        
    };
    // passwd.onblur = function(){
        
    //     console.log(this);
    // }  
    
    btnAgreen.onclick = function(){
        var passwordVlue = passwd.value;
        var reg = /^\S{1,20}$/
        if(!reg.test(passwordVlue)){
            passwdCon.innerText = '密码不合法';
            
            return false;
        }else{
            passwdCon.innerText = '';

        }
        var conPasswdVlue = conPasswd.value;
        if(this.passwordVlue != conPasswdVlue){
            conPasswdCon.innerText = '两次密码输入不一致';

            return false;
        }
        else{
            conPasswdCon.innerText = '';
            console.log(22)
            
        }
    }
});
    