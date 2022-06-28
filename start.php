<?php
    $login = $_POST['login'];
    $ind = 0;
    $json = file_get_contents('../data/usersdata.json');
    $jsonArray = json_decode($json, true);
    for ($i = 0; $i < count($jsonArray['users']); $i++) {
        if ($jsonArray['users'][$i]['login'] == $login) {
            $ind = $i;
            break;
        }
    }
    $jsonArray['users'][$ind]['curgame']['baseTime'] = 65;
    $jsonArray['users'][$ind]['curgame']['lives'] = 3;
    $jsonArray['users'][$ind]['curgame']['enoughPoints'] = 1;
    $jsonArray['users'][$ind]['curgame']['currPoints'] = 0;
    $jsonArray['users'][$ind]['curgame']['totalPoints'] = 0;
    file_put_contents('../data/usersdata.json', json_encode($jsonArray, JSON_UNESCAPED_UNICODE));
?>
