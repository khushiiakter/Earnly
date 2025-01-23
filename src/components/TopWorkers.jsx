// import axios from "axios";
import { useEffect, useState } from "react";
import useAxiosPublic from "./hooks/useAxiosPublic";

const TopWorkers = () => {
    const [workers, setWorkers] = useState([]);
    const  axiosPublic = useAxiosPublic();
  useEffect(() => {
    const fetchTopWorkers = async () => {
      const response = await axiosPublic.get('/top-workers');
      setWorkers(response.data);
    };
    fetchTopWorkers();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-[#5f1a89] font-bold text-center mb-8">Top 6 Workers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {workers.map(worker => (
          <div className="card border p-4 text-center" key={worker._id}>
            <img src={worker.image} alt={worker.name} className="w-24 h-24 rounded-full mx-auto mb-2" />
            <h3 className="text-xl font-semibold">{worker.name}</h3>
            <p>Coins: {worker.coins}</p>
          </div>
        ))}
      </div>
    </div>
  );

};

export default TopWorkers;