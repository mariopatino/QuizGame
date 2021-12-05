var timerElement = document.querySelector(".corner-timer");
var questionQuiz = document.querySelector(".questionQuiz");
var optionsAnsContainer = document.querySelector(".optionsAnswerContainer");
var resultAnswer = document.querySelector(".resultAnswer");
var container = document.querySelector(".container");

var finalScore = document.createElement("div");
var askInitialsLabel = document.createElement("label");
var initialsInput = document.createElement("input");
var initialsSubmit = document.createElement("input");

var timerCount = 115;
var wins=0;
var j=0;   // Question counter


var questionsArray=[
  "After a varible is defined but it does not have a value assigment, what the type of the varible?",
  "What is the same as this math expression: x += y",
  "Which method extracts a part of a string using the length of the extracted part",
  "A very useful tool using during development and debugging for printing content to the debugger is:"
  ];
var answersArray=[
  ["String", "Boolean", "undefined", "Object"],
  ["x = y + y","x = 1 + y","x = y + y", "x = x + y"],
  ["for","slice()","split()","substr()"],
  ["JavaScript","terminal/bash","for loops","console.log"]
];
var correct_answer=[2,3,3,3];

function registerScores(initialsData, wins){
  
  var studentsScores= JSON.parse(localStorage.getItem("studentsScores"));
    
  //console.log(studentsScores);
  console.log("Student Scores: " + studentsScores);
  console.log("Last Student: " + laststudentScores);

  if (studentsScores !== null) {
    var laststudentScores = { 
        initials: initialsData,
        score: wins,};    
    studentsScores.GameQuiz.push(laststudentScores);
    localStorage.setItem("studentsScores",JSON.stringify(studentsScores));
  } else {
      var laststudentScores = { GameQuiz: [{
          initials: initialsData,
          score: wins,}
       ]};    
      localStorage.setItem("studentsScores",JSON.stringify(laststudentScores));
  }
}


function endGame(){

  questionQuiz.textContent = "All done!";
  optionsAnsContainer.remove(); // Removing Cleaning for new messages

  finalScore.textContent = "Your final score is:" + wins;
  askInitialsLabel.textContent = "Enter initials";
  initialsSubmit.textContent = "Submit";
 
  container.appendChild(finalScore);
  container.appendChild(askInitialsLabel);
  container.appendChild(initialsInput);
  container.appendChild(initialsSubmit);

  initialsInput.setAttribute("id", "initialDataInput");
  initialsSubmit.setAttribute("type", "button");
  initialsSubmit.setAttribute("value", "Submit");
  initialsSubmit.setAttribute("class", "submit");

  container.addEventListener("click", function(event) {
    event.preventDefault();
    var element = event.target;
    console.log("Dentro del Listener: " + element);
    
    if (element.matches(".submit")){
      console.log("oprimio submit");
      var initialsData = document.getElementById("initialDataInput");
      console.log("iniciales: " + initialsData.value);
     // if (initialsData.value != null && initialsData.length > 0){
       
        console.log("Dentro del matches summit");
        
        registerScores(initialsData.value,wins);

        
    }

   });

}


function askQuestion(j){
  console.log("El valor de j = " + j);
  console.log("Longitud " + questionsArray.length);
  // if the question counter less than the questions array lenght
    if (j < questionsArray.length) {
      // assing and displaying the question
    questionQuiz.textContent = questionsArray[j];

    // Get index for all box classes to display aswers options 
    var answerOption = optionsAnsContainer.getElementsByClassName("box");
  
    for(var i = 0; i < answerOption.length ; i++ ){
        var k = i + 1;
        console.log("El valor de i" + i);
        console.log("El valor de k" + k);
        answerOption[i].innerText = k +"." + answersArray[j][i];
      } 
    
  
    optionsAnsContainer.addEventListener("click", function(event) {
      event.preventDefault();
      if (timerCount > 0 ){
        var element = event.target;
        resultAnswer.textContent ="";
        if (element.matches(".box")){
            var numberOp = element.getAttribute("data-number");
            if (numberOp == correct_answer[j]){
              resultAnswer.textContent ="Correct";
              wins++;
            } else {
              resultAnswer.textContent ="Wrong";
              timerCount=timerCount - 10;
            }    
            j++;
            askQuestion(j);    
        }
      }
    });      
  } else {
    wins=timerCount;
    clearInterval(timer);
    console.log("en el else donde j es mayor a la longitud del arreglo de preguntas")
    endGame();
  }
}


function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
     // Tests if time has run out
      if (timerCount <= 0) {
        // Clears interval
        clearInterval(timer);
        timerCount = 0;
        timerElement.textContent = 0;
        wins=0;
        endGame();
      } else {
        timerElement.textContent = timerCount;
      }
    }, 1000);
  }

 
  startTimer();
  askQuestion(j);

