import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./routes/Feed.jsx";
import CreateMeme from "./routes/CreateMeme.jsx";
import Profile from "./routes/Profile.jsx";
import Sidebar from "./layout/Sidebar.jsx";
import Auth0ProviderWithHistory from "./authentication/auth0Provider.jsx";
import RequireAuth from "./routes/RequireAuth.jsx";

export default function App() {
  return (
    <>
      <Auth0ProviderWithHistory>
        <Router>
          <Routes>
            <Route path="/" element={<Sidebar />}>
              <Route index element={<Feed />} />
              <Route path="feed" element={<Feed />} />
              <Route
                path="creatememe"
                element={
                  <RequireAuth>
                    <CreateMeme />
                  </RequireAuth>
                }
              />
              <Route
                path="profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
            </Route>
          </Routes>
        </Router>
      </Auth0ProviderWithHistory>
    </>
  );
}
