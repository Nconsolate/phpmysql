<?php
	header("Content-Type: text/html;charset=utf-8");
	include "mysql.php";
	$id=@$_REQUEST["id"];
$d =@mysql_query('DELETE FROM msg WHERE (id="'.$id.'");');
	if($d){
		include "show.php";
	}else{
		echo "0";
	}
?>