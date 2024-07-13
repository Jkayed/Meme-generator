import { useEffect, useState } from "react";
import "../css/App.css";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { AiFillLike } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";

function Feed() {
  const [posts, setPosts] = useState([]);
  const { user, isAuthenticated } = useAuth0();
  useEffect(() => {
    axios
      .get("http://localhost:3001/getMemes", {
        params: { user_id: isAuthenticated ? user.nickname : "" }, // Pass user_id to the backend
        responseType: "json",
      })
      .then(function (response) {
        setPosts(response.data);
      })
      .catch(function (error) {
        console.error("Error fetching memes:", error);
      });
  }, [user, isAuthenticated]);

  const likeMeme = async (id) => {
    try {
      const formData = new FormData();
      formData.append("post_id", id);
      formData.append("user_id", user.nickname);

      await axios.post("http://localhost:3001/likeMeme", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

 
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id
            ? { ...post, likedByUser: true, likeCount: post.likeCount + 1 }
            : post
        )
      );
    } catch (err) {
      console.error("Error liking meme:", err);
    }
  };

  const unlikeMeme = async (id) => {
    try {
      const formData = new FormData();
      formData.append("post_id", id);
      formData.append("user_id", user.nickname);

      await axios.post("http://localhost:3001/unlikeMeme", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update the like status locally after successful request
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id
            ? { ...post, likedByUser: false, likeCount: post.likeCount - 1 }
            : post
        )
      );
    } catch (err) {
      console.error("Error unliking meme:", err);
    }
  };

  const handleLikeButtonClick = (post) => {
    if (post.likedByUser) {
      unlikeMeme(post.id);
    } else {
      likeMeme(post.id);
    }
  };

  return (
    <>
      <header className="page-header">Feed</header>
      <div className="posts-section">
        {posts.map((post) => (
          <div
            style={{ backgroundColor: "white" }}
            className="post"
            key={post.id}
          >
            <div>
              <div className="user-info">
                {post.userImage != null ? (
                  <img src={post.userImage} className="post-profile-picture" />
                ) : (
                  <CgProfile className="post-profile-picture-icon" />
                )}

                <p className="post-username">{post.userID}</p>
              </div>
              <p className="meme-posted">New meme posted!</p>
              <p className="caption">{post.caption}</p>
            </div>
            <img src={post.memeImage} className="post-picture" alt="Meme" />
            {isAuthenticated ? (
              <div style={{ display: "flex" }}>
                <>
                  <AiFillLike
                    className="like-button"
                    style={{ color: post.likedByUser ? "#32CD32" : "black" }} // Change color based on like status
                    onClick={() => handleLikeButtonClick(post)}
                  />
                  <p className="like-count">{post.likeCount}</p>{" "}
                </>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Feed;
