<?php

    /*
        php操作数据库
            * 连接数据库： new mysqli()
            * 设置字符集：set_charset('utf8')
            * 获取查询结果集：query()
            * 使用查询结果集
                * fetch_all(MYSQLI_ASSOC)
                * fetch_assoc()
                * fetch_row()
            * 输出 echo
     */

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'tpsproject';

    // 创建连接
    $conn = new mysqli($servername, $username, $password, $dbname);

    // 检测连接
    if ($conn->connect_error) {
        die("连接失败: " . $conn->connect_error);
    } 

    //查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');

?>