var colors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var gameIsOn = false
var currentLevel = 0

function nextSequence (){
    $("h1").text("Level " + currentLevel)
    var randomNumber = Math.floor(Math.random()*3 + 1)
    randomChoosenColor = colors[randomNumber]
    gamePattern.push(randomChoosenColor)
    console.log(gamePattern)
    console.log(gamePattern.length)
    currentLevel++
    pressButton()
}

function pressButton(){
    var pressedColor = gamePattern.at(-1)
    var button = $("#"+pressedColor)
    playSound(pressedColor)
    animatedPress(button)
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}

function animatedPress (currentColor){
    currentColor.addClass("pressed");
    setTimeout( function(){
        currentColor.removeClass("pressed");
    }, 100);
}

function gameOver (){
    $("body").addClass("game-over")
    setTimeout(function(){
        $("body").removeClass("game-over")
    }, 200)
    $("h1").text("Game Over, Press Any Key to Restart")
    currentLevel = 0
    gamePattern = []
    userClickedPattern = []
    gameIsOn = false
    playSound("wrong")
}

$(document).keydown(function () {
    if (gameIsOn === false){
        nextSequence()
        gameIsOn = true   
    }
})




$(".btn").click(function (){
    
    var clickedColor = this.id
    userClickedPattern.push(clickedColor)
    playSound(clickedColor)
    animatedPress($("#"+this.id))
    console.log("User Pattern ")
    console.log(userClickedPattern)
    console.log("Game Pattern ")
    console.log(gamePattern.slice(0, userClickedPattern.length+1))

    for (var indexCheck = 0; indexCheck <= userClickedPattern.length - 1; indexCheck ++){

        if (userClickedPattern.length === gamePattern.length){
            userClickedPattern = []
            setTimeout(nextSequence, 1000)
            break
        }else if (gamePattern[indexCheck] === userClickedPattern[indexCheck]){
            console.log("yes")
        }else{
            gameOver()
        }
    }
    
})







