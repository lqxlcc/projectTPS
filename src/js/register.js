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
    btnAgreen.onclick = function(e){
        e = e || window.event;
        /*
            电子邮件
                jinrong.xie@qq.com
                123@qq.com
                x@163.com
                x@a-r.com.cn
         */
        var email = document.querySelector('.email').value;
        var reg = /^[a-z][\w\-\.]{5,17}@[a-z0-9\-]{2,}(\.[a-z]{2,}){1,2}$/i
        if(!reg.test(email)){
            alert('邮箱不合法');
            return false;
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
        var password = document.querySelector('.passwd').value;
        var reg = /^\S{1,20}$/
        if(!reg.test(password)){
            alert('密码不合法');
            return false;
        }
        
        var confirm_pwd = document.getElementById('conPasswd').value;
        if(password != conPasswd){
            alert('两次密码输入不一致');
            return false;
        }
        
    };

});
    