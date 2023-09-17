// alert("attached")

let buttonColors=["red", "blue", "green", "yellow"]
let gamePattern=[]
let userClickedPattern=[]
let start=false
let level=0

function nextSequence(){
    return Math.floor(Math.random()*4)
}

function addRandomColor(){
    level++
    $("#level-title").text("Level " + level);
    userClickedPattern=[]
    
    let color=buttonColors[nextSequence()]
    gamePattern.push(color)

    flashElement(color)
    playAudio(color)
    
    
}

function clearLists(){
    userClickedPattern=[]
}


function flashElement(color) {
    console.log($("."+color))
    $("."+color).toggleClass('pressed')
    setTimeout(()=>{
        $("."+color).toggleClass('pressed')
    },100)
}

function playAudio(color) {
    var audio = new Audio('sounds/'+color+'.mp3'); 
    audio.play();
}

$(".btn").click(function(){
    let userClickedButton=$(this).attr("id")
    flashElement(userClickedButton)
    playAudio(userClickedButton)
    userClickedPattern.push(userClickedButton)
    console.log(userClickedPattern)
    console.log(gamePattern)
    checkAnswer(userClickedPattern.length-1);
    

})

$(document).on("keydown",(event)=>{
    if(!start && event.key==="a" || event.key=="A"){
        start=true
        $("#level-title").text("Level " + level);
        addRandomColor()
    }
})

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          addRandomColor();
        }, 1000);
      }
    } else {
      playAudio("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
  }
  