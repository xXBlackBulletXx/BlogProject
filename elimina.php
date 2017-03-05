<?php
	error_reporting(E_ERROR | E_PARSE);
	$id = $_POST["id"];

	$check = true;

	$mysqli = new mysqli("localhost", "root", "", "blog");

	$query = "DELETE FROM post WHERE ID='".$id."'";

	$result = $mysqli->query($query);

	if(!$result){
		$check = false;
	}

	echo json_encode($check);
?>