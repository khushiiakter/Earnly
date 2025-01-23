import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddNewTasks = () => {
  const { user, coins, setCoins } = useContext(AuthContext);
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

  const handleAddTask = async (e) => {
    e.preventDefault();

    const imageFile = e.target.image.files[0]; // Get the file from input
    if (!imageFile) {
      Swal.fire({
        title: "Error!",
        text: "Please select an image for the task.",
        icon: "error",
      });
      return;
    }

    const formDataImage = new FormData();
    formDataImage.append("image", imageFile);

    try {
      // Upload image to imgbb
      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formDataImage,
      });
      const data = await response.json();

      if (data.success) {
        const imageUrl = data.data.url; // Get the image URL
        const totalPayableAmount =
          parseInt(formData.requiredWorkers) * parseInt(formData.payableAmount);

        if (totalPayableAmount > coins) {
          Swal.fire({
            title: "Insufficient Coins",
            text: "Not enough coins. Please purchase more coins to proceed.",
            icon: "error",
          });
          navigate("/dashboard/purchaseCoin");
          return;
        }

        const newTask = {
          ...formData,
          taskImageUrl: imageUrl,
          totalPayableAmount,
          userEmail: user?.email,
          addedDate: new Date().toISOString().split("T")[0],
        };

        // Save task to the database
        const res = await fetch("https://earnly-server.vercel.app/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        });
        const result = await res.json();

        if (result.insertedId) {
          setCoins((prevCoins) => prevCoins - totalPayableAmount);
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
          navigate("/dashboard/myTasks");
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to add task. Please try again.",
            icon: "error",
          });
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "Image upload failed. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong during image upload.",
        icon: "error",
      });
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <Helmet>
        <title>Earnly - Add New Task</title>
      </Helmet>
      <div className="bg-white shadow-lg mt-5 mb-10 rounded-lg w-full max-w-3xl px-8 py-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add New Task ({coins} Coins Available)
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
            <label className="block font-medium text-gray-700">
              Completion Date
            </label>
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
            <label className="block font-medium text-gray-700">
              Submission Info
            </label>
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
            <label className="block font-medium text-gray-700">
              Task Image
            </label>
            <input
              type="file"
              name="image"
              className="file-input file-input-bordered w-full"
              required
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
