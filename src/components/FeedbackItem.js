//import PropTypes from "prop-types";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

import Card from "./shared/Card";
import { FaTimes, FaEdit } from "react-icons/fa";

function FeedbackItem({ item }) {
  const { deleteFeedbackItem, editFeedbackItem } = useContext(FeedbackContext);

  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button onClick={() => deleteFeedbackItem(item.id)} className="close">
        <FaTimes color="purple" />
      </button>
      <button className="edit" onClick={() => editFeedbackItem(item)}>
        <FaEdit color="purple"></FaEdit>
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  );
}

// FeedbackItem.propTypes = {
//   item: PropTypes.object.isRequired,
// };

export default FeedbackItem;
