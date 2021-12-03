var timerElement = document.querySelector(".corner-timer");
var questionQuiz = document.querySelector(".questionQuiz");
var optionsAnsContainer = document.querySelector(".optionsAnswerContainer");
var resultAnswer = document.querySelector(".resultAnswer");
var container = document.querySelector(".container");

var finalScore = document.createElement("div");
var askInitialsLabel = document.createElement("label");
var initialsInput = document.createElement("input");
var initialsSubmit = document.createElement("input");

var timerCount = 15;
var wins=0;
var j=0;


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



function endGame(){

  var  list = document.getElementById("optionsAnswerContainer"); 
  
  questionQuiz.textContent = "All done!";
  list.remove();   // Removing Cleaning for new messages

  finalScore.textContent = "Your final score is:" + timerCount;
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
    var element = event.target;
    console.log(element);
    
    if (element.matches(".submit")){
      console.log("oprimio submit");
      var initialsData = document.getElementById("initialDataInput");
      console.log("valor: " + initialsData.value);
     // if (initialsData.value != null && initialsData.length > 0){
        var studentScore = {
          initials: initialsData.value.trim(),
          score: timerCount,
          };
        console.log(studentScore);
        localStorage.setItem("studentScore", JSON.stringify(studentScore));

      //} else {console.log("No entro");}

     
    }

   });

}


function askQuestion(x){
  var j = x;
  if (j < questionsArray.length) {
    questionQuiz.textContent = questionsArray[j];
    var answerOption = optionsAnsContainer.getElementsByClassName("box");
  
    for(var i = 0; i < answerOption.length ; i++ ){
        var k = i + 1;
        answerOption[i].innerText = k +"." + answersArray[j][i];
      } 
    resultAnswer.textContent ="";
  
    optionsAnsContainer.addEventListener("click", function(event) {
      if (timerCount > 0 ){
        var element = event.target;
              
        if (element.matches(".box")){
            var numberOp = element.getAttribute("data-number");
            if (numberOp == correct_answer[j]){
              resultAnswer.textContent ="Correct";
              wins++;
            } 
            else {
              resultAnswer.textContent ="Wrong";
              timerCount=timerCount - 10;
            }    
            j++;
            
            askQuestion(j);    
            
        }
      }
    });      
  }
}

/** function renderResults() {
  var lastGrade = JSON.parse(localStorage.getItem("studentGrade"));
  if (lastGrade !== null) {
    document.querySelector(".message").textContent = lastGrade.student + 
    " received a/an " + lastGrade.grade
  }
} **/



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
        endGame();
      } else {
        timerElement.textContent = timerCount;
      }
    }, 1000);
  }

 
  startTimer();
  askQuestion(j);

