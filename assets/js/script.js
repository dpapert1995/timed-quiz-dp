// Main Quiz Script

// Time, Score, and Quiz Index Variables
var quizIndex = 0;
var score = 0; 
var timer = 99;

var startButton = document.querySelector("#start-quiz");
var timeDisplay = document.querySelector("#timer");
var scoreDisplay = document.querySelector("#score");
var form = document.querySelector("#form");

var quizLength = 5;
var totalQuestions = questions.length + 1;
var quizQuestions = getQuestions();

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

function endQuiz {

}