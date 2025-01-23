import { Outlet } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { Helmet } from "react-helmet-async";


const MainLayouts = () => {
  return (
    
      <div className="bg-white">
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
