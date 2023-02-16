import React from "react";
//import PropTypes from "prop-types";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackStates() {
  const { feedback } = useContext(FeedbackContext);

  //Calculate Average of ratings
  let average = (
    (feedback.reduce((acc, currentVal) => {
      return acc + currentVal.rating;
    }, 0) /
      feedback.length /
      100) *
    100
  )
    .toFixed(1)
    .replace(/[.,]0$/, "");

  return (
    <div className="feedback-stats">
      <h4>
        {feedback.length} {feedback.length > 1 ? "Reviews" : "Review"}
      </h4>
      <h4>Average Rating: {isNaN(average) ? "0" : average} </h4>
    </div>
  );
}

FeedbackStates.propTypes = {
  //feedback: PropTypes.array.isRequired,
};

export default FeedbackStates;
