$(document).ready(function(){
	if(sessionStorage.getItem("username") != null){
		$("#usr").html(sessionStorage.getItem("username"));
	}
	
});