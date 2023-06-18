var player1=Math.floor(Math.random()*6)+1;
var player2=Math.floor(Math.random()*6)+1;

let statement="";

if(player1===player2){
    statement="It's a tie";
}else if(player1>player2){
    statement="Player 1 won";
}else{
    statement="Player 2 won";
}

var title=document.querySelector("h1");

title.innerHTML=statement;

var image1=document.querySelector(".img1");
var image2=document.querySelector(".img2");

image1.setAttribute("src",`./images/dice${player1}.png`);
image2.setAttribute("src",`./images/dice${player2}.png`);

