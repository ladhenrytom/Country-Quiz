import Quiz from "./Quiz";
import Score from "./Score";
import { Countries } from "./Countries";
import undraw2 from "./undraw2.svg";
import { newQuestion, newRandomQuestion } from "country-quiz";
import { useState } from "react";

function Main() {
  const sampleQuestion = newRandomQuestion(4);

  const [questionSet, setQuestionSet] = useState(sampleQuestion);
  const [questionType, setQuestionType] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [streak, setStreak] = useState(0);
  const [highscore, setHighscore] = useState(
    localStorage.getItem("highscore") || 0
  );

  let pic = Countries.find((el) => {
    return el.name === questionSet.answer;
  });

  function startQuiz(e) {
    if (e.target.classList.contains("quiz-type-option")) {
      document.querySelector(".quiz-type-container").classList.add("hidden");
      document.querySelector(".quiz-container-main").classList.remove("hidden");
      if (e.target.classList.contains("c-2-c")) {
        setQuestionSet(newQuestion("country-to-capital", 4));
        setQuestionType("c-2-c");
      } else if (e.target.classList.contains("f-2-c")) {
        setQuestionSet(newQuestion("flag-to-country", 4));
        setQuestionType("f-2-c");
      }
    }
  }

  function handleOptionClick(e) {
    document.querySelectorAll(".quiz-option").forEach((el) => {
      el.classList.remove("option-active");
    });
    if (e.target.classList.contains("quiz-option")) {
      e.target.classList.add("option-active");
      if (e.target.children[1].innerText === questionSet.answer) {
        setCurrentAnswer(e.target.children[1].innerText);
      }
      document.querySelector(".next-btn").classList.remove("hidden");
    } else if (e.target.parentElement.classList.contains("quiz-option")) {
      e.target.parentElement.classList.add("option-active");
      if (e.target.innerText === questionSet.answer) {
        setCurrentAnswer(e.target.innerText);
      } else {
        setCurrentAnswer(e.target.nextSibling?.innerHTML);
      }
      document.querySelector(".next-btn").classList.remove("hidden");
    }
  }

  function loadNewQuestion() {
    document.querySelector(".next-btn").classList.add("hidden");
    document.querySelectorAll(".quiz-option").forEach((el) => {
      el.classList.remove("option-active");
    });
    if (questionType === "c-2-c") {
      setQuestionSet(newQuestion("country-to-capital", 4));
    } else if (questionType === "f-2-c") {
      setQuestionSet(newQuestion("flag-to-country", 4));
    }
  }

  function showScore() {
    document.querySelector(".quiz-container-main").classList.add("hidden");
    document.querySelector(".quiz-score-container").classList.remove("hidden");
    highscore < streak && setHighscore(streak);
  }

  function checkAnswer() {
    if (currentAnswer === questionSet.answer) {
      loadNewQuestion();
      setStreak((prev) => prev + 1);
    } else {
      showScore();
    }
  }

  function endQuiz() {
    document.querySelector(".quiz-type-container").classList.remove("hidden");
    document.querySelector(".quiz-container-main").classList.add("hidden");
    document.querySelector(".quiz-score-container").classList.add("hidden");
    document.querySelector(".next-btn").classList.add("hidden");
    document.querySelectorAll(".quiz-option").forEach((el) => {
      el.classList.remove("option-active");
    });
    localStorage.setItem("highscore", highscore);
    setStreak(0);
    setCurrentAnswer("");
  }

  return (
    <div className="main">
      <div className="highscore-container">
        <Score highScore={highscore} />
      </div>
      <div className="quiz-type-container">
        <h1 className="quiz-type-header1">Welcome to country quiz!</h1>
        <h2 className="quiz-type-header2">Choose a category of questions...</h2>
        <div className="quiz-type-options" onClick={startQuiz}>
          <div className="quiz-type-option c-2-c">Country to Capital</div>
          <div className="quiz-type-option f-2-c">Flag to Country</div>
        </div>
      </div>
      <div className="quiz-container-main hidden">
        <Quiz
          questionType={questionType}
          question={questionSet}
          handleOptionClick={handleOptionClick}
          checkAnswer={checkAnswer}
          pic={pic?.alpha2.toLocaleLowerCase()}
        />
      </div>
      <div className="quiz-score-container hidden">
        <img alt="" src={undraw2} />
        <h3 className="quiz-score_label">Your streak:</h3>
        <h1 className="quiz-score_score">{streak}</h1>
        <div className="quiz-score-btns" onClick={startQuiz}>
          <button className="quiz-score-btn" onClick={endQuiz}>
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
