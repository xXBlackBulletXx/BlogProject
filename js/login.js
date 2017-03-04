$(document).ready(function(){
	$(":submit").click(function(){
		$.ajax({
			method: "POST",
			url: "login.php",
			data: { username: $("#username").val(), pasw: $("#password").val() }
		})
		.done(function( data ) {
			$jsonParse = JSON.parse(data);
			if ($jsonParse==true) {
				window.location.href = "Miao.html";
			}else{
				alert("Username o password errati");
			}
		});
	});
});