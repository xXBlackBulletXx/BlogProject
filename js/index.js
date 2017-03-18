$(document).ready(function(){
	$COLOUMN = 3;
	if ($(document).width() == 1920) {
		$COLOUMN = 4;
	}

	$(".main").on("load",function(){
		$("#Loading").hide();
	});

	$.ajax({
		method: "POST",
		url: "visualAllPost.php"
	})
	.done(function(data){
		$jsonParse = JSON.parse(data);
		$y = 1;
		if($jsonParse){
			for ($i = 0; $i < $jsonParse.length; $i++) {
				if($i==0){
					$(".main").append("<ul id='list_"+$y+"' class='listPost'>");
				}
				if ($i%$COLOUMN == 0 && $i!=0) {
					$y++;
					$(".main").append("</ul><br><ul id='list_"+$y+"' class ='listPost'>");
				}
				$("#list_"+$y+"").append("<li id='" + $jsonParse[$i]["ID"] +"'><div class='Post'><div class='PostImage' style='background-image: url(\"" + $jsonParse[$i]["IMMAGINE"] + "\")'></div><div class='Title'>" + $jsonParse[$i]["TITOLOANTEPRIMA"] +"</div></div></li>");
			}
		}else{
			
		}
	});
});