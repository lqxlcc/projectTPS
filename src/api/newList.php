<?php
    $page_no = isset($_POST['pageNo']) ? $_POST['pageNo'] : 1;
    $qty = isset($_POST['qty']) ? $_POST['qty'] : 10;
    $id= isset($_GET['id'])? $_GET['id']:null;

    $file_url = 'data/newList.json';

    // 打开文件
    $myfile = fopen($file_url, 'r');

    // 读取打开的文件
    $content = fread($myfile, filesize($file_url));

    // 把读取到的内容转成数组
    $arr_data = json_decode($content);

    // 根据分页截取数据
    $res = array(
        'data'=>array_slice($arr_data, ($page_no-1)*$qty,$qty),
        'total'=>count($arr_data),
        'qty'=>$qty
    );
    //{data:[],total:100}

    // 输出json字符串
    echo json_encode($res,JSON_UNESCAPED_UNICODE);

    fclose($myfile);
?>