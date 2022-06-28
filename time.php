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
    $jsonArray['users'][$ind]['curgame']['baseTime'] -= 5;
    if ($jsonArray['users'][$ind]['curgame']['baseTime'] == 0){
        $jsonArray['users'][$ind]['curgame']['baseTime'] = 60;
        $jsonArray['users'][$ind]['curgame']['enoughPoints'] += 1;
    }
    file_put_contents('../data/usersdata.json', json_encode($jsonArray, JSON_UNESCAPED_UNICODE));
    echo $jsonArray['users'][$ind]['curgame']["baseTime"];
?>