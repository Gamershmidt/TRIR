<?php
    $login = $_POST['login'];
    $json = file_get_contents('../data/usersdata.json');
    $jsonArray = json_decode($json, true);
    for ($i = 0; $i < count($jsonArray['users']); $i++) {
        if ($jsonArray['users'][$i]['login'] == $login) {
            $ind = $i;
            break;
        }
    }
    $flag = "0";
    if($jsonArray['users'][$ind]['curgame']['currPoints']==$jsonArray['users'][$ind]['curgame']['enoughPoints']){
        $flag = "1";
        $jsonArray['users'][$ind]['curgame']['currPoints'] = 0;
    }
    file_put_contents('../data/usersdata.json', json_encode($jsonArray, JSON_UNESCAPED_UNICODE));
    echo $flag;
    
?>