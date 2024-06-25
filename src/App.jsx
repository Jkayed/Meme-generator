import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import Feed from "../src/routes/Feed.jsx";
import CreateMeme from "./routes/CreateMeme.jsx";
import Profile from "./routes/Profile.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout.jsx";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/feed" element={<Feed />} />
          <Route path="/creatememe" element={<CreateMeme />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}
