import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../pages/Login/login";
import SingUp from "../pages/SingUp/singUp";
import Home from "../pages/Home/home";
import Address from "../pages/Register/Address/Address";
import StoreManager from "../pages/Register/StoreManager/StoreManager";
import RegisterService from "../pages/RegisterService/RegisterService";
import MinhaAgenda from "../pages/MinhaAgenda/MinhaAgenda";
import MeusAgendamentos from "../pages/MeusAgendamentos/MeusAgendamentos";
import Feedbacks from "../pages/Feedbacks/Feedbacks";
import MyProfile from "../pages/MyProfile/MyProfile";

const Roots = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Home />} path="/home" />
      <Route element={<Login />} path="/login" />
      <Route element={<SingUp />} path="/singUp" />
      <Route element={<Address />} path="/registerAddress" />
      <Route element={<StoreManager />} path="/registerStoreManager" />
      <Route element={<RegisterService />} path="/registerServices" />
      <Route element={<MinhaAgenda />} path="/minhaAgenda" />
      <Route element={<MeusAgendamentos />} path="/meusAgendamentos" />
      <Route element={<Feedbacks />} path="/meusFeedbacks" />
      <Route element={<MyProfile />} path="/myProfile" />
    </Routes>
  );
};

export default Roots;
