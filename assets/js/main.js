const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
    timeLimit: 20,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    correctAnswer: "Mars",
    timeLimit: 15,
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Charles Dickens",
      "Jane Austen",
      "Mark Twain",
    ],
    correctAnswer: "William Shakespeare",
    timeLimit: 25,
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Giraffe", "Blue Whale", "Kangaroo"],
    correctAnswer: "Blue Whale",
    timeLimit: 30,
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
    timeLimit: 18,
  },
];

let quizBody = document.querySelector(".quiz-container");
let quizResult = document.querySelector(".show-result");
let DivResult = document.querySelector(".show-result p");
let replayQuiz = document.querySelector(".show-result .replay");
let quit = document.querySelector(".show-result .quit");
let questionNum = document.querySelector(".question-num");
let questionTime = document.querySelector(".timelimit");
let question = document.querySelector(".question");
let answers = document.querySelector(".answers");
let nextBtn = document.querySelector(".next-qus");

let currQuestion = 0;
let score = 0;
let timer = 0;
let counter = null;
let timerLimit = 0;
let allTime = 0;
let totalTime = 0;
totalTime = calcTotal();

nextBtn.addEventListener("click", () => {
  reset();
  nextQuestion();
});

replayQuiz.addEventListener("click", replay);
quit.addEventListener("click", quitQuiz);

function loadQuestion() {
  timer = quizData[currQuestion].timeLimit;
  questionTime.innerHTML = `${timer}`;
  questionNum.innerHTML = `Question ${currQuestion + 1} of ${quizData.length}`;
  question.innerHTML = `${quizData[currQuestion].question}`;
  answers.innerHTML = "";

  for (let i = 0; i < quizData[currQuestion].options.length; i++) {
    let option = document.createElement("div");
    option.className = "answer";
    option.innerHTML = quizData[currQuestion].options[i];
    answers.appendChild(option);
    option.addEventListener("click", (e) => {
      checkAnswer(e);
      clearSetInterval(counter);
      let leftTime = parseInt(questionTime.innerHTML);
      allTime += parseFloat(quizData[currQuestion].timeLimit) - leftTime;
    });
  }

  startTimer(timer);
}

function nextQuestion() {
  currQuestion++;
  if (currQuestion < quizData.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  quizBody.classList.add("hide");
  quizResult.classList.remove("hide");
  showResult(score, allTime);
}

function showResult(sc, time) {
  if (sc >= 3) {
    DivResult.innerHTML = `Congrats! 🎉,Your score is ${sc} out of ${quizData.length}
    , You Take time ${time} seconds`;
  } else {
    DivResult.innerHTML = `unfortunately! 😔,Your score is ${sc} out of ${quizData.length} ,You can take quiz again`;
  }
}

function checkAnswer(event) {
  answers.classList.add("done");
  let userAnswer = event.target.textContent;
  let correctAns = Array.from(answers.children).filter(
    (answer) => answer.innerHTML == quizData[currQuestion].correctAnswer
  );
  if (userAnswer === quizData[currQuestion].correctAnswer) {
    event.target.classList.add("correct");
    score++;
  } else {
    event.target.classList.add("wrong");
    correctAns[0].classList.add("correct");
  }
}

loadQuestion();

function reset() {
  clearSetInterval(counter);
  answers.classList.remove("done");
}

function startTimer(time) {
  counter = setInterval(timerFunc, 1000);

  function timerFunc() {
    // console.log(time);
    time--;
    questionTime.innerHTML = `${time}`;
    if (time < 10) {
      let newTime = `0${time}`;
      questionTime.innerHTML = `${newTime}`;
    }
    if (time < 0) {
      clearInterval(counter);
      // nextBtn.click();
      nextQuestion();
    }
  }
}

function clearSetInterval(cnt) {
  clearInterval(cnt);
  cnt = null;
}

function replay() {
  window.location.reload();
}

function quitQuiz() {
  window.location.href = "index.html";
}

function calcTotal() {
  quizData.forEach((el) => {
    totalTime += parseInt(el.timeLimit);
  });
  return totalTime;
}
