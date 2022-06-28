<?php
    $login = $_POST['login'];
    $jsonArray = [];
    $json = file_get_contents('../data/usersdata.json');
    $jsonArray = json_decode($json, true);
    $rating = [];
    $rating[] = [
        'login' => $jsonArray['users'][0]['login'],
        'points' => $jsonArray['users'][0]['best']['points'],
        'mood' => $jsonArray['users'][0]['best']['mood'],
    ];
    for ($i = 1; $i < count($jsonArray['users']); $i++) {
        if(count($rating)< 21){
            $rating[] = [
                'login' => "",
                'points' => -1,
                'mood' => 'None',
            ];
        }
        for($j = 0; $j < count($rating); $j++){
            if($jsonArray['users'][$i]['best']['points']>$rating[$j]['points']){
                $tmp2 = array_slice($rating, 0, $j);
                $tmp2[] = [
                    'login' => $jsonArray['users'][$i]['login'],
                    'points' => $jsonArray['users'][$i]['best']['points'],
                    'mood' => $jsonArray['users'][$i]['best']['mood'],
                ];
                $tmp1 = array_slice($rating, $j);
                $tmp1 = array_slice($tmp1, 0, count($tmp1)-1);
                $rating = array_merge($tmp2,$tmp1);
                break;
            }
        }   
    }
    echo json_encode($rating,JSON_UNESCAPED_UNICODE);
?>