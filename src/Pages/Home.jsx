import AboutUs from "../components/AboutUs";
import Banner from "../components/Banner";
import Testimonial from "../components/Testimonial";
import TopWorkers from "../components/TopWorkers";
import WhyUs from "../components/WhyUs";

const Home = () => {
  return (
    <>
      <div className="">
        <Banner></Banner>

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

      
    </>
  );
};

export default Home;
