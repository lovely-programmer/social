import "./styles/comment.scss";
import { useEffect, useState, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  createComment,
  getComments,
  reset,
} from "../features/comment/commentReducer";
import { Comment } from "../types.d";
import moment from "moment";

function Comments({ postId }: { postId: number }) {
  const dispatch = useAppDispatch();
  const [desc, setDesc] = useState("");

  const { comments, isLoading, isError, isUpdating, isSuccess } =
    useAppSelector((state) => state.comments);

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      setDesc("");
    }

    dispatch(getComments(postId));

    
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isUpdating]);
  

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(createComment({ desc, postId }));
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={user.profilePicture} alt="" />
        <input
          type="text"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          placeholder="write a comment"
        />
        <button onClick={handleSubmit}>Send</button>
      </div>

      {isError
        ? "Something went wrong"
        : isLoading
        ? "Loading"
        : comments.map((comment: Comment) => (
            <div key={comment.id} className="comment">
              <img src={comment.profilePicture} alt="" />
              <div className="info">
                <span>{comment.username}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
}

export default Comments;
