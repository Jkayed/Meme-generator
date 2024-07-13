import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "../css/profile.css";
function UserPosts() {
  const { user } = useAuth0();
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
          console.error("Error response:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
        console.error("Error config:", error.config);
      });
  }, []);

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deleteMeme/${id}`);

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div className="profile-posts-section">
      <h5 className="posts-label">Your posts</h5>
      {posts.map((post) =>
        user.nickname == post.userID ? (
          <div className="post" key={post.id}>
            <div>
              <div className="user-info">
                {post.userImage != null ? (
                  <img src={post.userImage} className="post-profile-picture" />
                ) : (
                  <CgProfile className="post-profile-picture-icon" />
                )}

                <p className="post-username">{user.nickname}</p>
                {/* <div className="line"></div> */}
              </div>
              <p className="meme-posted">New meme posted!</p>
              <p className="caption">{post.caption}</p>
            </div>
            <img src={post.memeImage} className="post-picture" alt="Meme" />

            <button className="like-button" onClick={() => deletePost(post.id)}>
              Delete post
            </button>
          </div>
        ) : (
          ""
        )
      )}
    </div>
  );
}

export default UserPosts;
