const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const resultDiv = document.getElementById('result');

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')

    
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'My favourite hero',
    answers: [
      { text: 'Yash', correct: true },
      { text: 'Sudeep', correct: false },
      { text: 'Puneeth', correct: false},
      {text: 'Dr. Vishnuvardhan ', correct: false}
    ]
  },
  {
    question: 'My favourite breakfast',
    answers: [
      { text: 'Masala Dosa', correct: true },
      { text: 'Idli', correct: false },
      { text: 'Puri', correct: false },
      { text: 'None of the above', correct: false }
    ]
  },
  {
    question: 'My favourite colour',
    answers: [
      { text: 'Black and Blue', correct: true },
      { text: 'Black', correct: false},
      { text: 'Pink', correct: false },
      { text: 'Blue', correct: false }
    ]
  },
  {
    question: 'My favourite sweet',
    answers: [
      { text: 'Laddu', correct: true },
      { text: 'Peda', correct: false },
      { text: 'Barfi', correct: false },
      { text: 'Neenge yak bek adhu', correct: false }
    ]
  }
]
