<?php
    $login = $_POST['login'];
    $jsonArray = [];
    $json = file_get_contents('../data/usersdata.json');
    $jsonArray = json_decode($json, true);
    for ($i = 0; $i < count($jsonArray['users']); $i++) {
        if ($jsonArray['users'][$i]['login'] == $login) {
            $ind = $i;
            break;
        }
    }
    echo json_encode($jsonArray['users'][$ind]['games'],JSON_UNESCAPED_UNICODE);
?>