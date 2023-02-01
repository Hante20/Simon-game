var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;
var highScore = 0;

$("html").on("keypress",function(){
    if (!gameStarted)
    {
        nextSequence();
        gameStarted = true;
    }
});

$(".btn").click(function()
{
    // alert("button was clicked");
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

$(".icon").click(function(){
    $(".help").toggleClass("unhide");
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor( Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" +randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    if(level > highScore)
    {
        highScore = level;
    }
    
}

function playSound(chosenColor)
{
    var audioElement = new Audio("sounds/" + chosenColor + ".mp3");

    audioElement.play();
}

function animatePress(chosenColor)
{
    $("#"+chosenColor).addClass("pressed");
    setTimeout(function()
    {
        $("#"+chosenColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function(){

                nextSequence();

            }, 1000);
        }
    }
    else
    {
        var gameOver = new Audio("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        gameOver.play();

        $("#level-title").text("Game Over, Press Any Key to Restart");
        $(".score-board").addClass("score-unhide");
        $(".score-text").text("High-Score:" + showScore(level));
        startOver();
    }
    
}

function startOver()
{
    gamePattern = [];
    level = 0;
    gameStarted = false;
}

function showScore(levelReached){
    if(levelReached > highScore)
    {
        return (levelReached - 1);
    }
    else{
        return (highScore -1);
    }
}

