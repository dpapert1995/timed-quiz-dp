// MAN QUIZ SCRIPT

// Time, score, and quiz index variables.
var score = 0; 
var timer = 99;
var startTime = 99;
var endTime;
var timeInt;
var quizQuestions;
var quizIndex;
var currentQuestion;
var quizLength = 5;
var totalQuestions = questions.length + 1;

// DOM variables.
var startButton = document.querySelector("#start-quiz");
var timeDisplay = document.querySelector("#timer");
var scoreDisplay = document.querySelector("#score");
var quizContent = document.querySelector("#quiz-content");
var introText = document.querySelector("#intro");
var quizText = document.querySelector("#quiz");
var questionTitleText = document.querySelector("#question-title");
var choicesText = document.querySelector("#choices");
var feedbackText = document.querySelector("#feedback");
var submission = document.querySelector("#submit-button")
var endMess = document.querySelector("#finish-message");
var initialBox = document.querySelector("#initial-box");
var initialMess = document.querySelector("#initial-message");
var initialIn = document.querySelector("#initial-entry");
var endOptions = document.querySelector("#end-options");
var clearButton = document.querySelector("#clear-button");

// Start quiz function
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

// Function to run timer.
function tick() {
    // Update timer.
    timer--;
    timeDisplay.textContent = timer;
  
    // Check if time has run out.
    if (timer <= 0) {
      endQuiz();
    }
  }

  // Function to display quiz question. 
function displayQuestion() {
    currentQuestion = quizQuestions[quizIndex];
    choicesText.innerHTML = "";
    questionTitleText.textContent = currentQuestion.question;

    currentQuestion.choices.forEach(function(choice, i) {
        // Creates button for each choice.
        var option = document.createElement("button");
        option.setAttribute("class", "question-btn");
        option.setAttribute("value", choice);
        option.textContent = choice;
        // Display options.
        choicesText.appendChild(option);
        option.onclick = optionClick;
      });
    }

// Function to progress quiz when an option is clicked
function optionClick() {
    endTime = timer;

    // Penalized user with time decrease and no points if answer is incorrect.
    if (this.value != currentQuestion.answer) {
        timer = timer - Math.floor(timer/4);
        timeDisplay.textContent = timer;
        feedbackText.textContent = "Incorrect!";
    }
    // Adds to and updates score when answer is correct.
    else {
        feedbackText.textContent = "Correct!";
        score = scoreUpdate(startTime, endTime);
    }
    scoreDisplay.textContent = score;

    // Advance quiz state.
    quizIndex++;

    // Reset variable for new score updates.
    startTime = endTime;

    // If all five questions have been asked, end the quiz.
    if (quizIndex === quizQuestions.length) {
        quizEnd();
    }

    // Otherwise display a new question.
    else {
        displayQuestion();
    }
}

// Function to update score, accepts start and end time.
function scoreUpdate (startTime, endTime) {
    if (startTime - endTime == 0){
        score = score + 100;
    }
    else {
        score = score + Math.floor(100/(startTime - endTime));
    }
    return score;
    }

// Function to end quiz, updates webpage to show end page contents.
function quizEnd () {
    clearInterval(timeInt);
    document.getElementById("quiz").innerHTML = "";
    endMess.textContent = "All done! Your score is " + score + ". Do you want to submit you score to the high score list?"
    initialMess.textContent = "Enter initials (max 3 letters). Blank submissions will be shown as '...'"
    initialBox.setAttribute("class", "show");
    endOptions.setAttribute("class", "show");
    var newQuiz = document.createElement("button");
        newQuiz.setAttribute("id", "new-quiz");
        newQuiz.setAttribute("class", "btn");
        newQuiz.textContent = "New Quiz";
        endOptions.appendChild(newQuiz);
}

// Function for saving the user's score.

function saveHighScore() {
    // Get value of input box.
    var player = initialIn.value;

      // Gets local storage. If nothing is stored, it gets a blank array.
      var highscores =
        JSON.parse(window.localStorage.getItem("high-scores")) || [];
  
      // Formats information into new score object.
      var newScore = {
        score: score,
        player: player
      }
  
      // Saves new score to local storage.
      highscores.push(newScore);
      window.localStorage.setItem("high-scores", JSON.stringify(highscores));
  
      // Redirects to high score page.
      window.location.href = "high-scores.html";
  
}

// Function that checks for text in initial entry input box.
function checkForText(){
    if (document.getElementById("initial-entry").value === ''){
        document.getElementById("submit-button").disabled = true;
    }   
    else {
        document.getElementById("submit-button").disabled = false;
    }
}

// Event Listener for the initial entry input box.
  initialIn.addEventListener('input', checkForText);
// When start button is clicked, run the start quiz function.
  startButton.onclick = startQuiz;
// When submit high score button is clicked, run the saveHighScore function.
  submission.onclick = saveHighScore;
