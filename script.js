const questions =[
    {
        question: "Which is the largest gadaha in the world ?",
        answers: [
            { text: "Yoy", correct: true},
            { text: "Hm", correct: true},
            { text: "Pure duniya ko chor kar hm", correct: false},
            { text: "Me", correct: true},
        ]
    },
    {
        question: "Which is the largest Pagala in the world ?",
        answers: [
            { text: "Hm", correct: true},
            { text: "Question banane wala", correct: false},
            { text: "Hm, jo 1st que. la sahi and de ke bhi 2 que. phad rahe hai", correct: true},
            { text: "Mere alawa or kon ho sakta hai", correct: false},
        ]
    },
    {
        question: "Kisko sabse jada jaruri hai Pagal khana me jana ?",
        answers: [
            { text: "Muje ", correct: true},
            { text: "You ", correct: false},
            { text: "Hm", correct: false},
            { text: "Me", correct: false},
        ]
    },
    {
        question: "What fruit is most eaten in the world ?",
        answers: [
            { text: "Apples", correct: false},
            { text: "Bananas", correct: true},
            { text: "Oranges", correct: false},
            { text: "Strawberries", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex =0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);

})

}


function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
    button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Itna bejati hone ke baad bhi Play Again karo ge";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}



nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }

})

startQuiz();