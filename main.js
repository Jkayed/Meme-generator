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
  database: "memeapp",
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

  if (!file) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  const imageURL = `${req.protocol}://${req.get("host")}/uploads/${
    file.filename
  }`;

  console.log("Received data:", userID, imageURL); // Log received data

  connection.query(
    "INSERT INTO memes (userID, memeImage) VALUES (?, ?)",
    [userID, imageURL],
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
  connection.query(`SELECT * from memes`, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send({ error: "Database error" });
    }
    res.send(result);
  });
});
app.use(auth(config));
