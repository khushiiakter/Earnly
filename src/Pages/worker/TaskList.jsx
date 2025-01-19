import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import TaskCard from "../../components/TaskCard";


const TaskList = () => {
  const tasks = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    const uniqueCategories = [
      "All",
      ...new Set(tasks.map((task) => task.taskTitle || "Uncategorized")),
    ];
    setCategories(uniqueCategories);
  }, [tasks]);

  // Filter tasks based on search term, category, and required_workers
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = 
    task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase());
    

    const matchesCategory = selectedCategory === "All" || task.taskTitle === selectedCategory;
    const hasWorkers = task.requiredWorkers > 0;

    return matchesSearch && matchesCategory && hasWorkers;
  });

  return (
    <section className=" py-8  md:px-3">
     
      <h1 className="text-3xl font-bold mb-6">All Tasks</h1>

      {/* Search and Category Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-2/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 w-1/3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
        {filteredTasks.length === 0 && (
          <p className="text-gray-500 col-span-full">
            No tasks found matching your criteria.
          </p>
        )}
      </div>
    </section>
  );
};

export default TaskList;
