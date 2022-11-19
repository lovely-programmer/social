import {
  MdOutlineHome,
  MdOutlineApps,
  MdOutlineSearch,
  MdOutlineNotificationsNone,
  MdPersonOutline,
} from "react-icons/md";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./styles/navbar.scss";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  setDarkMode,
  setLightMode,
} from "../features/darkMode/darkModeReducer";

function Navbar() {
  const { darkMode } = useAppSelector((state) => state.darkMode);
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/">
          <span>Web Social</span>
        </Link>
        <MdOutlineHome />
        {darkMode ? (
          <HiOutlineSun
            onClick={() => dispatch(setDarkMode(false))}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <HiOutlineMoon
            onClick={() => dispatch(setLightMode(true))}
            style={{ cursor: "pointer" }}
          />
        )}
        <MdOutlineApps />

        <div className="search">
          <MdOutlineSearch />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="right">
        <MdPersonOutline />
        <AiOutlineMail />
        <MdOutlineNotificationsNone />
        <div className="user">
          <img
            src={
              user.profilePicture
                ? `/upload/${user.profilePicture}`
                : "/avatar.jpg"
            }
            alt=""
          />
          <span>{user.username}</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
