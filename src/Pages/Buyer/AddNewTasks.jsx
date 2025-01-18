
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const AddNewTasks = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    taskTitle: "",
    taskDetails: "",
    requiredWorkers: "",
    payableAmount: "",
    completionDate: "",
    submissionInfo: "",
    taskImageUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    const totalPayableAmount =
      parseInt(formData.requiredWorkers) * parseInt(formData.payableAmount);

    
    // const userCoins = 100; 

    if (totalPayableAmount > userCoins) {
      Swal.fire({
        title: "Insufficient Coins",
        text: "Not enough coins. Please purchase more coins to proceed.",
        icon: "error",
      });
      navigate("/purchaseCoin"); // Navigate to the coin purchase page
      return;
    }

    const newTask = {
      ...formData,
      totalPayableAmount,
      userEmail: user?.email,
      addedDate: new Date().toISOString(),
    };

    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Task added successfully.",
            icon: "success",
          });
          setFormData({
            taskTitle: "",
            taskDetails: "",
            requiredWorkers: "",
            payableAmount: "",
            completionDate: "",
            submissionInfo: "",
            taskImageUrl: "",
          });
          navigate("/dashboard/tasks"); // Navigate to tasks or dashboard page
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to add task. Please try again.",
            icon: "error",
          });
        }
      });
  };




  return (
    <div className="flex items-center justify-center bg-gray-100">
      
      <div className="bg-white shadow-lg mt-5 mb-10 rounded-lg w-full max-w-3xl px-8 py-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add New Task
        </h2>
        <form onSubmit={handleAddTask} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700">Task Title</label>
            <input
              type="text"
              name="taskTitle"
              value={formData.taskTitle}
              onChange={handleInputChange}
              required
              placeholder="Enter task title"
              className="w-full px-3 py-2 border rounded shadow"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Task Details</label>
            <textarea
              name="taskDetails"
              value={formData.taskDetails}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Enter task details"
              className="w-full px-3 py-2 border rounded shadow"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">
                Required Workers
              </label>
              <input
                type="number"
                name="requiredWorkers"
                value={formData.requiredWorkers}
                onChange={handleInputChange}
                required
                placeholder="Enter number of workers"
                className="w-full px-3 py-2 border rounded shadow"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Payable Amount (per worker)
              </label>
              <input
                type="number"
                name="payableAmount"
                value={formData.payableAmount}
                onChange={handleInputChange}
                required
                placeholder="Enter payable amount"
                className="w-full px-3 py-2 border rounded shadow"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium text-gray-700">Completion Date</label>
            <input
              type="date"
              name="completionDate"
              value={formData.completionDate}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded shadow"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Submission Info</label>
            <input
              type="text"
              name="submissionInfo"
              value={formData.submissionInfo}
              onChange={handleInputChange}
              required
              placeholder="Enter submission details (e.g., screenshot)"
              className="w-full px-3 py-2 border rounded shadow"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Task Image URL</label>
            <input
              type="url"
              name="taskImageUrl"
              value={formData.taskImageUrl}
              onChange={handleInputChange}
              placeholder="Enter task image URL"
              className="w-full px-3 py-2 border rounded shadow"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 w-full px-4 rounded-md shadow"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewTasks;
