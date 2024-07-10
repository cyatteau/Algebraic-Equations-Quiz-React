import { useState } from "react";
import allQuestions from "./questions";

function Equation({ equation, options, onAnswer }) {
  return (
    <div className="equation">
      <div>{equation}</div>
      <div className="options">
        {options.map((option, index) => (
          <button key={index} onClick={() => onAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function getNextQuestion(currentDifficulty, wasCorrect, askedQuestions) {
  const difficultyLevels = ["easy", "medium", "hard"];
  let currentIndex = difficultyLevels.indexOf(currentDifficulty);

  if (wasCorrect) {
    currentIndex = Math.min(currentIndex + 1, difficultyLevels.length - 1); // Increase difficulty up to hard
  } else {
    currentIndex = Math.max(currentIndex - 1, 0); // Decrease difficulty down to easy
  }

  const nextDifficulty = difficultyLevels[currentIndex];

  const filteredQuestions = allQuestions.filter(
    (q) => q.difficulty === nextDifficulty && !askedQuestions.includes(q.id)
  );

  return filteredQuestions[
    Math.floor(Math.random() * filteredQuestions.length)
  ];
}

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [askedQuestions, setAskedQuestions] = useState([]);

  const startQuiz = (difficulty) => {
    setSelectedDifficulty(difficulty);
    const initialQuestions = allQuestions.filter(
      (q) => q.difficulty === difficulty
    );
    const initialQuestion = initialQuestions[
      Math.floor(Math.random() * initialQuestions.length)
    ];
    setCurrentQuestion(initialQuestion);
    setAskedQuestions([initialQuestion.id]);
    setAnswers([]);
    setQuestionsAnswered(0);
    setQuizComplete(false);
  };

  const handleAnswer = (answer) => {
    const isCorrect = answer === currentQuestion.correct;
    setAnswers([...answers, isCorrect]);

    const nextQuestionIndex = questionsAnswered + 1;
    setQuestionsAnswered(nextQuestionIndex);

    if (nextQuestionIndex < 3) {
      const nextQuestion = getNextQuestion(
        selectedDifficulty,
        isCorrect,
        askedQuestions
      );
      setCurrentQuestion(nextQuestion);
      setAskedQuestions([...askedQuestions, nextQuestion.id]);
    } else {
      setQuizComplete(true);
    }
  };

  if (!selectedDifficulty) {
    return (
      <div>
        <h1>Select Difficulty Level</h1>
        <button onClick={() => startQuiz("easy")}>Easy</button>
        <button onClick={() => startQuiz("medium")}>Medium</button>
        <button onClick={() => startQuiz("hard")}>Hard</button>
      </div>
    );
  }

  if (quizComplete) {
    const correctAnswersCount = answers.filter(Boolean).length;
    return (
      <div>
        <h1>Quiz Complete</h1>
        <p>
          You answered {correctAnswersCount} out of {questionsAnswered}{" "}
          correctly.
        </p>
        <button onClick={() => setSelectedDifficulty("")}>Start Over</button>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <Equation
      equation={currentQuestion.equation}
      options={currentQuestion.options}
      onAnswer={handleAnswer}
    />
  );
}
