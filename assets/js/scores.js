// SCRIPT TO HANDLE HIGH SCORES PAGE

var clearButton = document.querySelector("#clear-button");

// Function to get high scores from local storage and displays them on the page.
function printHighscores() {
    // Either gets high scores from local storage. If none exist, gets empty array.
    var highscores = JSON.parse(window.localStorage.getItem("high-scores")) || [];
  
    // Sorts high scores in descending order.
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(entry) {
      // Creates list item for each new submission.
      var scoreEntry = document.createElement("li");
      scoreEntry.textContent = entry.player + " - " + entry.score;
  
      // Displays list on the page.
      var orderList = document.getElementById("high-scores");
      orderList.appendChild(scoreEntry);
    });
  }
  
  // Function to clear the high scores.
  function clearHighscores() {
    window.localStorage.removeItem("high-scores");
    window.location.reload();
  }
  
  // List high scores when high score page is loaded.
  printHighscores();

  // Clear high scores when clear button is clicked.
  clearButton.onclick = clearHighscores;