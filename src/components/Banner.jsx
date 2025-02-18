import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiperOverrides.css"; 

// Import images
import img1 from "../assets/Ecommerce web page-amico.png";
import img2 from "../assets/Money income-amico.png";
import img3 from "../assets/Coins-amico.png";

const Banner = () => {
  return (
    <div className="relative w-full md:h-[73vh]">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="flex items-center md:flex-row flex-col md:justify-center h-full bg-gray-100">
            <div className="md:w-7/12 md:pl-20 text-center md:text-left">
              <h2 className="md:text-3xl text-2xl md:leading-tight md:text-[54px] font-extrabold text-[#0F1035]">
                Unlock Online Earning Potential
              </h2>
              <p className="md:text-base text-sm text-gray-600 md:w-2/3 mb-6 mt-2">
                Discover micro-task opportunities and start earning today with Earnly. Build your financial future one task at a time.
              </p>
              <button className="md:place-self-start place-self-center w-fit py-3 px-6 rounded-full text-white bg-[#5f1a89]  hover:bg-[#0F1035] font-semibold">
                Get Started
              </button>
            </div>
            <div className="w-5/12 md:h-[380px]">
              <img src={img1} alt="Earning Opportunity" className="h-full w-full object-contain" />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="flex items-center md:flex-row flex-col md:justify-center h-full bg-gray-100">
            <div className="md:w-7/12 md:pl-20 text-center md:text-left">
              <h2 className="text-3xl md:leading-tight md:text-[54px] font-extrabold text-[#0F1035]">
                Your Income, Your Control
              </h2>
              <p className="md:text-base text-sm text-gray-600 md:w-2/3 mb-6 mt-2">
                Experience a platform where your skills and effort define your success. Join thousands who are earning securely on Earnly.
              </p>
              <button className="md:place-self-start place-self-center w-fit py-3 px-6 rounded-full text-white bg-[#5f1a89]  hover:bg-[#0F1035]  font-semibold">
                Learn More
              </button>
            </div>
            <div className="md:w-5/12 md:h-[380px]">
              <img src={img2} alt="Income Control" className="h-full w-full object-contain" />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="flex items-center md:flex-row flex-col md:justify-center h-full bg-gray-100">
            <div className="md:w-7/12 md:pl-20 text-center md:text-left">
              <h2 className="text-3xl md:leading-tight md:text-[54px] font-extrabold text-[#0F1035]">
                Trusted User Reviews
              </h2>
              <p className="md:text-base text-sm text-gray-600 md:w-2/3 mb-6 mt-2">
                Discover honest feedback from verified users to make informed decisions about the services you choose.
              </p>
              <button className="md:place-self-start place-self-center w-fit py-3 px-6 rounded-full text-white bg-[#5f1a89]  hover:bg-[#0F1035]  font-semibold">
                Learn More
              </button>
            </div>
            <div className="md:w-5/12 md:h-[380px]">
              <img src={img3} alt="Trusted Reviews" className="h-full w-full object-contain" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
