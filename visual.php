<?php
	error_reporting(E_ERROR | E_PARSE);

	$mysqli = new mysqli("localhost", "root", "", "blog");

	$query = "SELECT * FROM post LIMIT 100";

	$result = $mysqli->query($query);

	$array = array();

	$i=0;

	while ($obj = mysqli_fetch_assoc($result)) { 
		$array[$i] = $obj;
		$i++;
	}

	echo json_encode($array);
?>