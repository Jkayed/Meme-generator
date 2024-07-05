import { useEffect, useState } from "react";
import "../App.css";
import { Divider } from "@nextui-org/react";
import axios from "axios";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getMemes", {
        responseType: "json",
      })
      .then(function (response) {
        setPosts(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error("Error response:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);
        } else if (error.request) {
          // Request was made but no response was received
          console.error("Error request:", error.request);
        } else {
          // Something happened in setting up the request
          console.error("Error message:", error.message);
        }
        console.error("Error config:", error.config);
      });
  }, []);

  return (
    <div className="posts-section">
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={post.memeImage} className="post-picture" alt="Meme" />
          <div>
            <p className="post-username">{post.userID}</p>
            <div className="line"></div>
          </div>
        </div>
      ))}
      ;
    </div>
  );
}

export default Feed;
