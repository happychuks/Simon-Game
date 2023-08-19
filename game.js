var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;


//jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).on( "keypress", function() {
    if (!started) {
    
    //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
  } );

//jQuery to store sequence of colors chosen by the user and playing of corresponding sound.
$( ".btn" ).on( "click", function() {
    var userChosenColour = $( this ).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);

  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
} );


function checkAnswer(currentLevel) {

    //to check if the most recent user answer is the same as the game pattern.
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      //Javascript to remove the game-over class after a 200 milliseconds.
      setTimeout(function() {$("body").removeClass("game-over");},200);
      
       //2. Call startOver() if the user gets the sequence wrong.
      startOver();
    }
}

function nextSequence() {

      //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

    //Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
        level++;

  //Inside nextSequence(), update the h1 with this change in the value of level.
        $("#level-title").text("Level " + level);

        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);   

    //jQuery to select the button with the same id as the randomChosenColour and apply flash animation
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour)  
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    //Javascript to remove the pressed class after a 100 milliseconds.
    setTimeout(function() {$("#" + currentColour).removeClass("pressed");},100);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}