import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import images
import img1 from "../assets/Ecommerce web page-amico.png";
import img2 from "../assets/Money income-amico.png";
import img3 from "../assets/Coins-amico.png";

const Banner = () => {
  return (
    <div className="relative w-full h-[73vh]">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="w-1/2 pl-10">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                Unlock Online Earning Potential
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Discover micro-task opportunities and start earning today with
                Earnly. Build your financial future one task at a time.
              </p>
              <button className="btn bg-blue-600 text-white px-6 py-2 rounded-md">
                Get Started
              </button>
            </div>
            <div className="w-1/2 md:h-[560px]">
              <img
                src={img1}
                alt="Earning Opportunity"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="w-1/2 pl-10">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                Your Income, Your Control
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Experience a platform where your skills and effort define your
                success. Join thousands who are earning securely on Earnly.
              </p>
              <button className="btn bg-blue-600 text-white px-6 py-2 rounded-md">
                Learn More
              </button>
            </div>
            <div className="w-1/2 md:h-[560px]">
              <img
                src={img2}
                alt="Income Control"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="w-1/2 pl-10">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                Trusted User Reviews
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Discover honest feedback from verified users to make informed
                decisions about the services you choose.
              </p>
              <button className="btn bg-blue-600 text-white px-6 py-2 rounded-md">
                Learn More
              </button>
            </div>
            <div className="w-1/2 md:h-[560px]">
              <img
                src={img3}
                alt="Trusted Reviews"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;