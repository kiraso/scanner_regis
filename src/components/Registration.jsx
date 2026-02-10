import React from "react";
import Signup from "./Signup"; // ✅ default import
import logo from "../assets/logo_supcan.png";

const Registration = () => {
  return (
    <div className="px-4 max-w-7xl mx-auto lg:space-x-20 flex justify-center items-center h-screen">
      {/* ===== FORM ===== */}
      <div className="lg:w-[40%] w-full">
        <Signup />
      </div>

      {/* ===== IMAGE ===== */}
      <div className="w-1/2 hidden lg:block">
        <img
            className="
              rounded-2xl
              shadow-6xl
              transition
              duration-300
              hover:shadow-2xl  
            "
          src={logo}
          alt="side visual"
        />
      </div>
    </div>
  );
};

export default Registration;
