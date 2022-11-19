import "./styles/rightbar.scss";

function Rightbar() {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggested For You</span>
          <div className="user">
            <div className="userInfo">
              <img src="" alt="" />
              <span>Jane Doe</span>
            </div>

            <div className="buttons">
              <button>follow</button>
              <button>Dismiss</button>
            </div>
          </div>

          <div className="user">
            <div className="userInfo">
              <img src="" alt="" />
              <span>Jane Doe</span>
            </div>

            <div className="buttons">
              <button>follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>

        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img src="" alt="" />
              <p>
                <span>Jane Doe</span> changed their profile picture
              </p>
            </div>
            <span>1 minute ago</span>
          </div>

          <div className="user">
            <div className="userInfo">
              <img src="" alt="" />
              <p>
                <span>Jane Doe</span> changed their profile picture
              </p>
            </div>
            <span>1 minute ago</span>
          </div>
        </div>

        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img src="" alt="" />
              <div className="online"></div>
              <span>Jane Doe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rightbar;
