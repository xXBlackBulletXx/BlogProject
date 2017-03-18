<?php
	error_reporting(E_ERROR | E_PARSE);
	$id = $_POST["Id"];
	$titolo = $_POST["Titolo"];
	$descrizione = $_POST["Descrizione"];
	$categoria = $_POST["Categoria"];
	$URL = $_POST["IMG"];
	$HASH = $_POST["Hashtag"];

	$mysqli = new mysqli("localhost", "root", "", "my_taboogame");

	$query = "UPDATE post SET TITOLO='".$titolo."', TESTO='".$descrizione."', CATEGORY='".$categoria."', IMMAGINE='".$URL."', TITOLOANTEPRIMA='".$HASH."' WHERE ID=".$id." ";

	$result = $mysqli->query($query);

	$array = array();

	$i=0;

	while ($obj = mysqli_fetch_assoc($result)) { 
		$array[$i] = $obj;
		$i++;
	}

	echo json_encode($array);
?>