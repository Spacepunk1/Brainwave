const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-button");
const prevButton = document.createElement("button");
const submitButton = document.createElement("button");
const timerElement = document.createElement("div"); // Timer element

const questions = [
  {
    question: "What is the capital of California?",
    answers: ["Los Angeles", "San Francisco", "Sacramento", "San Diego"],
    correct: 2,
  },
  {
    question: "What is the capital of Florida?",
    answers: ["Miami", "Tampa", "Orlando", "Tallahassee"],
    correct: 3,
  },

  {
    question: "What is the capital of New York?",
    answers: ["New York City", "Albany", "Buffalo", "Rochester"],
    correct: 1,
  },

  {
    question: "What is the capital of Texas?",
    answers: ["Dallas", "Houston", "Austin", "San Antonio"],
    correct: 2,
  },

  {
    question: "What is the capital of Washington?",
    answers: ["Seattle", "Tacoma", "Spokane", "Olympia"],
    correct: 3,
  },

  {
    question: "What is the capital of Oregon?",
    answers: ["Portland", "Eugene", "Salem", "Bend"],
    correct: 2,
  },

  {
    question: "What is the capital of Nevada?",
    answers: ["Las Vegas", "Reno", "Carson City", "Henderson"],
    correct: 2,
  },
  {
    question: "What is the capital of Arizona?",
    answers: ["Phoenix", "Tucson", "Mesa", "Scottsdale"],
    correct: 0,
  },

  {
    question: "What is the capital of Colorado?",
    answers: ["Denver", "Colorado Springs", "Aurora", "Fort Collins"],
    correct: 0,
  },

  {
    question: "What is the capital of Utah?",
    answers: ["Salt Lake City", "West Valley City", "Provo", "West Jordan"],
    correct: 0,
  },
];

let currentQuestion = 0;
let score = 0;
let userAnswers = Array(questions.length).fill(-1);
let timer; // Timer variable
let timeLimit = 10; // Time limit for each question in seconds

function showQuestion() {
  const question = questions[currentQuestion];
  questionElement.textContent = question.question;
  answersElement.innerHTML = "";
  const backgroundMusic = document.getElementById("background-music");
  backgroundMusic.play();

  // Start the timer
  startTimer();

  question.answers.forEach((answer, index) => {
    const answerElement = document.createElement("label");
    answerElement.textContent = answer;
    answerElement.className = "answer";
    if (userAnswers[currentQuestion] === index) {
      answerElement.classList.add("selected");
    }
    answerElement.addEventListener("click", () =>
      selectAnswer(index, answerElement)
    );
    answersElement.appendChild(answerElement);
  });

  submitButton.textContent = "Submit";
  submitButton.className = "submit-button";
  submitButton.addEventListener("click", submitAnswer);
  answersElement.appendChild(submitButton);

  if (currentQuestion > 0 && !prevButton.isConnected) {
    prevButton.textContent = "Previous";
    prevButton.className = "prev-button";
    prevButton.addEventListener("click", prevQuestion);
    answersElement.appendChild(prevButton);
  }
}

function startTimer() {
  let timeRemaining = timeLimit;

  timerElement.textContent = formatTime(timeRemaining);

  // Update the timer every second
  timer = setInterval(() => {
    timeRemaining--;
    timerElement.textContent = formatTime(timeRemaining);

    // Check if time is up
    if (timeRemaining <= 0) {
      clearInterval(timer);
      timerElement.textContent = "Time's Up!";
      submitAnswer();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function selectAnswer(index, answerElement) {
  const prevSelected = document.querySelector(".selected");
  if (prevSelected) {
    prevSelected.classList.remove("selected");
  }
  answerElement.classList.add("selected");
  userAnswers[currentQuestion] = index;
}

function submitAnswer() {
  if (userAnswers[currentQuestion] === questions[currentQuestion].correct) {
    score++;
  }
  clearInterval(timer); // Stop the timer
  if (currentQuestion === questions.length - 1) {
    showResults();
  } else {
    nextQuestion();
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function showResults() {
  let missedQuestions = [];
  questions.forEach((question, index) => {
    if (userAnswers[index] !== question.correct) {
      missedQuestions.push(index + 1);
    }
  });

  let resultMessage = "";
  if (missedQuestions.length === 0) {
    resultMessage = `Congratulations! You answered all questions correctly.`;
  } else {
    resultMessage = `You missed questions: ${missedQuestions.join(", ")}.`;
  }

  resultMessage += `\nYour score is ${score} out of ${questions.length}.`;
  alert(resultMessage);

  currentQuestion = 0;
  score = 0;
  userAnswers.fill(-1);
  window.location.href = "steps.html";
}

// Append the timer element to the container
const container = document.querySelector(".container");
timerElement.className = "timer";
container.appendChild(timerElement);

showQuestion();
