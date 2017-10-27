$(document).ready(function(){
	var topics = ["dog","cat","frog","deer","tiger","bird","lion","bear","horse","giraffe"];
	var playImage;
	var stillImage;
	function displayAnimals(){
		var animal = $(this).attr("data-name");
	        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

	        $.ajax({
	          url: queryURL,
	          method: "GET"
	        }).done(function(response) {

		          console.log(response);
		          var results = response.data;
		          $(".imageHolder").empty();

		        for (var i = 0; i < results.length; i++) {

		        	 stillImage = results[i].images.fixed_height_still.url;
		        	console.log("stillImage is"+stillImage);

		        	 playImage = results[i].images.fixed_height.url;
		        	console.log("animated"+playImage);

			        var animalDiv = $("<div>");
			        $(animalDiv).attr("class","col-md-3")
			        
			        var p = $("<p>").text("Rating: " + results[i].rating);
			        
			        var animalImage = $("<img>");
			        
			        animalImage.attr("src", playImage);
			        animalImage.attr("stillSrc",stillImage);
			        animalImage.attr("playSrc",playImage);
			        animalImage.addClass("gifClass");
			       	animalImage.attr("data-state","still");
			       	animalImage.css("width","250px");
			       	animalImage.css("height","250px");
			       	animalDiv.append(p);

			        
			        animalDiv.append(animalImage);
			        
			        $(".imageHolder").prepend(animalDiv);
		   	 	}

	        });

	}//end of displayAnimals()
	function renderButtons(){
		$(".buttonsHolder").empty();
	       
	        for (var i = 0; i < topics.length; i++) {

	          var a = $("<button>");
	          a.addClass("btn-info");
	          a.css("border","none");
	    	  a.addClass("btn-lg");
	          a.css("margin-left","3px");
	          a.css("margin-top","3px");
	          a.addClass("animals");
	          a.attr("data-name", topics[i]);
	          a.text(topics[i]);
	          $(".buttonsHolder").append(a);
	        }

	}//end of renderButtons()
	$(".submitButton").on("click", function(event) {
	        event.preventDefault();
	        var topic = $("#animal-input").val().trim();
	        
	        if(topic == ""){
	        	alert("please enter an animal name");
	        }
	        else{
	        	 $("#animal-input").val("");
		        topics.push(topic);
		        renderButtons();
	        }
	       
	 });
	function PauseAnimate(){

		if($(this).attr("src") == $(this).attr("stillSrc")){
			$(this).attr("src",$(this).attr("playSrc"));
		}
		else if($(this).attr("src") == $(this).attr("playSrc")){
			$(this).attr("src",$(this).attr("stillSrc"));
		}
	}
	$(document).on("click", ".animals", displayAnimals);
	$(document).on("click", ".gifClass", PauseAnimate);
	renderButtons();

});