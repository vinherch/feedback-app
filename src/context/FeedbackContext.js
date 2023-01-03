import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  //States
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false });
  const [isLoading, setIsLoading] = useState(true);

  //useEffect - Initial Load of feedback data from json server
  useEffect(() => {
    fetchFeedbackData();
  }, []);

  //Fetch feedback data from json-server (mock data)
  const fetchFeedbackData = async () => {
    const res = await fetch("/feedbacks?_sort=id&_order=desc");
    const data = await res.json();

    //Set Feedback data
    setFeedback(data);
    setIsLoading(false);
  };

  //Delete selected Feedback item
  const deleteFeedbackItem = async (id) => {
    if (window.confirm("Selected item will be deleted!")) {
      await fetch(`/feedbacks/${id}`, {
        method: "DELETE",
      });
      setFeedback(feedback.filter((e) => e.id !== id));
    }
  };

  //Create new Feedback Items
  const addFeedbackItem = async (newFeedbackItem) => {
    const res = await fetch("/feedbacks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedbackItem),
    });
    const data = await res.json();
    setFeedback([data, ...feedback]);
  };

  //Set selected feedback item as edited
  const editFeedbackItem = (item) => {
    setFeedbackEdit({ item, edit: true });
  };

  //Update Feedback Item
  const updateFeedbackItem = async (id, updatedItem) => {
    const res = await fetch(`/feedbacks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });
    const data = await res.json();
    setFeedback(
      feedback.map((feedbackItem) => {
        if (feedbackItem.id === id) {
          return { ...feedbackItem, ...data };
        } else {
          return feedbackItem;
        }
      })
    );
  };

  return <FeedbackContext.Provider value={{ feedback, deleteFeedbackItem, addFeedbackItem, editFeedbackItem, feedbackEdit, updateFeedbackItem, isLoading }}>{children}</FeedbackContext.Provider>;
};

export default FeedbackContext;
