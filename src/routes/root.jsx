import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../pages/Login/login";
import SingUp from "../pages/SingUp/singUp";
import SingUpStepTwo from "../pages/SingUpStepTwo/singUpStepTwo";
import Home from "../pages/Home/home";
import Address from "../pages/Register/Address/Address";

const Roots = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/home" />
      <Route element={<Login />} path="/login" />
      <Route element={<SingUp />} path="/singUp" />
      <Route element={<SingUpStepTwo />} path="/singUpStepTwo" />
      <Route element={<Address/>} path="/registerAddress" />
    </Routes>
  );
};

export default Roots;
