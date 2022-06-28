<?php
$prev = $_POST['prev'];
$prev = (int)$prev;
$num = rand(17,50);
if($prev == $num){
    $num-=1;
}
echo $num;
?>