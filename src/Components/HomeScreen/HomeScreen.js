import React from "react";
import Banner from "../Banner/Banner";
import Navbar from "../Navbar/Navbar";
import "./HomeScreen.css";

function HomeScreen() {
  return (
    <div className="homeScreen">
      {/* navbar */}
      <Navbar />

      {/* banner */}
      <Banner />

      {/* rows of shows */}
    </div>
  );
}

export default HomeScreen;
