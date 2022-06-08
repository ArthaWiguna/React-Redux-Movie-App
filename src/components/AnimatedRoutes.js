import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MovieHome from "../pages/MovieHome";
import MovieDetail from "../pages/MovieDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EditProfile from "../pages/EditProfile";

import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MovieHome />}></Route>
        <Route path="/MovieDetail/:id" element={<MovieDetail />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/EditProfile" element={<EditProfile />}></Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
