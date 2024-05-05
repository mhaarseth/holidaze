import { Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "./components/Layout/Layout.js";
import CreateVenue from "./pages/CreateVenue/index.js";
import EditProfile from "./pages/EditProfile/index.js";
import EditVenue from "./pages/EditVenue/index.js";
import Home from "./pages/Home/index.jsx";
import Login from "./pages/Login/index.js";
import Profile from "./pages/Profile/index.js";
import Register from "./pages/Register/index.jsx";
import RouteNotFound from "./pages/RouteNotfound/index.js";
import UpcomingBookings from "./pages/UpcomingBookings/index.js";
import Venue from "./pages/Venue/index.js";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/createvenue" element={<CreateVenue />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/editvenue" element={<EditVenue />} />
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<RouteNotFound />} />
          <Route path="/upcomingbookings" element={<UpcomingBookings />} />
          <Route path="/venue" element={<Venue />} />
        </Route>
      </Routes>
    </div>
  );
}
