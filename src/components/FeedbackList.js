import React from "react";
//import PropTypes from "prop-types";
import { useContext } from "react";
import FeedbackItem from "./FeedbackItem";
import FeedbackContext from "../context/FeedbackContext";
import LoadingSpinner from "./shared/LoadingSpinner";

function FeedbackList() {
  const { feedback, isLoading } = useContext(FeedbackContext);

  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No Feedback yet</p>;
  }

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="feedback-list">
      {feedback.map((e) => (
        <FeedbackItem key={e.id} item={e} />
      ))}
    </div>
  );
}

FeedbackList.propTypes = {
  //feedback: PropTypes.array,
  /* Additional
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  )
  */
};

export default FeedbackList;
