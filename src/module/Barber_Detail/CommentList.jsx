import { useContext, useState } from "react";
import { CommentContext } from "./CommentContext";

const CommentList = () => {
  const { comments, updateLikes, updateDislikes, editComment, deleteComment } =
    useContext(CommentContext);
  const [editMode, setEditMode] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [likedComments, setLikedComments] = useState([]);
  const [dislikedComments, setDislikedComments] = useState([]);

  const handleEditChange = (e) => {
    setEditedComment(e.target.value);
  };

  const handleEditSubmit = (id) => {
    if (editedComment.trim() !== "") {
      editComment(id, editedComment);
      setEditMode(null);
      setEditedComment("");
    }
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedComment("");
  };

  const handleLike = (id) => {
    if (!likedComments.includes(id)) {
      updateLikes(id);
      setLikedComments([...likedComments, id]);
      if (dislikedComments.includes(id)) {
        setDislikedComments(dislikedComments.filter((item) => item !== id));
      }
    }
  };

  const handleDislike = (id) => {
    if (!dislikedComments.includes(id)) {
      updateDislikes(id);
      setDislikedComments([...dislikedComments, id]);
      if (likedComments.includes(id)) {
        setLikedComments(likedComments.filter((item) => item !== id));
      }
    }
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleString();
  };

  return (
    <div className="space-y-5">
      {comments.map((comment) => (
        <div key={comment.id} className="p-6 border border-gray-500 drop-shadow-md rounded-md bg-white ">
          <div className="flex justify-between">
            <h3 className="font-bold text-gray-500 underline">{comment.username}</h3>
            <div className="flex lg:space-x-8 space-x-0 ">
              <div className=" inline-flex  overflow-hidden rounded-md border  bg-gray-700 shadow-sm  ">
                <button
                  onClick={() => handleLike(comment.id)}
                  className={`inline-flex  lg:border-e p-2  cursor-pointer text-black hover:bg-pink-600 focus:relative 
                    
                  
                  ${likedComments.includes(comment.id) ? "font-semibold" : ""}`}
               
                  disabled={likedComments.includes(comment.id)}
                >
                   
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  <div className="mr-2 text-white flexitems-center">{comment.likes}</div>
                </button>
                
                <button
                  onClick={() => handleDislike(comment.id)}
                  className={`inline-flex cursor-pointer  lg:border-e p-2 text-black hover:bg-yellow-500 focus:relative
                    ${
                      dislikedComments.includes(comment.id)
                        ? "font-semibold"
                        : ""
                    }`}
                  disabled={dislikedComments.includes(comment.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                    />
                  </svg>
                 <div className="text-white"> {comment.dislikes}</div>
                </button>
              </div>
              <div className=" inline-flex overflow-hidden rounded-md border  bg-gray-700 shadow-sm">
                <button
                  onClick={() => {
                    setEditMode(comment.id);
                    setEditedComment(comment.body);
                  }}
                  className="inline-block border-e p-3 text-black hover:bg-gray-400 focus:relative"
                  
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="white"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => deleteComment(comment.id)}
                  className="inline-block p-3 border text-gray-700 hover:bg-gray-400  focus:relative"
                
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="white"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {editMode === comment.id ? (
            <div className="mt-2">
              <textarea
                value={editedComment}
                onChange={handleEditChange}
                className="block w-full p-3 border border-gray-300 rounded-md"
                rows="6"
                required
              ></textarea>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleEditSubmit(comment.id)}
                 className="py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-black transform transition-transform duration-200 hover:scale-110"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="py-2.5 px-6 rounded-lg text-sm font-medium bg-black/70 text-white  transform transition-transform duration-200 hover:scale-110"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-black mb-3 break-words whitespace-pre-wrap">
                {comment.body}
              </p>
              <p className="text-gray-400 text-sm mt-1 ">
                {formatTime(comment.timestamp)}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
