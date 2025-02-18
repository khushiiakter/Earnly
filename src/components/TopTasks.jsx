import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";


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
        Feature Task
      </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pb-5 gap-4'>
            {
                tasks.map(task => <TaskCard key={task._id} task={task}></TaskCard>)
            }
        </div>
    </div>
);
};

export default TopTasks;