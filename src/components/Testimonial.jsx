import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import profile from "../assets/blank-profile-picture-973460_640.png";
import axios from "axios";

const defaultTestimonials = [
  {
    image: `${profile}`,
    name: "John Doe",
    quote: "This platform has transformed the way I work. Highly recommend!",
    rating: 5.0,
  },
  {
    image: `${profile}`,
    name: "Jane Smith",
    quote: "The ease of use and support is just amazing.",
    rating: 4.8,
  },
  {
    image: `${profile}`,
    name: "Michael Johnson",
    quote: "Great experience! Helped me earn while learning new skills.",
    rating: 4.9,
  },
];

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl text-[#5f1a89] font-extrabold text-center mb-8">
        What Our Users Say
      </h2>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation
        className="pb-12"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-100 shadow-lg rounded-xl p-6 text-center flex flex-col items-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full border-4 border-[#5f1a89] mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {testimonial.name}
              </h3>
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <span className="text-yellow-400 text-2xl mr-2">⭐</span>
                <span className="text-yellow-400 text-lg font-bold">
                  {testimonial.rating}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
