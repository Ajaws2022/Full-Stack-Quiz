var questions = [
    {
        question: 'What is 2 + 2 equal to?',
        choices: [1,2,3,4],
        answer: 4
    },
    {
        question: 'What is 2 - 2 equal to?',
        choices: [0,1,3,4],
        answer: 2
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
// var  startingQuestionIndex = 0;

var currentQuestionIndex = 0;
// populates a quiz question at the top of the page
function generateQuestion(){
    quizEl.innerHTML = "";
    choicesEl.innerHTML = "";
    if(currentQuestionIndex >= questions.length){
        var h1Element = document.createElement('h1');
    h1Element.textContent = "You've reached the end of the game!";
    quizEl.append(h1Element);
    return;

    }
    
    var currentQuestion = questions[currentQuestionIndex];
    var h1Element = document.createElement('h1');
    h1Element.textContent = currentQuestion.question;
    quizEl.append(h1Element);

    for(var i = 0; i < currentQuestion.choices.length; i++){
        var liElement = document.createElement('li');
        liElement.textContent = currentQuestion.choices[i]
        choicesEl.append(liElement);

    }

   
}

function checkAnswer(event){
    if(questions[currentQuestionIndex].answer == event.target.innerText){
        confirmEl.textContent = '';
        
        confirmEl.textContent = 'Correct!';
         
    } else {
        confirmEl.textContent = '';
        
        confirmEl.textContent = 'Incorrect!';
    }
    currentQuestionIndex++;
    generateQuestion();
}

var secLeft = 5;

function setTimer(){
    var timerInterval = setInterval(function(){
        secLeft--;
        timerEl.textContent = secLeft;
    
        if(secLeft === 0) {
          // Stops execution of action at set interval
          clearInterval(timerInterval);
          var h1Element = document.createElement('h1');
          quizEl.textContent = ''
            h1Element.textContent = "Game Over!";
            quizEl.append(h1Element);

          
        
        }
    
      }, 1000);
}

buttonEl.addEventListener('click', setTimer);
buttonEl.addEventListener('click', generateQuestion);

choicesEl.addEventListener('click', checkAnswer);