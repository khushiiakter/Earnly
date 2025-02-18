import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { Link } from "react-router-dom";

const TopTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://earnly-server.vercel.app/top-tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);
  return (
    <div>
      <h1 className="text-4xl  font-bold text-center mt-7 mb-12">
        High-Paying Tasks
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pb-5 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task}></TaskCard>
        ))}
      </div>
      <div className="flex mt-5 justify-center"> 
        <Link
          to="/dashboard/tasks"
          className="md:py-2 py-3 px-6 mr-2  text-sm md:text-xl text-white font-semibold bg-[#5f1a89]  hover:bg-[#0F1035] rounded-lg md:px-5  hover:border-white "
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default TopTasks;
