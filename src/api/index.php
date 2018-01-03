<?php
    $list= array();
    $price= array(1400.03,3263.1,7259.99,1346.02,268.91,278.53,390.31);
    $decorations = array('广州地区 黄埔军校猎鹰拓展 3天自组团队强化营',
    '泠泠岛 电动升降桌专卖 升降电脑书桌站立式办公台式人体工学桌子 全国包邮',
    '永康地区 东城渔味饭店石锅鱼4-5人套餐',
    'TGGC 2017冬装立领修身显瘦夹克式上衣外套 保暖短羽绒服艾尚服饰 S13232',
    'ZUZAI（自在）男士云曦系列科技蓄热绒外套','泡泡噜POIPILU2018新款儿童加厚梭织长裤艾尚服饰B4164350',
    '泡泡噜POIPILU2018新款儿童棉服艾尚服饰B7164330');
    $img = array('img/new-banner1.jpg',
    'img/new-banner2.jpg','img/new-banner3.jpg',
    'img/new-banner4.jpg','img/new-banner5.jpg');
    $details = array('img/goodsDetail1','img/goodsDetail2','img/goodsDetail3','img/goodsDetail4','img/goodsDetail5','img/goodsDetail6','img/goodsDetail7','img/goodsDetail8','img/goodsDetail9','img/goodsDetail10','img/goodsDetail11','img/goodsDetail12','img/goodsDetail13','img/goodsDetail14','img/goodsDetail15');
    $made = array('中国','日本','美国');
    $map = array('img/cn.jpg','img/jp.jpg','img/us.jpg');
    for($i=0;$i<15;$i++){
        $goods = array(
            "id"=>"goods$i",
            "price"=>$price[array_rand($price)],
            "decorations"=>$decorations[array_rand($decorations)],
            "img"=>$img[array_rand($img)],
             "made"=>$made[array_rand($made)],
            "map"=>$map[array_rand($map)],
            "details"=>$details
        );
        $list[] = $goods;
    }
    echo json_encode($list,JSON_UNESCAPED_UNICODE);
?>