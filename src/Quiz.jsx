import { useState } from "react";

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
  const allQuestions = [
    {
      id: 1,
      difficulty: "easy",
      equation: "x + 6 = 10",
      options: ["x = 4", "x = 14", "x = -4", "x = 16"],
      correct: "x = 4",
    },
    {
      id: 2,
      equation: "x + 3 = 5",
      options: ["x = 2", "x = 3", "x = 8"],
      correct: "x = 2",
      difficulty: "easy",
    },
    {
      id: 3,
      equation: "2x - 4 = 10",
      options: ["x = 5", "x = 7", "x = 9"],
      correct: "x = 7",
      difficulty: "easy",
    },
    {
      id: 4,
      difficulty: "medium",
      equation: "x^2 - 5x + 6 = 0",
      options: ["x = 2, 3", "x = 1, 6", "x = -2, -3", "x = 5, -1"],
      correct: "x = 2, 3",
    },
    {
      id: 5,
      equation: "x^2 - 9 = 0",
      options: ["x = 3", "x = -3", "x = 3, -3"],
      correct: "x = 3, -3",
      difficulty: "medium",
    },
    {
      id: 6,
      difficulty: "medium",
      equation: "x^2 - 2x - 8 = 0",
      options: ["x = 4, -2", "x = -4, 2", "x = 2, 4", "x = -2, -4"],
      correct: "x = 4, -2",
    },
    {
      id: 7,
      difficulty: "hard",
      equation: "3x^3 - 9x^2 + 6x = 0",
      options: ["x = 0, 1, 2", "x = 0, 2, 3", "x = 1, 2, 3", "x = 0, -1, -2"],
      correct: "x = 0, 1, 2",
    },
    {
      id: 8,
      difficulty: "hard",
      equation: "x^3 - 7x + 6 = 0",
      options: [
        "x = 1, -1, 6",
        "x = 1, -2, 3",
        "x = -1, 2, -3",
        "x = 1, 2, -3",
      ],
      correct: "x = 1, -1, 6",
    },
    {
      id: 9,
      difficulty: "hard",
      equation: "x^3 + 3x^2 - 4 = 0",
      options: [
        "x = -4, 1, 1",
        "x = -1, -1, 4",
        "x = -1, -2, 2",
        "x = 1, 1, -4",
      ],
      correct: "x = -1, -1, 4",
    },
  ];
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
