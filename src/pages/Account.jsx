import React from "react";
import MainLayout from "../components/MainLayout";
import "../styles/Account.css";

const Account = () => {
  return (
    <MainLayout>
      <div className="account-container">
        <h2>Account Page</h2>
        <p>Manage your account settings here.</p>
      </div>
    </MainLayout>
  );
};

export default Account;
