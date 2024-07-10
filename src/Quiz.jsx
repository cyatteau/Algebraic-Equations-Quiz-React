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

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const startQuiz = (difficulty) => {
    setSelectedDifficulty(difficulty);
    const filtered = allQuestions
      .filter((q) => q.difficulty === difficulty)
      .slice(0, 3);
    setFilteredQuestions(filtered);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizComplete(false);
  };

  const handleAnswer = (answer) => {
    const isCorrect =
      answer === filteredQuestions[currentQuestionIndex].correct;
    setAnswers([...answers, isCorrect]);

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < filteredQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
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
          You answered {correctAnswersCount} out of {filteredQuestions.length}{" "}
          correctly.
        </p>
        <button onClick={() => setSelectedDifficulty("")}>Start Over</button>
      </div>
    );
  }

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  return (
    <Equation
      equation={currentQuestion.equation}
      options={currentQuestion.options}
      onAnswer={handleAnswer}
    />
  );
}
