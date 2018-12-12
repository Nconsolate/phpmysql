<?php
	include "mysql.php";
	function load(){
		$msg = mysql_query("SELECT * FROM msg ORDER BY id");
		$str = "";
		while($arr = mysql_fetch_assoc($msg)){
			$str = $str.json_encode($arr).",";
		}

		return "[".substr($str,0,-1)."]";
	}
	
	echo load();
	
?>