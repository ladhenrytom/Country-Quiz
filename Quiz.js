import undraw1 from "./undraw1.svg";

function Quiz(props) {
  let question = props.question;

  return (
    <div className="quiz-container">
      <h1 className="quiz-header">Country Quiz</h1>
      <div className="quiz-content">
        <img className="top-img" alt="" src={undraw1} />
        {props.questionType === "c-2-c" && (
          <h2 className="quiz-question">
            What is the capital of {question.question}?
          </h2>
        )}
        {props.questionType === "f-2-c" && (
          <div>
            <img
              className="quiz-question-img"
              alt=""
              src={require(`./../node_modules/svg-country-flags/svg/${
                props.pic || "ad"
              }.svg`)}
            />
            <h2 className="quiz-question">
              What country does this flag belong to?
            </h2>
          </div>
        )}
        <div className="quiz-options" onClick={props.handleOptionClick}>
          <div className="quiz-option">
            <span className="quiz-option-item">A</span>
            <span className="quiz-option-item">{question.options[0]}</span>
          </div>
          <div className="quiz-option">
            <span className="quiz-option-item">B</span>
            <span className="quiz-option-item">{question.options[1]}</span>
          </div>
          <div className="quiz-option">
            <span className="quiz-option-item">C</span>
            <span className="quiz-option-item">{question.options[2]}</span>
          </div>
          <div className="quiz-option">
            <span className="quiz-option-item">D</span>
            <span className="quiz-option-item">{question.options[3]}</span>
          </div>
        </div>
        <button className="next-btn hidden" onClick={props.checkAnswer}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Quiz;
