import React, { useState, useEffect } from 'react';

const sampleQuestions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyperlink Texting Modern Language"],
    answer: "Hyper Text Markup Language",
    category: "Web",
    difficulty: "Easy"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS",
    category: "Web",
    difficulty: "Easy"
  },
  {
    question: "Which is not a JavaScript Framework?",
    options: ["Python Script", "JQuery", "Django", "NodeJS"],
    answer: "Django",
    category: "Programming",
    difficulty: "Medium"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "<!-- -->", "#", "/* */"],
    answer: "//",
    category: "JavaScript",
    difficulty: "Easy"
  },
  {
    question: "Which tag is used to insert an image in HTML?",
    options: ["<img>", "<image>", "<pic>", "<src>"],
    answer: "<img>",
    category: "HTML",
    difficulty: "Easy"
  },
  {
    question: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Colorful Style Sheets", "Computer Style Sheets", "Cascading Style Sheets"],
    answer: "Cascading Style Sheets",
    category: "CSS",
    difficulty: "Easy"
  },
  {
    question: "Which property is used to change the background color?",
    options: ["color", "bgcolor", "background-color", "background"],
    answer: "background-color",
    category: "CSS",
    difficulty: "Easy"
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<script>", "<js>", "<javascript>", "<code>"],
    answer: "<script>",
    category: "JavaScript",
    difficulty: "Easy"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Mozilla", "Netscape", "Google", "Microsoft"],
    answer: "Netscape",
    category: "JavaScript",
    difficulty: "Medium"
  },
  {
    question: "Which method is used to write into an alert box in JavaScript?",
    options: ["msg()", "alert()", "msgBox()", "popup()"],
    answer: "alert()",
    category: "JavaScript",
    difficulty: "Easy"
  },
  {
    question: "Which HTML element defines the title of a document?",
    options: ["<meta>", "<title>", "<head>", "<h1>"],
    answer: "<title>",
    category: "HTML",
    difficulty: "Easy"
  },
  {
    question: "What does SQL stand for?",
    options: ["Stylish Question Language", "Structured Query Language", "Strong Question Line", "Simple Query Language"],
    answer: "Structured Query Language",
    category: "Database",
    difficulty: "Medium"
  },
  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Model", "Digital Object Management", "Desktop Oriented Model"],
    answer: "Document Object Model",
    category: "JavaScript",
    difficulty: "Medium"
  },
  {
    question: "Which protocol is used to transfer web pages?",
    options: ["FTP", "SMTP", "HTTP", "SNMP"],
    answer: "HTTP",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    question: "Which of the following is a server-side language?",
    options: ["HTML", "CSS", "JavaScript", "PHP"],
    answer: "PHP",
    category: "Programming",
    difficulty: "Medium"
  }
];
const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(15);
  const [highlightAnswer, setHighlightAnswer] = useState(false);

  const current = sampleQuestions[currentQuestion];

  // Timer Countdown
  useEffect(() => {
    if (timer === 0) {
      handleNext();
      return;
    }
    const countdown = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(countdown);
  }, [timer]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    setHighlightAnswer(true);

    setTimeout(() => {
      if (selectedOption === current.answer) {
        setScore(score + 1);
      }

      setSelectedOption("");
      setHighlightAnswer(false);

      if (currentQuestion < sampleQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimer(15);
      } else {
        setShowResult(true);
      }
    }, 500);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption("");
    setScore(0);
    setShowResult(false);
    setTimer(15);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-200 flex items-center justify-center px-4 pt-16">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 max-w-2xl w-full text-center">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700">🔥 Interactive Quiz</h2>
        {showResult ? (
          <div>
            <h3 className="text-xl font-semibold text-green-600">✅ Your Score: {score} / {sampleQuestions.length}</h3>
            <div className="mt-4 text-left">
              {sampleQuestions.map((q, idx) => (
                <div key={idx} className="mt-2">
                  <p className="font-medium">Q{idx + 1}: {q.question}</p>
                  <p className="text-sm text-gray-600">Correct Answer: <span className="text-green-700">{q.answer}</span></p>
                </div>
              ))}
            </div>
            <button
              className="mt-6 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
              onClick={handleRestart}
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Question {currentQuestion + 1}/{sampleQuestions.length}</span>
                <span>Time Left: {timer}s</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-indigo-500 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / sampleQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Category & Difficulty */}
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>📚 Category: {current.category}</span>
              <span>⚙️ Difficulty: {current.difficulty}</span>
            </div>

            {/* Question */}
            <h3 className="text-xl font-medium text-gray-800 mb-4">{current.question}</h3>

            {/* Options */}
            <div className="grid gap-3 text-left">
              {current.options.map((option, idx) => {
                const isCorrect = highlightAnswer && option === current.answer;
                const isWrong = highlightAnswer && option === selectedOption && option !== current.answer;

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(option)}
                    className={`w-full px-4 py-2 rounded-lg border transition
                      ${selectedOption === option ? "border-indigo-400 bg-indigo-50" : "border-gray-200 bg-gray-50"}
                      ${isCorrect ? "bg-green-100 border-green-500" : ""}
                      ${isWrong ? "bg-red-100 border-red-500" : ""}
                      hover:bg-indigo-100`}
                    disabled={highlightAnswer}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              onClick={handleNext}
              disabled={!selectedOption || highlightAnswer}
            >
              {currentQuestion === sampleQuestions.length - 1 ? "Finish Quiz" : "Next"}
            </button>

            {/* Bottom Navigation Preview */}
            <div className="mt-6 flex justify-center gap-2 flex-wrap text-xs text-gray-500">
              {sampleQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold
                    ${index === currentQuestion ? "bg-indigo-500 text-white" : "bg-gray-200"}`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
