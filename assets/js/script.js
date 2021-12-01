var timerElement = document.querySelector(".corner-timer");
var questionQuiz = document.querySelector(".questionQuiz");
var questionContainer = document.querySelector(".quizContainer");
var resultAnswer = document.querySelector(".resultAnswer");

var timerCount = 75;
var wins=0;
var j=0;


var questionsArray=[
  "After a varible is defined but it does not have a value assigment, what the type of the varible?",
  "What is the same as this math expression: x += y",
  "Which method extracts a part of a string using the length of the extracted part"
  ];
var answersArray=[
  ["String", "Boolean", "undefined", "Object"],
  ["x = y + y","x = 1 + y","x = y + y", "x = x + y"],
  ["for","slice()","split()","substr()"]
];
var correct_answer=[2,3,3];



function endGame(){
 questionQuiz.textContent = "All done!";
 answerOption[0].innerText = "Your final score is " + timerCount;
 }


function askQuestion(x){
  var j = x;
  if (j < questionsArray.length) {
    questionQuiz.textContent = questionsArray[j];
    var answerOption = questionContainer.getElementsByClassName("box");
  
    for(var i = 0; i < answerOption.length ; i++ ){
      console.log("j= " + j);
      console.log("i= " + i);
      
      console.log("arreglo indice respuestas " + answersArray[j][i]);
        answerOption[i].innerText = answersArray[j][i];
      } 
    resultAnswer.textContent ="";
  
    questionContainer.addEventListener("click", function(event) {
      if (timerCount > 0 ){
        var element = event.target;
              
        if (element.matches(".box")){
            var numberOp = element.getAttribute("data-number");
            console.log(numberOp);
            console.log(typeof numberOp);
            console.log(correct_answer[j]);
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



function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
     // Tests if time has run out
      if (timerCount <= 0) {
        // Clears interval
        clearInterval(timer);
        endGame();
      } else {
        timerElement.textContent = timerCount;
      }
    }, 1000);
  }

 
  startTimer();

 
  askQuestion(j);


  

  

  /*
function renderLastRegistered() {
  var email = localStorage.getItem("email");
  var password = localStorage.getItem("password");

  if (!email || !password) {
    return;
  }

    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    renderLastRegistered(); */