<?php
    include 'connect.php';
    
    $email = isset($_GET['email']) ? $_GET['email'] : '';
    $password = isset($_GET['userpasswd']) ? $_GET['userpasswd'] : '';

    // 密码md5加密
    $password = md5($password);

    $sql = "select * from user where email='$email' and userpasswd='$password'";


    // 获取查询结果
    $result = $conn->query($sql);
    if($result->num_rows>0){
        echo 'ok';
    }else{
        echo 'fail';
    }

    // 释放查询内存(销毁)
    $result->free();

    //关闭连接
    $conn->close();
?>