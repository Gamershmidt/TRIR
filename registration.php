<?php
    $login = $_POST['login'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $username = $_POST['username'];
    $number = $_POST['number'];
    $error = "";
    $tmp1 = "0";
    $tmp2 = "0";
    $tmp3 = "0";
    $tmp4 = "0";
    $tmp5 = "0";
    if (strlen($login) < 3 || strlen($login) > 15 || !preg_match( '/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{3,15}$/' , $login)) {
        $tmp1 = "2";
    }
    if (preg_match( '/[^0-9]/' , $number) || strlen($number) < 5 || strlen($number) > 11) {
        $tmp2 = "2";
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $tmp3 = "2";
    }
    if (strlen($password) < 3 || !preg_match( '/^[^\W_]+$/' , $password)) {
        $tmp4 = "2";
    }
    if (!preg_match("/^[а-я]+$/msiu", $username) ) {
        $tmp5 = "2";
    }
    $jsonArray = [];
    $json = file_get_contents('../data/usersdata.json');
    $jsonArray = json_decode($json, true);
    $arr = [];
    
    for ($i = 0; $i < count($jsonArray['users']); $i++) {
        if ($jsonArray['users'][$i]['login'] == $login) {
            $tmp1 = "1";
        }
        if ($jsonArray['users'][$i]['number'] == $number) {
            $tmp2 = "1";
        }
        if ($jsonArray['users'][$i]['email'] == $email) {
            $tmp3 = "1";
        }
    }
    $error .= $tmp1;
    $error .= $tmp2;
    $error .= $tmp3;
    $error .= $tmp4;
    $error .= $tmp5;
    if ($error == "00000"){
       $jsonArray['users'][] =[
        'login' =>$login,
        'password' =>$password,
        'email' =>$email,
        'number' =>$number,
        'name' =>$username,
        'mood' =>'None',
        'games' =>$arr
        
        ];
        $jsonArray['users'][count($jsonArray['users'])-1]["best"] = [
            'points' => 0,
            'mood' =>'None',
        ];
        file_put_contents('../data/usersdata.json', json_encode($jsonArray, JSON_UNESCAPED_UNICODE));
    }
    echo $error;
?>