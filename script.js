const quizData = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      answer: "Paris"
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      answer: "JavaScript"
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Computer Style Sheet",
        "Colorful Style Sheet",
        "Creative Style Sheet"
      ],
      answer: "Cascading Style Sheets"
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let selectedAnswer = null;
  let quizContainer;
  
  document.addEventListener("DOMContentLoaded", () => {
    quizContainer = document.getElementById("quiz");
    loadQuestion();
  });
  
  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    quizContainer.innerHTML = `
      <div class="question"><strong>Q${currentQuestionIndex + 1}:</strong> ${currentQuestion.question}</div>
      <div class="options">
        ${currentQuestion.options.map(option => `
          <button onclick="selectOption(this)">${option}</button>
        `).join("")}
      </div>
      <div class="feedback" id="feedback"></div>
      <div class="actions">
        <button onclick="submitAnswer()" id="nextBtn" disabled>Next</button>
      </div>
    `;
    selectedAnswer = null;
  }
  
  function selectOption(btn) {
    document.querySelectorAll(".options button").forEach(button => {
      button.classList.remove("selected");
    });
    btn.classList.add("selected");
    selectedAnswer = btn.textContent;
    document.getElementById("nextBtn").disabled = false;
  }
  
  function submitAnswer() {
    const currentQuestion = quizData[currentQuestionIndex];
    const buttons = document.querySelectorAll(".options button");
  
    buttons.forEach(button => {
      if (button.textContent === currentQuestion.answer) {
        button.classList.add("correct");
      } else if (button.textContent === selectedAnswer) {
        button.classList.add("wrong");
      }
      button.disabled = true;
    });
  
    const feedbackEl = document.getElementById("feedback");
    if (selectedAnswer === currentQuestion.answer) {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "green";
      score++;
    } else {
      feedbackEl.textContent = `Wrong! Correct answer: ${currentQuestion.answer}`;
      feedbackEl.style.color = "red";
    }
  
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < quizData.length) {
        loadQuestion();
      } else {
        showResults();
      }
    }, 1500);
  }
  
  function showResults() {
    quizContainer.innerHTML = `
      <div class="final-score">You scored ${score} out of ${quizData.length}</div>
      <div class="actions">
        <button onclick="restartQuiz()">Restart Quiz</button>
      </div>
    `;
  }
  
  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
  }
  