import { Outlet } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { Helmet } from "react-helmet-async";
// import { useEffect } from "react";

// import "../../src/index.css";
const MainLayouts = () => {
  // useEffect(() => {
  //   const darkModeEnabled = localStorage.getItem("darkMode") === "true";
  //   if (darkModeEnabled) {
  //     document.body.classList.add("dark-mode");
  //   } else {
  //     document.body.classList.remove("dark-mode");
  //   }
  // }, []);
  return (
    
      <div className="">
        <Helmet>
          <title>Earnly</title>
        </Helmet>
        <section className="w-full fixed z-20 backdrop-blur-lg ">
          <Navbar></Navbar>
        </section>

        <div className="pt-[68px] min-h-screen">
          <Outlet />
        </div>
        <Footer></Footer>
        <Toaster />
      </div>
   
  );
};

export default MainLayouts;
