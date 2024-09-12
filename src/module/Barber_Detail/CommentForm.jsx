import React, { useState, useContext } from "react";
import { CommentContext } from "./CommentContext";

const CommentForm = () => {
  const [comment, setComment] = useState("");
  const { user, addComment } = useContext(CommentContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== "") {
      addComment(comment);
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full py-5">
      <textarea
        placeholder="แสดงความคิดเห็น"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="block w-full p-2 mb-2 border border-gray-200 rounded-md  font-medium text-md"
        rows="8"
        required
        aria-label="Comment"
      ></textarea>
      <button className="relative inline-flex  group mt-5 mb-5" >
        <div className="absolute  -inset-px  rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt" />
        <a
          type="Submit"
          title="Get quote now"
          className="relative inline-flex items-center  transform  hover:scale-110 justify-center px-4 py-3 text-lg font-semibold text-white transition-all duration-200 bg-black hover:bg-limegreen  hover:text-black font-ubuntu rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring--900"
        >
          Confirm
        </a>
      </button>
    </form>
  );
};

export default CommentForm;
