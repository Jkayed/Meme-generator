const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());
const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:5173",
  clientID: "Minxcc64oERydDgmce3s8OH2OyAfiPEa",
  issuerBaseURL: "https://dev-p88xn0peuismpk5f.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

var connection = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Root123",
  database: process.env.SQL_PASS,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with unique name
  },
});

const upload = multer({ storage });

// Serve static files from the "uploads" directory
app.use("/uploads", express.static("uploads"));

app.post("/saveMeme", upload.single("memeImage"), async (req, res) => {
  const userID = req.body.userID;
  const file = req.file;
  const caption = req.body.caption;
  const userImage = req.body.userImage;

  if (!file) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  const imageURL = `${req.protocol}://${req.get("host")}/uploads/${
    file.filename
  }`;

  console.log("Received data:", userID, imageURL, caption); // Log received data

  connection.query(
    "INSERT INTO memes (userID, memeImage, caption, userImage) VALUES (?, ?, ?, ?)",
    [userID, imageURL, caption, userImage],
    (error, result) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).send({ error: "Database error" });
      }
      console.log("Meme saved successfully!");
      res.status(200).send({ message: "Meme saved successfully!" });
    }
  );
});

app.get("/getMemes", async (req, res) => {
  const user_id = req.query.user_id;
  connection.query(`SELECT * from memes`, async (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send({ error: "Database error" });
    }

    const memes = result;
    const memesWithDetails = await Promise.all(
      memes.map(async (meme) => {
        const likedByUser = await checkIfUserLikedMeme(meme.id, user_id);
        const likeCount = await getLikeCount(meme.id);
        return { ...meme, likedByUser, likeCount };
      })
    );

    res.send(memesWithDetails);
  });
});

const checkIfUserLikedMeme = async (memeId, userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM likes WHERE post_id = ? AND user_id = ?",
      [memeId, userId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.length > 0);
      }
    );
  });
};

const getLikeCount = async (memeId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT COUNT(*) AS likeCount FROM likes WHERE post_id = ?",
      [memeId],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        console.log(`Meme ID: ${memeId}, Like Count: ${result[0].likeCount}`);
        resolve(result[0].likeCount);
      }
    );
  });
};

app.post("/likeMeme", upload.none(), async (req, res) => {
  const post_id = req.body.post_id;
  const user_id = req.body.user_id;

  console.log("Meme liked:", post_id, user_id);

  connection.query(
    "INSERT INTO likes (post_id, user_id) VALUES (?, ?);",
    [post_id, user_id],
    (error, result) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).send({ error: "Database error" });
      }
      console.log("Meme liked successfully!");
      res.status(200).send({ message: "Meme liked successfully!" });
    }
  );
});

app.post("/unlikeMeme", upload.none(), async (req, res) => {
  const post_id = req.body.post_id;
  const user_id = req.body.user_id;

  console.log("Meme unliked:", post_id, user_id);

  connection.query(
    "DELETE FROM likes WHERE post_id = ? AND user_id = ?;",
    [post_id, user_id],
    (error, result) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).send({ error: "Database error" });
      }
      console.log("Meme unliked successfully!");
      res.status(200).send({ message: "Meme unliked successfully!" });
    }
  );
});

app.get("/likedPosts", upload.none(), async (req, res) => {
  const userID = req.body.user_id;
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT post_id FROM likes WHERE user_id = ?;",
      [userID],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.length > 0);
      }
    );
  });
});

app.delete("/deleteMeme/:id", async (req, res) => {
  const memeId = req.params.id;
  connection.query(
    "DELETE FROM memes WHERE id = ?",
    [memeId],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send({ error: "Database error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ error: "Meme not found" });
      }
      console.log("Meme deleted successfully!");
      res.status(200).send({ message: "Meme deleted successfully!" });
    }
  );
});
