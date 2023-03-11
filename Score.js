function Score(props) {
  return (
    <div className="score-container">
      <span className="highscore-label">Your highscore :</span>
      <span className="player-score">{props.highScore}</span>
    </div>
  );
}

export default Score;
