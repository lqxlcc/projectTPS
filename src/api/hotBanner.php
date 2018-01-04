<?php
    $list= array();
    $price= array(1400.03,3263.1,7259.99,1346.02,268.91,278.53,390.31);
    $decorations = array('景德镇 汉玉陶瓷 汉玉瓷62头 高温骨瓷陶瓷餐具 包邮',
    '景德镇 汉玉陶瓷 汉玉瓷 60头奢顶高温骨瓷器 陶瓷餐具 包邮',
    '永康地区 东城渔味饭店石锅鱼4-5人套餐',
    'TGGC 2017冬装立领修身显瘦夹克式上衣外套 保暖短羽绒服艾尚服饰 S13232',
    'ZUZAI（自在）男士云曦系列科技蓄热绒外套','泡泡噜POIPILU2018新款儿童加厚梭织长裤艾尚服饰B4164350',
    '泡泡噜POIPILU2018新款儿童棉服艾尚服饰B7164330');
    $img = array('img/hot-banner1.jpg',
    'img/hot-banner2.jpg','img/hot-banner3.jpg',
    'img/hot-banner4.jpg','img/hot-banner5.jpg');
    $made = array('中国','日本','美国');
    $map = array('img/cn.jpg','img/jp.jpg','img/us.jpg');
    for($i=0;$i<12;$i++){
        $goods = array(
            "id"=>"goods$i",
            "price"=>$price[array_rand($price)],
            "decorations"=>$decorations[array_rand($decorations)],
            "img"=>$img[array_rand($img)],
            "made"=>$made[array_rand($made)],
            "map"=>$map[array_rand($map)]
        );
        
        $list[] = $goods;
    }
    echo json_encode($list,JSON_UNESCAPED_UNICODE);
?>