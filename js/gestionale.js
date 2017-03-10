$(document).ready(function(){
	if(sessionStorage.getItem("username") != null){
		$("#usr").html(sessionStorage.getItem("username"));
		//POST FRAGMENT
		$id = -1;

		$d = new Date();

		$("#DataPubblicazione").html("Data: " + $d.getDate() + "-" + ($d.getMonth()+1) + "-" + $d.getFullYear());

		$(".dialog").css("display","none");

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
					sessionStorage.setItem("ItemModify", $id);
					$(".post .body").fadeOut("1000","linear").hide();
					$("#TitoloTxt").val($("#titolo_"+$id).html());
					$.ajax({
						method: "POST",
						url: "visualSingle.php",
						data: {ID: $id}
					})
					.done(function(data){
						$data = JSON.parse(data);
						$("#descrizioneTxt").val($data[0]["TESTO"]);
						$("#DataPubblicazione").html("Data: " + $data[0]["DATACREAZIONE"]);
						$("#Categoria").val($data[0]["CATEGORY"]);
					})
					$(".newPost").fadeIn("1000", "linear").show();
				}
			});
		});

		$("#OK").click(function(){
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

		$(".addPost").click(function(){
			sessionStorage.setItem("ItemModify", null);
			$("#TitoloTxt").val("");
			$("#descrizioneTxt").val("");
			$("#Categoria").val("null");
			$("#DataPubblicazione").html("Data: " + $d.getDate() + "-" + ($d.getMonth()+1) + "-" + $d.getFullYear());
			$(".newPost").fadeIn("1000", "linear").show();
			$(".post .body").fadeOut("100", "linear").hide();
		});

		$("#Cancel").click(function(){
			$(".newPost").fadeOut("1000", "linear").hide();
			$(".post .body").fadeIn("100", "linear").show();
		});

		$("#CANCEL").click(function(){
			$("#dialogElimin").fadeOut("1000", "linear").hide();
		});


		//NEW POST FRAGMENT
		$(".newPost main .tools ul i").click(function(){
			$action = event.target.id;

			$cursor = $('#descrizioneTxt').getCursorPosition();
			$firstText = $("#descrizioneTxt").val().substr(0, $cursor);
			$secondText = $("#descrizioneTxt").val().substr($cursor, $("#descrizioneTxt").val().length);

			if ($action.indexOf("btnBold")==0) {
				$("#descrizioneTxt").val($firstText + "<bold></bold>"  + $secondText);
				$("#descrizioneTxt").setCursorPosition($cursor, 6);
			}else if ($action.indexOf("btnItalic")==0) {
				$("#descrizioneTxt").val($firstText + "<text class='italicTxt'></text>"  + $secondText);
				$("#descrizioneTxt").setCursorPosition($cursor, 23);
			}
		});

		$("#Pubblica").click(function(){
			if (sessionStorage.getItem("ItemModify")>=0) {
				$.ajax({
					method: "POST",
					url: "aggiorna.php",
					data: { Id: sessionStorage.getItem("ItemModify"), Titolo: $("#TitoloTxt").val(), Descrizione: $("#descrizioneTxt").val(), Categoria: $("#Categoria").val(), Data: $d.getDate() + "-" + ($d.getMonth()+1) + "-" + $d.getFullYear()}
				})
				.done(function(data){
					if($jsonParse){
						$("#dialogOK").fadeIn("1000", "linear").show();
						setTimeout(function(){
							$("#dialogOK").fadeOut("1000", "linear");
							setTimeout(function(){
								$(".newPost").fadeOut("1000","linear").hide();
								$(".post .body").fadeIn("100","linear").show();
								location.reload();
							}, 500);
							
						}, 1500);
					}else{
						$("dialogError").fadeIn("1000", "linear").show();
						setTimeout(function(){
							$("#dialogError").fadeOut("1000", "linear");
							$("#dialogElimin").fadeOut("1000", "linear");
						}, 3000);
					}
				});
			}else{
				$.ajax({
					method: "POST",
					url: "aggiungi.php",
					data: { Titolo: $("#TitoloTxt").val(), Descrizione: $("#descrizioneTxt").val(), Categoria: $("#Categoria").val(), Data: $d.getDate() + "-" + ($d.getMonth()+1) + "-" + $d.getFullYear()}
				})
				.done(function(data){
					if($jsonParse){
						$("#dialogOK").fadeIn("1000", "linear").show();
						setTimeout(function(){
							$("#dialogOK").fadeOut("1000", "linear");
							setTimeout(function(){
								$(".newPost").fadeOut("1000","linear").hide();
								$(".post .body").fadeIn("100","linear").show();
								location.reload();
							}, 500);
							
						}, 1500);
					}else{
						$("dialogError").fadeIn("1000", "linear").show();
						setTimeout(function(){
							$("#dialogError").fadeOut("1000", "linear");
							$("#dialogElimin").fadeOut("1000", "linear");
						}, 3000);
					}
				})
				.fail(function(jqXHR, textStatus){
					
				});
			}
		});

		(function($, undefined) { 
			$.fn.setCursorPosition = function($position, $padding){
				var el = $(this).get(0);
			    var elemLen = el.value.length;                                    
			    el.selectionStart = elemLen;
			    el.selectionEnd = $position + $padding;
			    el.focus();
			}
		})(jQuery);

		(function($, undefined) {  
		    $.fn.getCursorPosition = function() {  
		        var el = $(this).get(0);  
		        var pos = 0;  
		        if ('selectionStart' in el) {  
		            pos = el.selectionStart;  
		        } else if ('selection' in document) {  
		            el.focus();  
		            var Sel = document.selection.createRange();  
		            var SelLength = document.selection.createRange().text.length;  
		            Sel.moveStart('character', -el.value.length);  
		            pos = Sel.text.length - SelLength;  
		        }  
		        return pos;  
		    }  
		})(jQuery);  

	}else{
		window.location.href = "index.html";
	}

	
});