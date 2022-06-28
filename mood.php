<?php
    $login = $_POST['login'];
    $mood = $_POST['mood'];
    if($mood!=""){
        $jsonArray = [];
        $json = file_get_contents('../data/usersdata.json');
        $jsonArray = json_decode($json, true);
        
        for ($i = 0; $i < count($jsonArray['users']); $i++) {
            if ($jsonArray['users'][$i]['login'] == $login) {
                $jsonArray['users'][$i]['mood'] = $mood;
            }
        }
        file_put_contents('../data/usersdata.json', json_encode($jsonArray, JSON_UNESCAPED_UNICODE));
    }
    else{
        $jsonArray = [];
        $json = file_get_contents('../data/usersdata.json');
        $jsonArray = json_decode($json, true);
        
        for ($i = 0; $i < count($jsonArray['users']); $i++) {
            if ($jsonArray['users'][$i]['login'] == $login) {
                $mood = $jsonArray['users'][$i]['mood'];
            }
        }
    }
    echo $mood;
?>