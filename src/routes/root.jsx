import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../pages/Login/login";
import SingUp from "../pages/SingUp/singUp";
import Home from "../pages/Home/home";
import Address from "../pages/Register/Address/Address";
import StoreManager from "../pages/Register/StoreManager/StoreManager";
import StoreInformation from "../pages/Register/StoreInformation/StoreInformation";
import Plans from "../pages/Register/Plans/Plans";
import RegisterService from "../pages/RegisterService/RegisterService";
import MinhaAgenda from "../pages/MinhaAgenda/MinhaAgenda";

const Roots = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Home />} path="/home" />
      <Route element={<Login />} path="/login" />
      <Route element={<SingUp />} path="/singUp" />
      <Route element={<Address />} path="/registerAddress" />
      <Route element={<StoreManager />} path="/registerStoreManager" />
      <Route element={<StoreInformation />} path="/registerInformationStore" />
      <Route element={<Plans />} path="/registerPlans" />
      <Route element={<RegisterService />} path="/registerServices" />
      <Route element={<MinhaAgenda/>} path="/minhaAgenda"/>
    </Routes>
  );
};
            
export default Roots;
