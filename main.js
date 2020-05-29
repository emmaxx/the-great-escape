function buildQuiz( ) {
  const output = [];
  
    //loops to create the question+answers
  quizQuestions.forEach((currentQuestion, progress) => {
    const answers = [];
    
    currentQuestion.answers.forEach((currentAnswer) =>{
      answers.push(
      `<label>
        <input type="radio" name="question${progress}" value="${currentAnswer.city}">
        ${currentAnswer.text}
      </label>`
      );
    });
    output.push(
      `<div class="question-block">
        <div class="question"> ${currentQuestion.question}</div>
        <div class="answers"> ${answers.join("")}</div>
      </div>`
    );
  });
  quizContainer.innerHTML = output.join('');

}

function showResults(){
  let score = 0;
  let escapedCity = "";
  
  const allAnswers = quizContainer.querySelectorAll('.answers');
  console.log(allAnswers);
  //loop through each question
  quizQuestions.forEach((currentQuestion, progress) => {
    
    const answerContainer = allAnswers[progress];
    const selector = `input[name=question${progress}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || 0);
    
    if(userAnswer.value === "NY"){
      score++;
    } else if (userAnswer.value === "LA"){
      score--;
    }
    score > 0 ? escapedCity = "New York" : escapedCity = "Los Angeles";
  });
  score === 0 ? resultsContainer.innerHTML = `Listen, you need to give me SOMETHING to work with, you can't just not escape.` : resultsContainer.innerHTML = `Congrats, you are a survivor! You just escaped from ${escapedCity}!`;
  
  questions[currentQuestion].classList.remove('active');
  submitButton.style.display = 'none';
  previousButton.style.display = 'none';
  progressBar.style.display = 'none';
}

function initQuestion(n){
  
  questions[currentQuestion].classList.remove('active');
  questions[n].classList.add('active');
  currentQuestion = n;
  

  if(currentQuestion === 0){
    previousButton.style.display = "none";
  }else{
    previousButton.style.display = "inline-block"; }
  
  if(currentQuestion === questions.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
  }else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none'; }
}

function showNextQuestion(){
  initQuestion(currentQuestion + 1)
  console.log(progressBar);
  progressBar.setAttribute("value", currentQuestion);
}

function showPreviousQuestion(){
  initQuestion(currentQuestion - 1)
  progressBar.setAttribute("value", currentQuestion);
}

function startQuiz(){
  splash.style.display = "none";
}

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const quizQuestions = [
    {
      question: "In which year did you escape?",
      answers: [
        { text: "1991", city:"NY"},
        { text: "2013", city:"LA"}
      ]
    },
    {
      question: "What caused the root of all of the chaos?",
      answers: [
        { text: "An Earthquake", city:"LA"},
        { text: "World War 3", city:"NY"}
      ]
    },
    {
      question: "The president tries to stop an invasion from where?",
      answers: [
        { text: "Cuba", city:"LA"},
        { text: "Soviet Union", city:"NY"}
      ]
    },
    {
      question: "Where was an island converted into a prison?",
      answers: [
        { text: "LA", city:"LA"},
        { text: "Manhattan", city:"NY"}
      ]
    },
    {
      question: "Warning.. SPOILER ALERT: At the end of the movie, the main character Snake, does what?",
      answers: [
        { text: "Puffs a cigarette while going into the darkness", city:"NY"},
        { text: "Picks a cigarette box labelled “American Spirit”", city:"LA"}
      ]
    }
  ];

//builds the quiz
buildQuiz();

const splash = document.getElementById("quiz-splash");
const startButton = document.getElementById("start");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const questions = document.querySelectorAll(".question-block");
let currentQuestion = 0;
const progressBar = document.querySelector("progress");
progressBar.setAttribute("max", quizQuestions.length);

initQuestion(currentQuestion);


// on submit, show results
startButton.addEventListener('click', startQuiz)
submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousQuestion);
nextButton.addEventListener("click", showNextQuestion);
