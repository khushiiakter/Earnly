import { Helmet } from "react-helmet-async";
import AboutUs from "../components/AboutUs";
import Banner from "../components/Banner";
import Membership from "../components/Membership";
import Testimonial from "../components/Testimonial";
import TopWorkers from "../components/TopWorkers";
import WhyUs from "../components/WhyUs";
import TopTasks from "../components/TopTasks";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home - Earnly</title>
      </Helmet>
      <div className="">
        <Banner></Banner>
      </div>
      <div className="container py-8 mx-auto md:px-4 px-2">
        <TopTasks></TopTasks>
      </div>
      <div className="container py-8 mx-auto md:px-4 px-2">
        <TopWorkers></TopWorkers>
      </div>
      <div className="container py-8 mx-auto md:px-3">
        <Testimonial></Testimonial>
      </div>
      <div className="container py-8 mx-auto md:px-3">
        <WhyUs></WhyUs>
      </div>
      <div className="container py-8 mx-auto md:px-3">
        <AboutUs></AboutUs>
      </div>
      <div className="container py-8 mx-auto md:px-3">
        <Membership></Membership>
      </div>
    </>
  );
};

export default Home;
