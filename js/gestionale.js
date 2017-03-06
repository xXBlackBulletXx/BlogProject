$(document).ready(function(){
	if(sessionStorage.getItem("username") != null){
		$("#usr").html(sessionStorage.getItem("username"));
		//POST FRAGMENT
		$id = -1;

		$.ajax({
			method: "POST",
			url: "visual.php"
		})
		.done(function( data ) {
			$jsonParse = JSON.parse(data);
			$("#statusVisual").html("");
			for ($i = 0; $i < $jsonParse.length; $i++) {
				$y = $jsonParse[$i]["ID"];
				$("#data").append("<tr><td id='id_"+$y+"'>"+$jsonParse[$i]["ID"]+"</td><td id='data_"+$y+"'>"+$jsonParse[$i]["DATACREAZIONE"]+"</td><td id='titolo_"+$y+"'>"+$jsonParse[$i]["TITOLO"]+"</td><td><ul><li><i class='fa fa-trash-o' id='delete_"+$y+"'/><i class='fa fa-pencil-square-o' id='modify_"+$y+"'/></li></ul></td></tr>");
			}

			if($("#data").html().indexOf("<tr>")<0){
				$("#statusVisual").html("Nessun dato presente.");
			}

			$("table tr td ul li i").click(function(){
				$id = event.target.id;
				$underPos = $id.indexOf('_');
				$action = $id.substr(0, $underPos);
				$id = $id.substr($underPos+1, $id.length);
				if ($action.indexOf("delete")>=0){
					$("#dialogElimin").fadeIn("1000", "linear").show();
				}else if($action.indexOf("modify")>=0){

				}
			});
		});

		$("dialog #OK").click(function(){
			$.ajax({
				method: "POST",
				url: "elimina.php",
				data: { id: $id}
			})
			.done(function(data){
				$jsonParse = JSON.parse(data);
				if($jsonParse){
					$("#dialogOK").fadeIn("1000", "linear").show();
					setTimeout(function(){
						$("#dialogOK").fadeOut("1000", "linear");
						$("#dialogElimin").fadeOut("100", "linear");
						setTimeout(function(){
							location.reload();
						}, 500);
						
					}, 1500);
				}else{
					$("#dialogError").fadeIn("1000", "linear").show();
					setTimeout(function(){
						$("#dialogError").fadeOut("1000", "linear");
						$("#dialogElimin").fadeOut("1000", "linear");
					}, 3000);
				}
			})
			.fail(function(jqXHR, textStatus){
				$("#dialogError").fadeIn("1000", "linear").show();
				setTimeout(function(){
					$("#dialogError").fadeOut("1000", "linear");
				}, 3000);
				
			});
		});

		$("dialog #CANCEL").click(function(){
			$("#dialogElimin").fadeOut("1000", "linear");
		});


		//NEW POST FRAGMENT
		$(".newPost main .tools ul i").click(function(){
			$action = event.target.id;
			if ($action.indexOf("btnBold")>=0) {
				document.getElementById("descrizioneTxt").innerHTML += " <bold> ";
			}
		});

	}else{
		window.location.href = "index.html";
	}

	
});