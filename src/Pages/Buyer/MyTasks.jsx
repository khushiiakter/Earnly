import { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
// import { Helmet } from "react-helmet-async";

const MyTasks = () => {
  const { user,coins, setCoins  } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch tasks in descending order of compilation date
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure
      .get(`/tasks?email=${user?.email}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setTasks(
            res.data.sort(
              (a, b) => new Date(b.completionDate) - new Date(a.completionDate)
            )
          );
        } else {
          console.error("Invalid data format:", res.data);
          setTasks([]);
        }
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [user?.email]);

  // Open modal to update task
  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  // Handle task update
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedTask = {
      taskTitle: form.taskTitle.value,
      taskDetails: form.taskDetails.value,
      submissionInfo: form.submissionInfo.value,
      
      payableAmount: form.payableAmount.value,
      requiredWorkers: form.requiredWorkers.value,
      completionDate: form.completionDate.value,
      taskImageUrl: form.taskImageUrl.value,
    };

    axiosSecure.put(`/tasks/${selectedTask._id}`, updatedTask)
      .then((res) => {
        if (res.data.success) {
          toast.success("Task updated successfully!");
          setTasks((prev) =>
            prev.map((task) =>
              task._id === selectedTask._id ? { ...task, ...updatedTask } : task
            )
          );

          axiosSecure.get(`/users/${user.email}`)
          .then((res) => {
            setCoins(res.data.coins);
          })
          .catch((err) => console.error("Error fetching updated user data:", err));


          closeModal();
        } else {
          toast.error("Failed to update the task.");
        }
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  // Handle task deletion
    const handleDelete = (task) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/tasks/${task._id}`)
            .then((res) => {
              if (res.data.success) {
                Swal.fire("Deleted!", "Your task has been deleted.", "success");
                setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));

                if (!task.isCompleted) {
                  const refillAmount = task.requiredWorkers * task.payableAmount;
                 setCoins((prevCoins) => prevCoins + refillAmount);
                }
              } else {
                Swal.fire("Error!", "Failed to delete task.", "error");
              }
            })
            .catch((err) => console.error("Error deleting task:", err));
        }
      });
    };

  return (
    <section className="container px-4 mx-auto pt-12">
      {/* <Helmet>
        <title>MyTasks - Task Management</title>
      </Helmet> */}

      <div className="flex items-center gap-x-5">
        <h2 className="text-3xl font-bold text-gray-800">
          My Tasks ({tasks.length})
        </h2>
      </div>

      <div className="py-8">
        <div className="-mx-4 px-4 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    Task Photo
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-gray-800 text-left text-sm uppercase font-normal">
                    Title
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-gray-800 text-left text-sm uppercase font-normal">
                    Required Workers
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-gray-800 text-left text-sm uppercase font-normal">
                    Payable Amount
                  </th>

                  <th className="px-5 py-3 bg-white border-b text-gray-800 text-left text-sm uppercase font-normal">
                    Added Date
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-gray-800 text-left text-sm uppercase font-normal">
                  Completion Date
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-gray-800 text-left text-sm uppercase font-normal">
                    Update
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-gray-800 text-left text-sm uppercase font-normal">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                 
                  <tr key={task._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="block relative">
                            <img
                              alt="profile"
                              src={task.taskImageUrl}
                              className="mx-auto object-cover rounded h-10 w-15 "
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {task.taskTitle}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {task.requiredWorkers}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {task.payableAmount}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {task.addedDate}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {task.completionDate}
                      </p>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                        ></span>
                        <span
                          className="relative"
                          onClick={() => handleDelete(task)}
                        >
                          Delete
                        </span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleEdit(task)}
                      >
                        update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && selectedTask && (
        <div className="absolute z-20  inset-0 bg-black bg-opacity-50 flex py-10 justify-center">
          <div className="bg-white  p-6 rounded-lg shadow-lg w-full max-w-2xl ">
            <h2 className="text-2xl font-bold text-center mb-4">Update Task</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="taskTitle"
                  defaultValue={selectedTask.taskTitle}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Task Detail
                </label>
                <textarea
                  name="taskDetails"
                  defaultValue={selectedTask.taskDetails}
                  className="textarea textarea-bordered w-full"
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
                    defaultValue={selectedTask.requiredWorkers}
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
                    defaultValue={selectedTask.payableAmount}
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
                  defaultValue={selectedTask.completionDate}
                  className="w-full px-3 py-2 border rounded shadow"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Submission Details
                </label>
                <textarea
                  name="submissionInfo"
                  defaultValue={selectedTask.submissionInfo}
                  className="textarea textarea-bordered w-full"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Task Image URL
                </label>
                <input
                  type="url"
                  name="taskImageUrl"
                  defaultValue={selectedTask.taskImageUrl}
                  className="w-full px-3 py-2 border rounded shadow"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="text-white bg-gray-600 hover:bg-gray-700 font-semibold px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-600 hover:bg-blue-700 font-semibold px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyTasks;
