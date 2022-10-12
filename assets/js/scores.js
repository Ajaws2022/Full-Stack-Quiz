// window.localstorage.removeItem()
// window.localStorage.removeItem("highscores");
//   window.location.reload();
// }

var scoreList = document.querySelector('.scoreList');
var backBtn = document.querySelector('#go-back')
var clearBtn = document.querySelector('#clear-scores')

function goBack (){
    location.href = "index.html";  
}

function addScore(){
    var pullScore = JSON.parse(localStorage.getItem('Score'));
    // var score = document.createElement('li');

    // score.textContent = pullScore;

    // scoreList.append(score);
    for(var i=0; i<pullScore.length; i++){
        var item = pullScore[i];
        var elem = document.createElement("li");
        elem.value=item[0];
        elem.innerHTML=item[0];

        scoreList.appendChild(elem);
   }
    
}
addScore();


 backBtn.addEventListener('click', goBack);

// var clearScores = window.localStorage.removeItem("Score")
function clearScores(){
    scoreList.style.display = "none";
    localStorage.removeItem("Score"); 
}
clearBtn.addEventListener('click', clearScores);