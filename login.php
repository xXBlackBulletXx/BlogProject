<?php
	error_reporting(E_ERROR | E_PARSE);
	$user = $_POST["username"];
	$pasw = $_POST["pasw"];

	$pass = false;

	$mysqli = new mysqli("localhost", "root", "", "blog");

	$query = "SELECT * FROM utenti";

	$result = $mysqli->query($query);

	while ($obj = mysqli_fetch_assoc($result)) { 
		if(($user == $obj["USERNAME"]) && ($pasw == $obj["PASSWORD"])){
			if($obj["CATEGORY"]=="Founder"){
				$pass = true;
				break;
			}
		}
	}

	echo json_encode($pass);
?>