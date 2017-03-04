$(document).ready(function(){
	$(":submit").click(function(){
		$.ajax({
			method: "POST",
			url: "login.php",
			data: { username: $("#username").val(), pasw: $("#password").val() }
		})
		.done(function( data ) {
			alert( "Data Saved: " + JSON.parse(data) );
		});
	});
});