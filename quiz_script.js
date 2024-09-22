let currentQuestionIndex = 0;
let score = 0;
let totalQuestions; // Total number of questions to generate
const quizData = [];

// Function to start the quiz
function startQuiz() {
    const input = document.getElementById('numQuestions').value;
    totalQuestions = parseInt(input);

    if (isNaN(totalQuestions) || totalQuestions < 4 || totalQuestions > 25) {
        alert("Please enter a number between 4 and 25.");
        return;
    }

    document.getElementById('start').style.display = 'none'; // Hide the start section
    generateRandomQuestions(); // Generate questions
}

// Function to generate random questions
function generateRandomQuestions() {
    quizData.length = 0; // Clear previous quiz data

    for (let i = 0; i < totalQuestions; i++) {
        const num1 = Math.floor(Math.random() * 176); // Random number between 0 and 175
        const num2 = Math.floor(Math.random() * 176); // Random number between 0 and 175
        const operators = ['+', '-', '*', '/'];
        const operator = operators[Math.floor(Math.random() * operators.length)]; // Randomly choose an operator

        let correctAnswer;

        // Calculate the correct answer based on the operator
        if (operator === '+') {
            correctAnswer = num1 + num2;
        } else if (operator === '-') {
            correctAnswer = num1 - num2;
        } else if (operator === '*') {
            correctAnswer = num1 * num2;
        } else if (operator === '/') {
            correctAnswer = num2 !== 0 ? Math.floor(num1 / num2) : num1; // Avoid division by zero
        }

        // Generate answer options
        const answers = generateAnswerOptions(correctAnswer);
        
        quizData.push({
            question: `What is ${num1} ${operator} ${num2}?`,
            answers: answers,
            correct: answers.indexOf(correctAnswer) // Get the index of the correct answer
        });
    }

    loadQuestion(); // Load the first question
}

// Function to generate answer options
function generateAnswerOptions(correctAnswer) {
    const answers = new Set();
    answers.add(correctAnswer);

    while (answers.size < 4) {
        const randomAnswer = Math.floor(Math.random() * 176);
        if (randomAnswer !== correctAnswer) {
            answers.add(randomAnswer);
        }
    }

    return Array.from(answers).sort(() => Math.random() - 0.5); // Shuffle the answers
}

function loadQuestion() {
    const quizContainer = document.getElementById('quiz');
    const questionData = quizData[currentQuestionIndex];

    quizContainer.innerHTML = `
        <div class="question">${questionData.question}</div>
        ${questionData.answers.map((answer, index) => `
            <div class="answer" onclick="selectAnswer(${index}, this)">
                <span>${answer}</span>
            </div>
        `).join('')}
    `;
    quizContainer.style.display = 'block'; // Show quiz container
    document.getElementById('feedback').style.display = 'none'; // Hide feedback initially
}

function selectAnswer(index, element) {
    const questionData = quizData[currentQuestionIndex];
    const feedback = document.getElementById('feedback');

    // Highlight the selected answer in gold
    element.style.backgroundColor = 'gold';

    if (index === questionData.correct) {
        score++;
        feedback.textContent = "Correct!";
        feedback.className = 'correct'; // Add correct class for styling
    } else {
        feedback.textContent = "Incorrect. The correct answer was " + questionData.answers[questionData.correct] + ".";
        feedback.className = 'incorrect'; // Add incorrect class for styling
    }

    feedback.style.display = 'block'; // Show feedback

    // Move to the next question after a brief delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            feedback.style.display = 'none'; // Hide feedback before displaying score
            displayScore();
        }
    }, 2000); // wait 2 seconds before loading the next question
}

function displayScore() {
    const quizContainer = document.getElementById('quiz');
    const scoreDisplay = document.getElementById('score');
    const restartButton = document.getElementById('restartButton');

    quizContainer.style.display = 'none';
    scoreDisplay.style.display = 'block';
    scoreDisplay.innerHTML = `You scored ${score} out of ${totalQuestions}.`;
    restartButton.style.display = 'block';
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('score').style.display = 'none';
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('start').style.display = 'block'; // Show start section again
    document.getElementById('numQuestions').value = ''; // Clear input
}
