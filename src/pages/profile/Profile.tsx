import LayoutWrapper from "../../components/LayoutWrapper";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./profile.scss";
import Update from "../../components/Update";
import {
  MdOutlineEmail,
  MdMoreVert,
  MdFacebook,
  MdPlace,
  MdOutlineLanguage,
} from "react-icons/md";
import {
  AiFillLinkedin,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import Posts from "../../components/Posts";
import { useEffect, useState } from "react";
import { ProfileUser } from "../../types.d";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  createRelationship,
  deleteRelationship,
  getRelationships,
  reset,
} from "../../features/relationship/relationshipReducer";

function Profile() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { relationships, isUpdating } = useAppSelector(
    (state) => state.relationships
  );

  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useAppDispatch();

  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const [data, setData] = useState<ProfileUser>();

  const getUser = async () => {
    const API_URL = "http://localhost:5000/api/users/find/";

    const response = await axios.get(API_URL + userId, {
      withCredentials: true,
    });

    setData(response.data);
  };

  useEffect(() => {
    getUser();
    dispatch(getRelationships(userId));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isUpdating, isSuccess]);

  const handleFollow = () => {
    if (relationships?.includes(user?.id)) dispatch(deleteRelationship(userId));

    dispatch(createRelationship({ userId }));
  };

  return (
    <LayoutWrapper>
      <div className="profile">
        <div className="images">
          <img
            src={
              data?.coverPicture
                ? `/upload/${data?.coverPicture}`
                : "/cover_default123.png"
            }
            alt=""
            className="cover"
          />
          <img
            src={data?.profilePicture ? `/upload/${data?.profilePicture}` : "/avatar.jpg"}
            alt=""
            className="profilePic"
          />
        </div>

        <div className="profileContainer">
          <div className="uInfo">
            <div className="left">
              <a href="http://facebook.com">
                <MdFacebook fontSize="large" />
              </a>
              <a href="http://instagram.com">
                <AiOutlineInstagram fontSize="large" />
              </a>
              <a href="http://twitter.com">
                <AiOutlineTwitter fontSize="large" />
              </a>
              <a href="http://linkin.com">
                <AiFillLinkedin fontSize="large" />
              </a>
            </div>

            <div className="center">
              <span>{data?.username}</span>

              <div className="info">
                <div className="item">
                  <MdPlace />
                  <span>{data?.city}</span>
                </div>

                <div className="item">
                  <MdOutlineLanguage />
                  <span>{data?.website}</span>
                </div>
              </div>

              {userId === user?.id ? (
                <button onClick={() => setOpenUpdate(true)}>Update</button>
              ) : (
                <button onClick={handleFollow}>
                  {relationships.includes(user?.id) ? "Following" : "Follow"}
                </button>
              )}
            </div>

            <div className="right">
              <MdOutlineEmail />
              <MdMoreVert />
            </div>
          </div>
        </div>

        <Posts userId={userId} />
        {openUpdate && (
          <Update
            setOpenUpdate={setOpenUpdate}
            user={user}
            setIsSuccess={setIsSuccess}
          />
        )}
      </div>
    </LayoutWrapper>
  );
}

export default Profile;
