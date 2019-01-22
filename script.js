var testBool;
var crossPointsAmount = 0;
var circlePointsAmount = 0;

function hoverElements(){
    var playSquare = document.querySelectorAll(".playSquare");
    
    for(var i = 0; i < playSquare.length; i++){
    playSquare[i].addEventListener("mouseover", function(){
        this.classList.add("hovered");
    });
    playSquare[i].addEventListener("mouseout", function(){
      this.classList.remove("hovered");   
    });
    }
    
}

function randomizePlayer(){
    var playerDisplayer = document.querySelector("div.display:nth-of-type(2)");
    var rand = Math.floor(Math.random() * 2 + 1);
    var currentSymbol;

    if(rand == 1){
        testBool = false;
        currentSymbol = "circle";
        playerDisplayer.style.backgroundImage = "url(imgs/circle.jpg)";
    } 
    else if(rand == 2){
        testBool=true;
        currentSymbol = "cross";
        playerDisplayer.style.backgroundImage = "url(imgs/cross.jpg)";
    }
    return currentSymbol;
}

function setMark(){
   var playerDisplayer = document.querySelector("div.display:nth-of-type(2)");
   var squares = document.querySelectorAll("div.playSquare");
   var mainImage = playerDisplayer.style.backgroundImage;
    
   for(var i = 0; i < squares.length; i++){
       
       squares[i].addEventListener("click", function(){
           if(testBool==true){
               this.style.backgroundImage="url(imgs/cross.jpg)";
               playerDisplayer.style.backgroundImage = "url(imgs/circle.jpg)";
               testBool=false;
               this.classList.add("marked");
               this.classList.add("markedCross");
               this.style.pointerEvents = "none";
           }
           else if(testBool==false){
               this.style.backgroundImage="url(imgs/circle.jpg)";
               playerDisplayer.style.backgroundImage = "url(imgs/cross.jpg)";
               testBool=true; 
               this.classList.add("marked");
               this.classList.add("markedCircle");
               this.style.pointerEvents = "none";
           } 
       }) 
   }  
}

function changeTheHeader(symbol){
    var mainheader = document.querySelector("h2:first-of-type");
    var playAgain = document.querySelector("h2:nth-of-type(2)");
    if(symbol == "cross"){
      mainheader.textContent = "Cross wins!"; 
    }
    else if(symbol == "circle"){
      mainheader.textContent = "Circle wins!";  
    }
    else if(symbol == "none"){
      mainheader.textContent = "...";
    }
    
}
function restart(playAgainButton, playSquares, circleWins, crossWins, squaresArray){
    playAgainButton.textContent = "Play again";
    for(var i = 0; i < playSquares.length; i++){
        if(playAgainButton.textContent=="Play again"){
           playSquares[i].style.pointerEvents = "none"; 
        }
        else if(playAgainButton.textContent!="Play again"){
           playSquares[i].style.pointerEvents = "auto";
           
        }
           playSquares[i].classList.remove("markedCircle");
           playSquares[i].classList.remove("markedCross");
           playSquares[i].classList.remove("marked");
    }
    playAgainButton.addEventListener("click", function(){
        for(var i = 0; i < playSquares.length; i++){
            playSquares[i].style.backgroundImage = "none";
            playSquares[i].style.pointerEvents = "auto";
        }
        circleWins=false;
        crossWins=false;
        for(var i = 0 ; i<squaresArray.length; i++){
                squaresArray[i]=0;
        }
        playAgainButton.textContent="";
        changeTheHeader("none");
        randomizePlayer();
    })
    
}
function countPoints(winner){
  var pointsCrossHeader = document.querySelector("#crossPoints");
  var pointsCircleHeader = document.querySelector("#circlePoints");
  
  if(winner == "cross"){
      crossPointsAmount++;
      pointsCrossHeader.textContent = crossPointsAmount;
  }
  else if(winner == "circle"){
      circlePointsAmount++;
      pointsCircleHeader.textContent = circlePointsAmount;
  }   
}

function checkTheWinner(){
    var divs = document.querySelectorAll("div.playSquare");
    var squaresArray=[];
    var circleWins = false;
    var crossWins = false;
    var mainheader = document.querySelector("h2:first-of-type");
    var playAgain = document.querySelector("h2:nth-of-type(2)");
    
    document.addEventListener("click", function(){
        function checkMarked(markNumber, index, array){
                return markNumber > 0;
            }
        var nobodyWins=squaresArray.every(checkMarked);
        
        if(divs[0].classList.contains("markedCross") && divs[1].classList.contains("markedCross") && divs[2].classList.contains("markedCross") || divs[0].classList.contains("markedCross") && divs[3].classList.contains("markedCross") && divs[6].classList.contains("markedCross") ||
        divs[0].classList.contains("markedCross") && divs[4].classList.contains("markedCross") && divs[8].classList.contains("markedCross") ||
        divs[3].classList.contains("markedCross") && divs[4].classList.contains("markedCross") && divs[5].classList.contains("markedCross") ||
        divs[6].classList.contains("markedCross") && divs[4].classList.contains("markedCross") && divs[2].classList.contains("markedCross") ||
        divs[2].classList.contains("markedCross") && divs[5].classList.contains("markedCross") && divs[8].classList.contains("markedCross") ||
        divs[6].classList.contains("markedCross") && divs[7].classList.contains("markedCross") && divs[8].classList.contains("markedCross") ||
        divs[1].classList.contains("markedCross") && divs[4].classList.contains("markedCross") && divs[7].classList.contains("markedCross")){
            crossWins=true;
            circleWins=false;
            changeTheHeader("cross");   
            if(crossWins == true){
                countPoints("cross");
                restart(playAgain, divs, circleWins, crossWins, squaresArray);
                crossWins=false;
                circleWins=false;
            }
    }
        else if(divs[0].classList.contains("markedCircle") && divs[1].classList.contains("markedCircle") && divs[2].classList.contains("markedCircle") || divs[0].classList.contains("markedCircle") && divs[3].classList.contains("markedCircle") && divs[6].classList.contains("markedCircle") ||
        divs[0].classList.contains("markedCircle") && divs[4].classList.contains("markedCircle") && divs[8].classList.contains("markedCircle") ||
        divs[3].classList.contains("markedCircle") && divs[4].classList.contains("markedCircle") && divs[5].classList.contains("markedCircle") ||
        divs[6].classList.contains("markedCircle") && divs[4].classList.contains("markedCircle") && divs[2].classList.contains("markedCircle") ||
        divs[2].classList.contains("markedCircle") && divs[5].classList.contains("markedCircle") && divs[8].classList.contains("markedCircle") ||
        divs[6].classList.contains("markedCircle") && divs[7].classList.contains("markedCircle") && divs[8].classList.contains("markedCircle") ||
        divs[1].classList.contains("markedCircle") && divs[4].classList.contains("markedCircle") && divs[7].classList.contains("markedCircle")){   
            circleWins=true;
            changeTheHeader("circle");
            if(circleWins == true){
                countPoints("circle");
                restart(playAgain, divs, circleWins, crossWins, squaresArray);
                crossWins=false;
                circleWins=false;
            }
            }
        
        else if(!crossWins && !circleWins){
            for(var i = 0; i < divs.length; i++){
                if(divs[i].classList.contains("marked")){
                squaresArray[i]=1;
                }
                else{
                squaresArray[i]=0;
                }
                }
            if(divs[0].classList.contains("marked")&& divs[1].classList.contains("marked")&& divs[2].classList.contains("marked")&& divs[3].classList.contains("marked")&& divs[4].classList.contains("marked")&& divs[5].classList.contains("marked")&& divs[6].classList.contains("marked")&& divs[7].classList.contains("marked")&& divs[8].classList.contains("marked")){
            restart(playAgain, divs, circleWins, crossWins, squaresArray);
            
            }
        } 
       });
}

hoverElements();
setMark();
checkTheWinner();
