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
    if(count($jsonArray['users'][$ind]['games']) < 10) {
        $jsonArray['users'][$ind]['games'][] =[
        'points' => $jsonArray['users'][$ind]['curgame']['totalPoints'],
        'mood' => $jsonArray['users'][$ind]['mood'],
        ];
    }
    else{
        $tmp3 = [];
        for ($i = 1; $i < count($jsonArray['users'][$ind]['games']); $i++) {
            $tmp3[] =[
                'points' => $jsonArray['users'][$ind]['games'][$i]['points'],
                'mood' =>$jsonArray['users'][$ind]['games'][$i]['mood'],
            ];
        }
        $tmp3[] = [
            'points' => $jsonArray['users'][$ind]['curgame']['totalPoints'],
            'mood' => $jsonArray['users'][$ind]['mood'],
            ];
        $jsonArray['users'][$ind]['games'] = $tmp3;
    }
    if($jsonArray['users'][$ind]['curgame']['totalPoints'] >= $jsonArray['users'][$ind]['best']['points']){
        $jsonArray['users'][$ind]['best']['points'] = $jsonArray['users'][$ind]['curgame']['totalPoints'];
        $jsonArray['users'][$ind]['best']['mood'] = $jsonArray['users'][$ind]['mood'];
    }
    file_put_contents('../data/usersdata.json', json_encode($jsonArray, JSON_UNESCAPED_UNICODE));
    echo $jsonArray['users'][$ind]['curgame']['totalPoints'];
?>