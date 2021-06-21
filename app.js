const dakika = document.getElementById("dk");
let saniye = document.getElementById("sn");

let pay = document.getElementById("pay");

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
let answerButtonsElement = document.getElementById('answer-buttons');
let msgText = document.getElementById("msg-text");
let interval;
let title = document.getElementById('title');
let rule = document.getElementById('rule');

let shuffledQuestions, currentQuestionIndex;


startButton.addEventListener('click', startGame)
startButton.addEventListener('click', startTimer)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
  stopTimer();
  startTimer();
})





function startTimer() {
  let sn = saniye.textContent;
  sn = 10;
  saniye.textContent = sn;
  interval = setInterval(() => {
    sn--;
    if (sn < 10) {
      saniye.textContent = "0" + sn;
    } else {
      saniye.textContent = sn;
    }

    if (sn == 0) {
      showAnswer1();
    }

  }, 1000)

}

function stopTimer() {
  clearInterval(interval);
}




function startGame() {
  title.style.display = "none";
  rule.style.display = "block";
  setTimeout(function () {
    rule.style.display = "none";
  }, 3000)

  pay.textContent = 0;
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - 1)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex], currentQuestionIndex)
}

function showQuestion(question, questionIndex) {
  questionElement.innerText = question.question
  question.answers.forEach((answer, index) => {
    button = document.createElement('button')
    button.innerText = answer.text;
    button.classList.add('btn')
    button.setAttribute("data-question-index", currentQuestionIndex);
    button.setAttribute("data-options-index", index);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}


function selectAnswer(e) {
  stopTimer();

  var questionIndex = parseInt(e.target.getAttribute("data-question-index"), 10);
  var optionIndex = parseInt(e.target.getAttribute("data-options-index"), 10);
  var answer = shuffledQuestions[questionIndex].answers[optionIndex];



  if (e.target) {

    e.target.classList.add('standBy');

    setTimeout(function () {
      if (answer.correct) {
        e.target.classList.add('correct');
        let pay1 = pay.textContent;
        pay1++;
        pay.textContent = pay1;
      }
      else {
        e.target.classList.add('wrong');
        showAnswer1();
      }

    }, 3000)


  }


  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Yeniden Oyna'
    startButton.classList.remove('hide')
    let message = 'OYUN BİTTİ';
    flash_msg(message);
  }



}


function showAnswer1(e) {
  stopTimer();
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })

  function setStatusClass(element, correct) {
    if (correct) {
      element.classList.add('correct');

    }
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Yeniden Oyna'
    startButton.classList.remove('hide')
    let message = 'OYUN BİTTİ';
    flash_msg(message);
  }
}



/*function showAnswer1(e) {
  stopTimer()
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
 
  function setStatusClass(element, correct) {
    if (correct) {
      element.classList.add('correct')
    } else {
      element.classList.add('wrong')
    }
  }
 
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Yeniden Oyna'
    startButton.classList.remove('hide')
    let message = 'OYUN BİTTİ';
    flash_msg(message);
  }
 
}*/



function flash_msg(message) {
  msgText.innerText = message;
  setTimeout(function () {
    msgText.innerText = 'Sonuç: ' + pay.textContent + '/4';
  }, 1000);
}


const questions = [
  {
    question: 'Yeni Zelandanın yerli halkına ne ad verilir?',
    answers: [
      { text: 'A: Maoriler', correct: true },
      { text: 'B: Aborjinler', correct: false }
    ]
  },
  {
    question: 'İstiklal Şairi olarak anılan şair aşağıdakilerden hangisidir?',
    answers: [
      { text: 'Yahya Kemal Beyatlı', correct: false },
      { text: 'Ziya Gökalp', correct: false },
      { text: 'Mehmed Akif Ersoy', correct: true },
      { text: 'Yakub Kadri Karaosmanoğlu', correct: false }
    ]
  },
  {

    question: 'Kızınca tüküren hayvan hangisidir?',
    answers: [
      { text: 'Panda', correct: false },
      { text: 'Lama', correct: true }
    ]
  },
  {
    question: 'Filmlerde dedektiflerin sıkça kullandıkları alet hangisidir?',
    answers: [
      { text: 'A: Teleskop', correct: false },
      { text: 'B: Büyüteç', correct: true },
      { text: 'C: Mikroskop', correct: false },
      { text: 'D: Gözlük', correct: false }
    ]
  }
]