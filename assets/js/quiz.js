var questions = [
    {
        question: 'When declaring a variable what symbol is used to set its value?',
        choices: ["Parentheses", "Comma", "Equals", "Addition"],
        answer: "Equals"
    },
    {
        question: 'In order for an element to respond to a click we should an a(n) _____.',
        choices: ["Clickbox", "Event Listener", "Variable", "Flexbox"],
        answer: "Event Listener"
    },
    {
        question: 'When working with _____ it is important to create a memorable key name so we can call the object later.',
        choices: ["Local Storage", "Functions", "Variables", "Query Selectors"],
        answer: "Local Storage"
    },
    {
        question: 'To add content to an existing element we should use a(n) _____.',
        choices: ["Variables", "Functions", "Append", "Query Selectors"],
        answer: "Append"
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
var secLeft = 60;
var opnScores = document.querySelector('.viewScores')

var currentQuestionIndex = 0;
// hides initial input form
initialForm.style.display = "none";
confirmEl.style.display = "none";
// viewScores.style.display = "none";

var elem = document.createElement("h1");
elem.textContent = "Welcome To The JavaScript Terminology Quiz!";
quizEl.append(elem);
choicesEl.textContent = "This is a quiz based on JavaScript terminology. When you click 'Start Game!' a timer of 60 seconds will start. Your final score will be the total seconds left. If you answer incorrectly you will lose 12 seconds. Good luck!"
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
        // displays a submit score screen when the quiz is completed properly
        function endQuiz(){
            clearInterval(timerInterval);
        
            var scoreDisplay = document.createElement('div');
        
            scoreDisplay.innerHTML = ("Your score was: " + secLeft);

            choicesEl.append(scoreDisplay);
        }
        // These if statements display a 'Game Over' screen if the quiz is failed
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
            // stops the quiz from generating questions when there are none left
        if(secLeft > 0 && currentQuestionIndex === questions.length) {
            // clearInterval(timerInterval);
            endQuiz();
            
        }
    
      }, 1000);
      
}

// determines if the user input matches the correct answer
function checkAnswer(event){
    if(questions[currentQuestionIndex].answer == event.target.innerText){
        confirmEl.textContent = '';
        
        confirmEl.textContent = 'Correct!';
         
    } else {
        confirmEl.textContent = '';
        
        confirmEl.textContent = 'Incorrect!';
        secLeft -= 12;
    }
    confirmEl.style.display = "block";
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

// adds the score with initials to local storage
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
// changes to the score page when ran
function openScores(){

    window.location.href="HighScores.html"
}
opnScores.addEventListener('click', openScores);
submitBtn.addEventListener('click', submitScore);