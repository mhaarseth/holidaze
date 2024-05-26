import { Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "./components/Layout/Layout.jsx";
import Booking from "./pages/Booking/index.jsx";
import CreateVenue from "./pages/CreateVenue/index.jsx";
import EditProfile from "./pages/EditProfile/index.jsx";
import EditVenue from "./pages/EditVenue/index.jsx";
import Home from "./pages/Home/index.jsx";
import Login from "./pages/Login/index.jsx";
import Profile from "./pages/Profile/index.jsx";
import Register from "./pages/Register/index.jsx";
import Venue from "./pages/Venue/index.jsx";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/createvenue" element={<CreateVenue />} />
          <Route path="/editprofile/:id" element={<EditProfile />} />
          <Route path="/editvenue/:id" element={<EditVenue />} />
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/venue/:id" element={<Venue />} />
        </Route>
      </Routes>
    </div>
  );
}
