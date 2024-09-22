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
        const num1 = Math.floor(Math.random() * 321) + 1; // Random number between 1 and 321
        const num2 = Math.floor(Math.random() * 321) + 1; // Random number between 1 and 321
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
            correctAnswer = num2 !== 0 ? (num1 / num2).toFixed(2) : num1; // Avoid division by zero
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
        const randomAnswer = (Math.random() * 640 - 320).toFixed(2); // Generate answers within a range
        answers.add(randomAnswer);
    }

    return Array.from(answers).sort(() => Math.random() - 0.5); // Shuffle the answers
}

function loadQuestion() {
    const quizContainer = document.getElementById('quiz');
    const questionData = quizData[currentQuestionIndex];

    quizContainer.innerHTML = `
        <div class="question">${questionData.question}</div>
        ${questionData.answers.map((answer, index) => `
            <div class="answer">
                <input type="radio" name="answer" id="answer${index}" value="${index}">
                <label for="answer${index}">${answer}</label>
            </div>
        `).join('')}
    `;
    quizContainer.style.display = 'block'; // Show quiz container
    document.getElementById('nextButton').style.display = 'block'; // Show next button
    document.getElementById('feedback').style.display = 'none'; // Hide feedback initially
}

function nextQuestion() {
    const answers = document.getElementsByName('answer');
    let selectedAnswer;

    answers.forEach(answer => {
        if (answer.checked) {
            selectedAnswer = parseInt(answer.value);
        }
    });

    const feedback = document.getElementById('feedback');
    const questionData = quizData[currentQuestionIndex];

    if (selectedAnswer === questionData.correct) {
        score++;
        feedback.textContent = "Correct!";
    } else {
        feedback.textContent = "Incorrect. The correct answer was " + questionData.answers[questionData.correct] + ".";
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
    const nextButton = document.getElementById('nextButton');
    const restartButton = document.getElementById('restartButton');

    quizContainer.style.display = 'none';
    nextButton.style.display = 'none';
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
