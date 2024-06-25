import "../App.css";
import { Divider } from "@nextui-org/react";
import logo from "../assets/react.svg";
function Feed() {
  return (
    <div className="post">
      <img src={logo} className="post-picture" />
      <div>
        {" "}
        <p className="post-username">JamalKayed123</p>
        <div className="line"></div>
      </div>
    </div>
  );
}

export default Feed;
