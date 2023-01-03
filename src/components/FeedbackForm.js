import React from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import { useState, useContext, useEffect } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  //States
  const [text, setText] = useState("");
  const [rating, setRating] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  //Context
  const { addFeedbackItem, feedbackEdit, updateFeedbackItem } = useContext(FeedbackContext);

  //useEffect - Editing Feedback items in form
  useEffect(() => {
    //Disable Send Button. Fill text field & rating with data from selected item
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  //Handler for text input
  const textHandler = (ev) => {
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage("Text must be at least 10 characters");
    } else {
      setBtnDisabled(false);
      setMessage(null);
    }
    setText(ev.target.value);
  };

  //Handler for form subtmi / create new Feedback item
  const submitHandler = (ev) => {
    //Prevent reload
    ev.preventDefault();

    //Create new Feedback Item
    const newFeedback = {
      text,
      rating,
    };

    //Check for Feedback Update. If true - update Feedback Item - else create new Feedback Item
    if (feedbackEdit.edit === true) {
      updateFeedbackItem(feedbackEdit.item.id, newFeedback);
    } else {
      addFeedbackItem(newFeedback);
    }

    //Clear up text field after submit new feedback item
    setText("");
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect
          select={(value) => {
            setRating(value);
          }}
        />
        <div className="input-group">
          <input type="text" value={text} onChange={textHandler} placeholder="Write a reveiw" />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
