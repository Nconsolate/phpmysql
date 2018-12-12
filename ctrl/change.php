<?php
	header("Content-Type: text/html;charset=utf-8");
	include "mysql.php";
    $cont = @$_REQUEST["cont"];
	$which = @$_REQUEST["which"];
	$idea = @$_REQUEST["idea"];
	$id=@$_REQUEST["id"];
$c =@mysql_query('UPDATE msg SET cont="'.$cont.'", which="'.$which.'", idea="'.$idea.'" WHERE (id="'.$id.'");');
	if($c){
		include "show.php";
	}else{
		echo "0";
	}
?>