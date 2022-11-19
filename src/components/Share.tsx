import "./styles/share.scss";
import Image from "../assets/img.png";
import Place from "../assets/map.png";
import Friend from "../assets/friend.png";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { FormEvent, useState } from "react";
import { upload } from "../features/upload/uploadReducer";
import { createPost } from "../features/post/postReducer";

function Share() {
  const { user } = useAppSelector((state) => state.auth);

  const [file, setFile] = useState<File | null>(null);
  const [desc, setDesc] = useState("");

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (file) {
      const image = await upload(file);

      dispatch(createPost({ desc, image }));

      setDesc("");
      setFile(null);
    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img
              src={
                user.profilePicture
                  ? `/upload/${user.profilePicture}`
                  : "/avatar.jpg"
              }
              alt=""
            />
            <input
              type="text"
              placeholder={`What's on your mind ${user.username}`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files && e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Place} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleSubmit}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Share;
