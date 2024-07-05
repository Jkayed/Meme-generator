import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import Feed from "./routes/Feed.jsx";
import CreateMeme from "./routes/CreateMeme.jsx";
import Profile from "./routes/Profile.jsx";
import Sidebar from "./layout/Sidebar.jsx";
import Auth0ProviderWithHistory from "./authentication/auth0Provider.jsx";
export default function App() {
  return (
    <Auth0ProviderWithHistory>
      <Router>
        <Routes>
          <Route path="/" element={<Sidebar />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />
            <Route path="creatememe" element={<CreateMeme />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </Auth0ProviderWithHistory>
  );
}
