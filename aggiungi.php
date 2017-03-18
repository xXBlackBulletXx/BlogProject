<?php
	error_reporting(E_ERROR | E_PARSE);
	$Titolo = $_POST["Titolo"];
	$Descrizione = $_POST["Descrizione"];
	$Categoria = $_POST["Categoria"];
	$Data = $_POST["Data"];
	$IMG = $_POST["IMG"];
	$HASH = $_POST["Hashtag"];

	$check = true;

	$mysqli = new mysqli("localhost", "root", "", "my_taboogame");

	$query = "INSERT INTO `post`(`ID`, `TITOLO`, `TESTO`, `DATACREAZIONE`, `CATEGORY`, `IMMAGINE`, `TITOLOANTEPRIMA`) VALUES (NULL, '".$Titolo."', '".$Descrizione."', '".$Data."', '".$Categoria."', '".$IMG."', '".$HASH."')";

	$result = $mysqli->query($query);

	if(!$result){
		$check = false;
	}

	echo json_encode($check);
?>