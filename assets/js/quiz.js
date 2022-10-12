var questions = [
    {
        question: 'What is 2 + 2 equal to?',
        choices: [1,2,3,4],
        answer: 4
    },
    {
        question: 'What is 2 - 2 equal to?',
        choices: [0,1,3,4],
        answer: 0
    },
    {
        question: 'What is 2 * 2 equal to?',
        choices: [1,2,3,4],
        answer: 4
    },
    {
        question: 'What is 2 / 2 equal to?',
        choices: [1,2,3,4],
        answer: 1
    }
]

var buttonEl = document.querySelector('#game-button');
var quizEl = document.querySelector('#quiz-question');
var choicesEl = document.querySelector('.quiz-choices');
var confirmEl = document.querySelector('#confirm')
var timerEl = document.querySelector('.timeBox')
var initialForm = document.querySelector('#submitInitials')
var initials = document.querySelector('#initials')
var submitBtn = document.querySelector('#submitBtn')
var viewScores = document.querySelector('.viewScores')
var secLeft = 20;
var opnScores = document.querySelector('.viewScores')

var currentQuestionIndex = 0;
// hides initial input form
initialForm.style.display = "none";
// viewScores.style.display = "none";
// populates a quiz question at the top of the page
function generateQuestion(){

    quizEl.innerHTML = "";

    choicesEl.innerHTML = "";
    
    if(currentQuestionIndex >= questions.length){
        var h1Element = document.createElement('h1');
        
        // displays a message and prompt for initials when the game is completed properly
    
        h1Element.textContent = "You've reached the end of the game!";

    initialForm.style.display= "block";

    confirmEl.textContent = '';

    quizEl.append(h1Element);
    
    return;

    }
    // generates a question beginning at the zero index
    var currentQuestion = questions[currentQuestionIndex];

    var h1Element = document.createElement('h1');

    h1Element.textContent = currentQuestion.question;

    quizEl.append(h1Element);
    // adds the choices for the question below it
    for(var i = 0; i < currentQuestion.choices.length; i++){

        var liElement = document.createElement('li');

        liElement.textContent = currentQuestion.choices[i]

        choicesEl.append(liElement);
    } 
}

// This functions logic ensures that either the game is completed with the timer paused or the game is lost (ran out of time) and a 'game over' screen displayed.
function setTimer(){
    var timerInterval = setInterval(function(){

        secLeft--;

        timerEl.textContent = 'Time: ' + secLeft;

        function endQuiz(){
            clearInterval(timerInterval);
        
            var scoreDisplay = document.createElement('div');
        
            scoreDisplay.innerHTML = ("Your score was: " + secLeft);

            choicesEl.append(scoreDisplay);
        }
    
        if(secLeft === 0 && currentQuestionIndex < questions.length) {
          // Stops execution of action at set interval
          clearInterval(timerInterval);
          var h1Element = document.createElement('h1');
          var parElement = document.createElement('p')

          quizEl.textContent = '';
          choicesEl.textContent = '';
            h1Element.textContent = "Game Over!";
            parElement.textContent = "You ran out of time.";
            quizEl.append(h1Element);
            choicesEl.append(parElement);
        } if(secLeft === 0 && currentQuestionIndex === questions.length) {
            
            clearInterval(timerInterval);
            var h1Element = document.createElement('h1');
            var parElement = document.createElement('p')
  
            quizEl.textContent = '';
            choicesEl.textContent = '';
              h1Element.textContent = "Game Over!";
              parElement.textContent = "You ran out of time.";
              quizEl.append(h1Element);
              choicesEl.append(parElement);
        }
            
        if(secLeft > 0 && currentQuestionIndex === questions.length) {
            // clearInterval(timerInterval);
            endQuiz();
            
        }
    
      }, 1000);
      
}


function checkAnswer(event){
    if(questions[currentQuestionIndex].answer == event.target.innerText){
        confirmEl.textContent = '';
        
        confirmEl.textContent = 'Correct!';
         
    } else {
        confirmEl.textContent = '';
        
        confirmEl.textContent = 'Incorrect!';
        secLeft -= 5;
    }
    currentQuestionIndex++;
    generateQuestion();
    event.stopPropagation();
}

buttonEl.addEventListener('click', setTimer);

buttonEl.addEventListener('click', generateQuestion);

buttonEl.addEventListener('click', () => {
    buttonEl.style.display = 'none';
});

choicesEl.addEventListener('click', checkAnswer);
// var scores = [];

function submitScore(event){
    
    var userScore = [initials.value + " -" + secLeft];
    // scores.push(userScore);
    // localStorage.setItem('Score', JSON.stringify(scores))
    var addScore = JSON.parse(localStorage.getItem('Score')) || [];
    addScore.push(userScore);
    localStorage.setItem('Score', JSON.stringify(addScore));
    
    event.preventDefault();
    // redirect to highscores page
    window.location.href="HighScores.html"

}
function openScores(){

    window.location.href="HighScores.html"
}
opnScores.addEventListener('click', openScores);
submitBtn.addEventListener('click', submitScore);