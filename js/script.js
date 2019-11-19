$(document).ready(function(){

    //get inputted value that was stored from previous page and execute a query to get a list
    // FNS = [0,1,3] && [0,1,1,2]
    var stageList = [];
    var banOrder = [0,0,1,1,1,2];
    var bansFinished = false;
    var iterator = 0;

    var gameSwitch = document.getElementById("gameSwitch");
    var backButton = document.getElementById("backButton");
    var mobileView = window.matchMedia("(max-width: 700px)");

    $("#game1Switch").click(function(event) {
        gameSwitch.remove();
        document.getElementById("counterpicks").remove();
        banOrder = [0,0,2];
        // $("#starters img").css({"height": "300px","width":"600px","margin":"5px"});
        changeText();
        document.getElementById("choosingPlayer").innerHTML = "Winner is Striking";
    });

    $("#backButton").click(function(event) {
        if(iterator > 0) {
            undo();
        }
    });

    $("img").click(function(event) {
        var imageClicked = $(event.target);
        if(mobileView.matches){
            $(backButton).css({"padding":"15px 15px","visibility": "visible","font-size": "20px","background-color":"blue"});
            //$("h1").css({"text-align":"right"});
        } else if(!bansFinished){
            $(backButton).css({"padding":"15px 32px","visibility": "visible","font-size": "16px"});
        }
        
    	if(bansFinished || isSelected(imageClicked)) {

    	} else {
             // Checks if the switch is still existent
            if(gameSwitch) {
	            gameSwitch.remove();
            }
            selectorIterator(imageClicked);
            
            }
           
    });		

    function undo() {
        iterator--;
        var removedStage = stageList.pop();
        $(removedStage).removeClass("player1banned");
        $(removedStage).removeClass("player2banned");
        $(removedStage).removeClass("chosen");
        textCurrent();
        if(iterator == 0) {
            document.getElementById("choosingPlayer").innerHTML = "Winner is Striking";
            $(backButton).css("visibility","hidden");
        }
    }

    function textCurrent() {
        switch(banOrder[iterator]) {
            case 0:
                document.getElementById("choosingPlayer").innerHTML = "Winner is Striking";
                break;
            case 1:
                document.getElementById("choosingPlayer").innerHTML = "Loser is Striking";
                break;
            case 2:
                document.getElementById("choosingPlayer").innerHTML = "Pick a Stage";
                break;
            case 3:
                document.getElementById("choosingPlayer").innerHTML = "Pick a Stage Loser";
                break;
        }
    }


    function changeText() {
        switch(banOrder[iterator+1]) {
            case 0:
                document.getElementById("choosingPlayer").innerHTML = "Winner is Striking";
                break;
            case 1:
                document.getElementById("choosingPlayer").innerHTML = "Loser is Striking";
                break;
            case 2:
                document.getElementById("choosingPlayer").innerHTML = "Pick a Stage Winner";
                break;
            case 3:
                document.getElementById("choosingPlayer").innerHTML = "Pick a Stage Loser";
                break;
        }
    }


    //TODO: push banned stages and remove them and their classes from array
    function selectorIterator(imageClicked) {
        var banID = banOrder[iterator];
        var stageName = imageClicked.attr("alt");
        stageList.push(imageClicked);
        changeText();

        switch(banID) {
            case 0:
                $(imageClicked).addClass("player1banned");
                break;
            case 1:
                $(imageClicked).addClass("player2banned");
                break;
            case 2:
                document.getElementById("choosingPlayer").innerHTML = stageName + "  it is!";
                $(imageClicked).addClass("chosen");

                break;
            case 3:
                document.getElementById("choosingPlayer").innerHTML = stageName + "  it is!";
                $(imageClicked).addClass("chosen");
                break;
        }
        iterator++;
    }

    //Checks if the image has already been selected
    function isSelected(image) {
        if(image.hasClass("player1banned") || image.hasClass("player2banned") || image.hasClass("chosen")) {
            return true;
        } else{
            return false;
        }
    }

});
