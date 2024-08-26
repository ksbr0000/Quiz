const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const submitButton = document.getElementById('submit-button');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const noteContainer = document.getElementById('note-container');

const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false },
            { text: 'Paris', correct: true },
            { text: 'Rome', correct: false }
        ]
    },
    {
        question: 'Who wrote "To Kill a Mockingbird"?',
        answers: [
            { text: 'Harper Lee', correct: true },
            { text: 'Mark Twain', correct: false },
            { text: 'J.K. Rowling', correct: false },
            { text: 'Ernest Hemingway', correct: false }
        ]
    },
    {
        question: 'What is the largest planet in our solar system?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Jupiter', correct: true },
            { text: 'Saturn', correct: false },
            { text: 'Neptune', correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    noteContainer.classList.add('hide');
    scoreContainer.classList.add('hide');
    nextButton.classList.add('hide');
    submitButton.classList.remove('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer, button));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(answer, button) {
    if (submitButton.classList.contains('hide')) return;

    // Remove previous selection
    const buttons = answerButtons.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('selected'));

    // Highlight selected answer
    button.classList.add('selected');
    selectedAnswer = answer;

    // Show note after selecting an answer
    noteContainer.classList.remove('hide');
}

function submitAnswer() {
    if (!selectedAnswer) {
        alert('Please select an answer.');
        return;
    }

    if (selectedAnswer.correct) {
        score++;
    }

    // Disable all answer buttons
    const buttons = answerButtons.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.add('disabled'));

    submitButton.classList.add('hide');
    nextButton.classList.remove('hide');
    noteContainer.classList.add('hide'); // Hide note after submission
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        selectedAnswer = null;
        showQuestion(questions[currentQuestionIndex]);
        submitButton.classList.remove('hide');
        nextButton.classList.add('hide');
        noteContainer.classList.add('hide'); // Hide note for next question
    } else {
        showScore();
    }
}

function showScore() {
    questionContainer.innerHTML = '';
    answerButtons.innerHTML = '';
    submitButton.classList.add('hide');
    nextButton.classList.add('hide');
    scoreElement.innerText = `You scored ${score} out of ${questions.length}!`;
    scoreContainer.classList.remove('hide');
}

// Start the game when the page loads
startGame();
