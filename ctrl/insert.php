<?php
	header("Content-Type: text/html;charset=utf-8");

	$cont = @$_REQUEST["cont"];
	$which = @$_REQUEST["which"];
	$idea = @$_REQUEST["idea"];
	include "mysql.php";


	$q = @mysql_query('INSERT INTO  msg (cont,which,idea) VALUES("'.$cont.'","'.$which.'","'.$idea.'");');

	if($q){
		include "show.php";
	}else{
		echo "0";
	}





?>