import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../pages/Login/login";
import SingUp from "../pages/SingUp/singUp";
import SingUpStepTwo from "../pages/SingUpStepTwo/singUpStepTwo";
import Home from "../pages/Home/home";
import Address from "../pages/Register/Address/Address";
import StoreManager from "../pages/Register/StoreManager/StoreManager";
import StoreInformation from "../pages/Register/StoreInformation/StoreInformation";
import Plans from "../pages/Register/Plans/Plans";

const Roots = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/home" />
      <Route element={<Login />} path="/login" />
      <Route element={<SingUp />} path="/singUp" />
      <Route element={<SingUpStepTwo />} path="/singUpStepTwo" />
      <Route element={<Address />} path="/registerAddress" />
      <Route element={<StoreManager />} path="/registerStoreManager" />
      <Route element={<StoreInformation />} path="/registerInformationStore" />
      <Route element={<Plans />} path="/registerPlans" />
    </Routes>
  );
};

export default Roots;
