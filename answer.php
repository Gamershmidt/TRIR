<?php
    $points = $_POST['points'];
    $login = $_POST['login'];
    $mainnumber = $_POST['mainPoint'];
    $json = file_get_contents('../data/usersdata.json');
    $jsonArray = json_decode($json, true);
    for ($i = 0; $i < count($jsonArray['users']); $i++) {
        if ($jsonArray['users'][$i]['login'] == $login) {
            $ind = $i;
            break;
        }
    }
    $error = "";
    $tmp1 = "0";
    $tmp2 = "0";
    if($points > $mainnumber){
        $tmp1 = "2";
        $jsonArray['users'][$ind]['curgame']['lives']  -= 1;
    }
    if($points < $mainnumber){
        $tmp1 = "1";
        $jsonArray['users'][$ind]['curgame']['lives']  -= 1;
    }
    if($points == $mainnumber){
        $jsonArray['users'][$ind]['curgame']['currPoints']  += 1;
        $jsonArray['users'][$ind]['curgame']['totalPoints']  += 1;
    }
    $tmp2 = (string)$jsonArray['users'][$ind]['curgame']['lives'];
    if ( $jsonArray['users'][$ind]['curgame']['lives'] < 1){
        $tmp2 = "n";
    }
    $error .= $tmp1;
    $error .= $tmp2;
    file_put_contents('../data/usersdata.json', json_encode($jsonArray, JSON_UNESCAPED_UNICODE));
    echo $error;
?>