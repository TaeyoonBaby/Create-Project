<?php
if(isset($msg)) {
    echo "<script>alert('$msg')</script>";
}
?>

<html>
<head>
    <meta charset="utf-8">
    <meta title="B2B">
</head>

<body>
<!--form-->
<form action="/login/login" method="post">
    <!--email input-->
    <span>Email: </span>&nbsp;&nbsp;&nbsp;&nbsp;
    <input id="email" name="email" type="email" placeholder="Please Your Email"><br/>

    <!--password input-->
    <span>Password: </span>
    <input id="pass" name="pass" type="password"><br/>
    
    <!--submit-->
    <input type="submit" value="확인">
    
</form>
<script type="text/javascript" src="/public/jquery-3.1.1.min.js"></script>
</body>
</html>

<?php
/*$a = array(1,2,3,4,5,6,7,8,9,10);
var_dump($a);
echo "<br>";


for($i = 0; $i < floor(count($a)/2); $i++) {
    $temp = $a[$i];
    $a[$i] = $a[count($a)-$i-1];
    $a[count($a)-$i-1] = $temp;
}
var_dump($a);*/
?>


