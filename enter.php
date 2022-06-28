<?php
    $login = $_POST['login'];
    $password = $_POST['password'];
    $error = "";
    $tmp1 = "0";
    $tmp2 = "0";

    $jsonArray = [];
    $json = file_get_contents('../data/usersdata.json');
    $jsonArray = json_decode($json, true);
    
    for ($i = 0; $i < count($jsonArray['users']); $i++) {
        if ($jsonArray['users'][$i]['login'] == $login) {
            $tmp1 = "1";
            if ($jsonArray['users'][$i]['password'] == $password) {
                $tmp2 = "1";
            }
        }
    }
    if(strlen($login) > 15||strlen($login) <3 || !preg_match( '/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{3,15}$/' , $login)){
        $tmp1 = "3";
    }
    $error .= $tmp1;
    $error .= $tmp2;
    echo $error;
?>