<?php
	error_reporting(E_ERROR | E_PARSE);
	$ID = $_POST["ID"];

	$mysqli = new mysqli("localhost", "root", "", "my_taboogame");

	$query = "SELECT * FROM post WHERE ID='".$ID."'";

	$result = $mysqli->query($query);

	$array = array();

	$i=0;

	while ($obj = mysqli_fetch_assoc($result)) { 
		$array[$i] = $obj;
		$i++;
	}

	echo json_encode($array);
?>