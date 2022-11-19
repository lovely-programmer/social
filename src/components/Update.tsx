import "./styles/update.scss";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { upload } from "../features/upload/uploadReducer";
import { useAppDispatch } from "../app/hooks";
import { ProfileUser } from "../types.d";
import { updateUser } from "../features/user/userReducer";

function Update({
  setOpenUpdate,
  user,
  setIsSuccess,
}: {
  setOpenUpdate: any;
  user: ProfileUser;
  setIsSuccess: any;
}) {
  const [cover, setCover] = useState<File | null>(null);
  const [profile, setProfile] = useState<File | null>(null);

  const [input, setInput] = useState({
    username: user.username,
    city: user.city,
    website: user.website,
  });

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const c = cover ? await upload(cover) : user.coverPicture;
    const p = profile ? await upload(profile) : user.profilePicture;

    dispatch(updateUser({ ...input, coverPicture: c, profilePicture: p }));

    setIsSuccess(true);
    setOpenUpdate(false);
  };

  return (
    <div className="update">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="cover">Cover Image</label>
          <input
            id="cover"
            type="file"
            name=""
            onChange={(e) => setCover(e.target.files && e.target.files[0])}
          />
          <label htmlFor="profile">Profile Image</label>
          <input
            id="profile"
            type="file"
            name=""
            onChange={(e) => setProfile(e.target.files && e.target.files[0])}
          />
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="city"
            onChange={handleChange}
          />
          <input
            type="text"
            name="website"
            placeholder="website"
            onChange={handleChange}
          />
          <button>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          &#10005;
        </button>
      </div>
    </div>
  );
}

export default Update;
