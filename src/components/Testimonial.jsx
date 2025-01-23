import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useAxiosPublic from "./hooks/useAxiosPublic";

import profile from "../assets/blank-profile-picture-973460_640.png"

const testimonials = [
    {
      image: `${profile}`,
      name: 'John Doe',
      quote: 'This platform has transformed the way I work. Highly recommend!'
    },
    {
      image:`${profile}`,
      name: 'Jane Smith',
      quote: 'The ease of use and support is just amazing.'
    },
    {
      image:`${profile}`,
      name: 'Michael Johnson',
      quote: 'Great experience! Helped me earn while learning new skills.'
    }
];

const Testimonial = () => {
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        const fetchTopWorkers = async () => {
            const response = await useAxiosPublic.get('/top-workers');
            setWorkers(response.data);
        };
        fetchTopWorkers();
    }, []);

    return (
        <div className="container mx-auto p-4">
           
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
                {workers.map(worker => (
                    <div className="card border p-4 text-center" key={worker._id}>
                        <img src={worker.image} alt={worker.name} className="w-24 h-24 rounded-full mx-auto mb-2" />
                        <h3 className="text-xl font-semibold">{worker.name}</h3>
                        <p>Coins: {worker.coins}</p>
                    </div>
                ))}
            </div>

            <section className="text-white  px-6">
                <h2 className="text-4xl text-[#5f1a89] font-extrabold text-center my-6">
                    Testimonial
                </h2>
                
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    autoplay={{ delay: 3000 }}
                    pagination={{ clickable: true }}
                    navigation
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
                                <div className="mb-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-16 h-16 mx-auto rounded-full border-2"
                                    />
                                </div>
                                <h3 className="text-lg font-bold">{testimonial.name}</h3>
                                <p className="text-sm text-gray-400">User</p>
                                <div className="flex justify-center items-center my-4">
                                    <span className="text-yellow-400 text-lg mr-2">⭐</span>
                                    <span className="text-yellow-400 font-bold">5.0</span>
                                </div>
                                <p className="text-sm text-gray-300">{testimonial.quote}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </div>
    );
};

export default Testimonial;