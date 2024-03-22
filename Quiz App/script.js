const quizData = [
    {
        question: "What is the capital of France?",
        a: "London",
        b: "Berlin",
        c: "Paris",
        d: "Madrid",
        correct: "c"
    },

    {
        question: "Which of the following is the largest planet in our solar system?",
        a: "Earth",
        b: "Venus",
        c: "Jupiter",
        d: "Mars",
        correct: "c"
    },

    {
        question: "What is the name of the world's largest ocean?",
        a: "Atlantic Ocean",
        b: "Pacific Ocean",
        c: "Indian Ocean",
        d: "Arctic Ocean",
        correct: "b"
    },

    {
        question: "What is the chemical symbol for water?",
        a: "CO2",
        b: "H2O",
        c: "NaCl",
        d: "NH3",
        correct: "b"
    },

    {
        question: "In which year did World War II begin?",
        a: "1914",
        b: "1939",
        c: "1945",
        d: "1950",
        correct: "b"
    }
];

const quiz = document.querySelector('#quiz');
const answerEls = document.querySelectorAll('.answer');

const questions = document.querySelector('#question');
const a_Text = document.querySelector('#a_text');
const b_Text = document.querySelector('#b_text');
const c_Text = document.querySelector('#c_text');
const d_Text = document.querySelector('#d_text');

const submit = document.querySelector('button');

let currentQuiz = 0;
let score = 0;

function loadQuiz () {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];
    questions.innerText = currentQuizData.question;
    a_Text.innerText = currentQuizData.a;
    b_Text.innerText = currentQuizData.b;
    c_Text.innerText = currentQuizData.c;
    d_Text.innerText = currentQuizData.d;
};

function deselectAnswers() {
    answerEls.forEach(answer => {
        return answer.checked = false;
    });
};

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id
        }
    });
    return answer;
}

loadQuiz();

submit.addEventListener('click', () => {
    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuiz].correct){
            score++;
        }

        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        }
        else {
            quiz.innerHTML = `
                <h2>You Answered ${score}/${quizData.length} Questions Correctly!</h2>
                <button onClick='location.reload()'>Reload</button> 
            `
        }
    }
})