<?php
	
	$link = @mysql_connect("47.101.199.141:3306","v11788","root");
	if(!$link){
		echo mysql_error();
	}
	
	$db = @mysql_select_db("errsave");
	if(!$db){
		echo mysql_error();
	}
	
	$char = @mysql_query("set names utf8");
	if(!$char){
		echo mysql_error();
	}
	
?>