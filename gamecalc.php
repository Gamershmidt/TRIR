<?php
    $point = $_POST['point'];
    $error = "";
    $numF = rand(3,5);
    $tmp1 = 0;
    $tmp2 = 0;
    $tmp3 = 0;
    $tmp4 = rand(1,15);
    if($tmp4 == $point){
        $tmp4-=1;
    }
    $tmp5 = rand(1,25);
    if($tmp5 == $point){
        $tmp5-=1;
    }
    $tmp6 = rand(1,35);
    if($tmp6 == $point){
        $tmp6-=2;
    }
    $tmp7 = 0;
    $tmp8 = 0;
    if($numF == 3){
        $tmp1 = rand(1,$point - 9);
        $tmp2 = rand(1, $point - $tmp1 - 1);
        $tmp3 = $point - $tmp1 - $tmp2;
    }
    if($numF == 4){
        $tmp1 = rand(1,$point - 11);
        $tmp2 = rand(1, $point - $tmp1- 2);
        $tmp3 = rand(1, $point -$tmp1 - $tmp2- 1);
        $tmp4 = $point - $tmp1 - $tmp2 - $tmp3;
    }
    if($numF == 5){
        $tmp1 = rand(1,$point - 15);
        $tmp2 = rand(1, $point - $tmp1- 3);
        $tmp3 = rand(1, $point -$tmp1 - $tmp2- 2);
        $tmp4 = rand(1, $point -$tmp1 - $tmp2 - $tmp3- 1);
        $tmp5 = $point - $tmp1 - $tmp2 - $tmp3 - $tmp4;
    }
    $pr = " ";
    $tmp7 = rand(1,25);
    if($tmp7 == $point){
        $tmp7-=1;
    }
    $tmp8 = rand(1,25);
    if($tmp8 == $point){
        $tmp8+=1;
    }
    $tmp1 = (string)$tmp1;
    $tmp2 = (string)$tmp2;
    $tmp3 = (string)$tmp3;
    $tmp4 = (string)$tmp4;
    $tmp5 = (string)$tmp5;
    $tmp6 = (string)$tmp6;
    $tmp7 = (string)$tmp7;
    $tmp8 = (string)$tmp8;
    $error .= $tmp1;
    $error .= $pr;
    $error .= $tmp2;
    $error .= $pr;
    $error .= $tmp3;
    $error .= $pr;
    $error .= $tmp4;
    $error .= $pr;
    $error .= $tmp5;
    $error .= $pr;
    $error .= $tmp6;
    $error .= $pr;
    $error .= $tmp7;
    $error .= $pr;
    $error .= $tmp8;
    echo  $error;

?>