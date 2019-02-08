$(document).ready(function(){

    var bannedStages = [];
    var player1 = "active";
    var player2 = "inactive";
    var bans = 3;
    var isGame1 = false;
    var bansFinished = false;

    var gameSwitch = document.getElementById("gameSwitch");

    $("#game1Switch").click(function(event) {
        isGame1=true;
        bans = 4;
        gameSwitch.remove();
        document.getElementById("choosingPlayer").innerHTML = "Winner is Choosing";
        document.getElementById("counterpicks").remove();
        $("#starters").children().children().css({"height": "350px","width":"600px","margin":"5px"});
    });

    $("img").click(function(event) {
    	if(bansFinished) {

    	} else {
    		if(gameSwitch) {
	            changeLoserText();
	            gameSwitch.remove();
	        }
	        var imageClicked = $(event.target);
	        /*if(isSelected(imageClicked)){
	            imageClicked.addClass("disabled");
	        } else {*/
	            if(isGame1) {
	                game1(imageClicked);
	            } else {
	                game2Plus(imageClicked);
	            }
	        }
        //}
        
        
        
    });
        
    function game1(stage){
        if(bans == 4) {
            document.getElementById("choosingPlayer").innerHTML = "Winner is Choosing";
            bannedStages.push(stage);
            stage.addClass(findActiveClass);
            switchPlayer();
        } else if (bans > 1){
            stage.addClass(findActiveClass);
            bannedStages.push(stage);
        } else {
            stage.addClass("chosen");
            var stageName = stage.attr("alt");
            document.getElementById("choosingPlayer").innerHTML = "To " + stageName + " we go!";
            bansFinished = true;
        }

        if(bans == 2){
            document.getElementById("choosingPlayer").innerHTML = "Winner Choose a Stage";
        }

        bans--;
    }   

    function game2Plus(stage) {
        if(bans == 3) {
            stage.addClass(findActiveClass);
            bannedStages.push(stage);
            switchPlayer();
        } else if(bans == 2 ) {
            stage.addClass(findActiveClass);
            bannedStages.push(stage);
            document.getElementById("choosingPlayer").innerHTML = "Loser Choose a Stage";
        } else {
            stage.addClass("chosen");
            var stageName = stage.attr("alt");
            document.getElementById("choosingPlayer").innerHTML = "To " + stageName + " we go!";
            bansFinished = true;
        }
        bans--;
    }

    //Checks if the image has already been selected
    function isSelected(image) {
        if(image.hasClass("player1banned") || image.hasClass("player2banned") || image.hasClass("chosen")) {
            return true;
        } else{
            return false
        }
    }

    //Switches the Player Banning, Probably not needed at the moment
    function switchPlayer() {
        if(player1 == "active"){
            player2 = "active";
            player1 = "inactive";
            document.getElementById("choosingPlayer").innerHTML = "Loser is Choosing";
        } else {
            player1 = "active"
            player2 = "inactive"
            document.getElementById("choosingPlayer").innerHTML = "Winner is Choosing";
        }
    }

    function changeLoserText(){
        
        document.getElementById("choosingPlayer").innerHTML = "Loser is Choosing";
    }

    function isActive(player) {
        if(player == "active") {
            return true;
        } else {
            return false;
        }
    }

    function findActiveClass() {
        if(isActive(player1)) {
            return "player1banned";
        } else {
            return "player2banned";
        }
    }

});
