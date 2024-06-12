import React from "react";
import UserHeader from "./UserHeader";
import { Routes, Route } from "react-router-dom";
import Feed from "../Feed/Feed";

const User = () => {
  return (
    <section className="container">
      <UserHeader />
      <p>Essa é a página do usuário</p>

      <Routes path="/" element={<Feed />} />
    </section>
  )
}

export default User;