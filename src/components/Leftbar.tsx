import Image from "../assets/pexels-giorgio-de-angelis-1413412.jpg";
import Row from "./Row";
import "./styles/leftbar.scss";
import { firstData, secondData, thirdData } from "./data";
import { useAppSelector } from "../app/hooks";

function Leftbar() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <Row
              image={
                user.profilePicture
                  ? `/upload/${user.profilePicture}`
                  : "/avatar.jpg"
              }
              text={user.username}
            />
          </div>

          <div className="item">
            {firstData.map((data) => (
              <Row image={data.image} text={data.text} key={data.text} />
            ))}
          </div>

          <hr />

          <div className="menu">
            <span>Your shortcuts</span>
            <div className="item">
              {secondData.map((data) => (
                <Row image={data.image} text={data.text} key={data.text} />
              ))}
            </div>
          </div>

          <hr />

          <div className="menu">
            <span>Others </span>
            <div className="item">
              {thirdData.map((data) => (
                <Row image={data.image} text={data.text} key={data.text} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leftbar;
