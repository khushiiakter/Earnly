import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";

const Tasks = () => {
    const tasks = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    const uniqueCategories = [
      "All",
      ...new Set(tasks.map((task) => task.taskTitle || "Uncategorized")),
    ];
    setCategories(uniqueCategories);
  }, [tasks]);

  
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.taskTitle
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || task.taskTitle === selectedCategory;
    const hasWorkers = task.requiredWorkers > 0;

    return matchesSearch && matchesCategory && hasWorkers;
  });

  // Sort tasks based on price
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    return sortOrder === "asc" ? a.payableAmount - b.payableAmount : b.payableAmount - a.payableAmount;
  });

  return (
    <section className="container py-12 mx-auto md:px-4  px-2">
      <h1 className="text-3xl font-bold mb-6">All Tasks</h1>

      {/* Search, Category Filter & Sorting */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#5f1a89]"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 w-1/3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#5f1a89]"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 w-1/3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#5f1a89]"
        >
          <option value="asc">Sort by Price: Low to High</option>
          <option value="desc">Sort by Price: High to Low</option>
        </select>
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
        {sortedTasks.length === 0 && (
          <p className="text-gray-500 col-span-full">
            No tasks found matching your criteria.
          </p>
        )}
      </div>
    </section>
  );
};

export default Tasks;