import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/post.scss";
import Comments from "./Comments";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getLike, createLike, deleteLike } from "../features/like/likeReducer";
import { deletePost } from "../features/post/postReducer";

function Post({ post }: any) {
  const [commentOpen, setCommentOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [likes, setLikes] = useState<string[]>();
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.likes);
  const [updateLike, setUpdateLike] = useState(false);

  useEffect(() => {
    const getLikes = async () => {
      setLikes(await getLike(post.id));
    };
    getLikes();

    return () => {
      setUpdateLike(false);
    };
  }, [updateLike]);

  const handleDelete = (postId: any) => {
    dispatch(deletePost(postId));
  };

  const handleLike = (postId: any) => {
    if (likes?.includes(user.id)) dispatch(deleteLike(postId));

    dispatch(createLike({ postId }));
    setUpdateLike(true);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={
                post.profilePicture
                  ? `/upload/${post.profilePicture}`
                  : "/avatar.jpg"
              }
              alt=""
            />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.username}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>

          {post.userId === user.id && (
            <MdOutlineMoreHoriz
              style={{ cursor: "pointer" }}
              onClick={() => setMenuOpen(!menuOpen)}
            />
          )}

          {menuOpen && post.userId === user.id && (
            <button
              className="delete-button"
              type="button"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={`/upload/${post.image}`} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading "
            ) : likes?.includes(user.id) ? (
              <AiFillHeart
                onClick={() => handleLike(post.id)}
                style={{ color: "red" }}
              />
            ) : (
              <AiOutlineHeart onClick={() => handleLike(post.id)} />
            )}
            {likes && likes.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <RiMessage2Line />
            12 comments
          </div>
          <div className="item">
            <AiOutlineShareAlt />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
}

export default Post;
