<?php
	error_reporting(E_ERROR | E_PARSE);
	$Titolo = $_POST["Titolo"];
	$Descrizione = $_POST["Descrizione"];
	$Categoria = $_POST["Categoria"];
	$Data = $_POST["Data"];

	$check = true;

	$mysqli = new mysqli("localhost", "root", "", "blog");

	$query = "INSERT INTO `post`(`ID`, `TITOLO`, `TESTO`, `DATACREAZIONE`, `CATEGORY`, `IMMAGINE`) VALUES (NULL, '".$Titolo."', '".$Descrizione."', '".$Data."', '".$Categoria."', '')";

	$result = $mysqli->query($query);

	if(!$result){
		$check = false;
	}

	echo json_encode($check);
?>