// window.localstorage.removeItem()
// window.localStorage.removeItem("highscores");
//   window.location.reload();
// }

var scoreList = document.querySelector('.scoreList');

function addScore(){
    var pullScore = JSON.parse(localStorage.getItem('Score'));
    // var score = document.createElement('li');

    // score.textContent = pullScore;

    // scoreList.append(score);
    for(var i=0;i<pullScore.length;i++){
        var item = pullScore[i];
        var elem = document.createElement("li");
        elem.value=item[0];
        elem.innerHTML=item[1];

        scoreList.appendChild(elem);
   }
    
}
addScore();