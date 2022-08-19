// Main Quiz Script

// Time, Score, and Quiz Index Variables
var score = 0; 
var timer = 99;
var startTime = 99;
var endTime;
var timeInt;
var quizQuestions;
var quizIndex;
var currentQuestion;

var startButton = document.querySelector("#start-quiz");
var timeDisplay = document.querySelector("#timer");
var scoreDisplay = document.querySelector("#score");
var formE1 = document.querySelector("#form");
var introE1 = document.querySelector("#intro");
var quizE1 = document.querySelector("#quiz");
var questionTitleE1 = document.querySelector("#question-title");
var choicesE1 = document.querySelector("#choices");
var feedbackE1 = document.querySelector("#feedback");
var submission = document.querySelector("#submit-score")
var endMess = document.querySelector("#finish-message");
var initialBox = document.querySelector("#initial-box");
var initialMess = document.querySelector("#initial-message");
var endOptions = document.querySelector("#end-options");

var quizLength = 5;
var totalQuestions = questions.length + 1;

function startQuiz() {
document.getElementById("intro").innerHTML = "";
timeInt = setInterval(tick, 1000);
quizQuestions = getQuestions();
quizIndex = 0;
displayQuestion();
}

// Generate an array of length quizLength, filled with random question indices from variable questions.
function getQuestions() {
let questionsAsked = [];
let tempArray = questions;
for (let i = 0; i < quizLength; i++) {
    let j = Math.floor(Math.random() * tempArray.length);
    questionsAsked[i] = tempArray[j];
    // Remove question selected from question pool so quiz contains no repeating questions.
    tempArray.splice(j,1);
}
return questionsAsked;
}

function tick() {
    // Update
    timer--;
    timeDisplay.textContent = timer;
  
    // Check if time has run out
    if (timer <= 0) {
      endQuiz();
    }
  }

function displayQuestion() {
    currentQuestion = quizQuestions[quizIndex];
    choicesE1.innerHTML = "";
    questionTitleE1.textContent = currentQuestion.question;

    currentQuestion.choices.forEach(function(choice, i) {
        // Creates button for each choice
        var option = document.createElement("button");
        option.setAttribute("class", "question-btn");
        option.setAttribute("value", choice);
        option.textContent = choice;
        // Display options
        choicesE1.appendChild(option);
        option.onclick = optionClick;
      });
    }

function optionClick() {
    endTime = timer;
    console.log(startTime);
    console.log(endTime);
    if (this.value != currentQuestion.answer) {
        timer = timer - Math.floor(timer/4);
        timeDisplay.textContent = timer;
        feedbackE1.textContent = "Incorrect!";
    }
    else {
        feedbackE1.textContent = "Correct!";
        score = scoreUpdate(startTime, endTime);
        console.log(score);
    }
    scoreDisplay.textContent = score;

    quizIndex++;
    startTime = endTime;

    if (quizIndex === quizQuestions.length) {
        quizEnd();
    }
    else {
        displayQuestion();
    }
}

// Function to update score, accepts start and end time
function scoreUpdate (startTime, endTime) {
    if (startTime - endTime == 0){
        score = score + 100;
    }
    else {
        score = score + Math.floor(100/(startTime - endTime));
    }
    return score;
    }

// End Quiz, takes users to end screen.
function quizEnd () {
    clearInterval(timeInt);
    document.getElementById("quiz").innerHTML = "";
    endMess.textContent = "All done! Your score is " + score + ". Do you want to submit you score to the high score list?"
    initialMess.textContent = "Enter initials (max 3 letters). Blank submissions will be shown as '...'"
    var initialSubmit = document.createElement("input");
        initialSubmit.setAttribute("id", "initials");
        initialSubmit.setAttribute("class", "txtbox");
        initialSubmit.setAttribute("type", "text");
        initialSubmit.setAttribute("maxlength", "3");
        initialBox.appendChild(initialSubmit);
    var scoreSubmit = document.createElement("button");
        scoreSubmit.setAttribute("id", "score-submit");
        scoreSubmit.setAttribute("class", "btn");
        scoreSubmit.setAttribute("type", "button");
        scoreSubmit.textContent = "Submit";
        endOptions.appendChild(scoreSubmit);
    var newQuiz = document.createElement("button");
        newQuiz.setAttribute("id", "new-quiz");
        newQuiz.setAttribute("class", "btn");
        newQuiz.textContent = "New Quiz";
        endOptions.appendChild(newQuiz);

}


startButton.onclick = startQuiz;