var container = document.querySelector(".container");






function renderScores() {
    var lastScore = JSON.parse(localStorage.getItem("studentsScores"));
    var lastScoreArray=lastScore.GameQuiz;
    for (var i in lastScoreArray){
        var studentScore=lastScoreArray[i];
        for (var j in studentScore){
            
            if ( j == "initials"){
                var studentInitials = document.createElement("p");
                studentInitials.textContent = studentScore[j]; 
                container.appendChild(studentInitials);
            }
            if ( j == "score"){
                var studentValueScore = document.createElement("p");
                studentValueScore.textContent = studentScore[j];
                container.appendChild(studentValueScore);
            }
        }
        
    } 
    
    
  }

  renderScores();