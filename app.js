const dakika = document.getElementById("dk");
let saniye = document.getElementById("sn");

let pay = document.getElementById("pay");
let payda = document.getElementById("payda");

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
let answerButtonsElement = document.getElementById('answer-buttons');
let msgText = document.getElementById("msg-text");
let interval;
let title = document.getElementById('title');
let rule = document.getElementById('rule');
let score = document.getElementById('score');
let km = document.getElementById('km');
let joker = document.getElementById('joker');

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



score.style.display = "none";
km.style.display = "none";
joker.style.display = "none";
joker.addEventListener('click', () => {
  eliminate();
});



function startGame() {
  msgText.innerText = "";
  score.style.display = "block";
  km.style.display = "block";
  joker.style.display = "block";
  title.style.display = "none";
  rule.style.display = "block";
  setTimeout(function () {
    rule.style.display = "none";
  }, 2000)

  pay.textContent = 0;
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex], currentQuestionIndex)
}

function showQuestion(question, questionIndex) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    button = document.createElement('button');
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
        const audio = document.getElementById('audio1');
        audio.volume = 0.2;
        audio.play();

        setTimeout(function () {
          e.target.classList.add('correct');
          let pay1 = pay.textContent;
          pay1++;
          pay.textContent = pay1;
          if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
          } else {
            control();
          }


        }, 500)




        if (shuffledQuestions.length == currentQuestionIndex + 1) {
          control();
        }
      }
      else {
        const audioWrong = document.getElementById('audio2');
        audioWrong.volume = 0.2;
        audioWrong.play();
        setTimeout(function () {
          e.target.classList.add('wrong');
          showAnswer1();
          if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
          } else {
            control();
          }
        }, 1000)


        if (shuffledQuestions.length == currentQuestionIndex + 1) {
          control();
        }

      }

    }, 3000)


  }

  function control() {
    nextButton.classList.add('hide')
    if (shuffledQuestions.length == currentQuestionIndex + 1) {
      startButton.innerText = 'Yeniden Oyna'
      startButton.classList.remove('hide')
      let message = 'OYUN BİTTİ';
      flash_msg(message);
    }


  }




}

function eliminate(e) {
  var questionIndex = parseInt(e.target.getAttribute("data-question-index"), 10);
  var optionIndex = parseInt(e.target.getAttribute("data-options-index"), 10);
  var answer = shuffledQuestions[questionIndex].answers[optionIndex];
  if (answer.correct === false) {
    answerButtonsElement.removeChild(answerButtonsElement.answer);
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
  }, 2000);
}


const questions = [
  {
    question: '24 saat içinde müşteri için azami kazanç ne kadardır?',
    answers: [
      { text: 'A: 100.000 Euro', correct: true },
      { text: 'B: 50.000 Euro', correct: false }
    ]
  },
  {
    question: 'Bet üyelerinin belge kontrol süreleri ne kadardır?',
    answers: [
      { text: 'A: 12 saat', correct: false },
      { text: 'B: 16 saat', correct: false },
      { text: 'C: 48 saat', correct: true },
      { text: 'D: 72 saat', correct: false }
    ]
  },
  {

    question: 'Express veya sistem bahisleri için max oran nedir?',
    answers: [
      { text: 'A: 500', correct: false },
      { text: 'B: 1000', correct: true }
    ]
  },
  {
    question: 'Futbolcuyken, Türkiyede en üst ligde gol kralı olan teknik direktör hangisidir?',
    answers: [
      { text: 'A: Fatih Terim', correct: false },
      { text: 'B: Mustafa Denizli', correct: true },
      { text: 'C: Ersun Yanal', correct: false },
      { text: 'D: Şenol Güneş', correct: false }
    ]
  }
]