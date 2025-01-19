import { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
// import { Helmet } from "react-helmet-async";

const MyTasks = () => {
  const { user } = useContext(AuthContext);
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
  //   const handleEdit = (task) => {
  //     setSelectedTask(task);
  //     setIsModalOpen(true);
  //   };

  // Close modal
  //   const closeModal = () => {
  //     setSelectedTask(null);
  //     setIsModalOpen(false);
  //   };

  // Handle task update
  //   const handleUpdate = (e) => {
  //     e.preventDefault();
  //     const { title, taskDetail, submissionDetails } = e.target;

  //     const updatedTask = {
  //       title: title.value,
  //       taskDetail: taskDetail.value,
  //       submissionDetails: submissionDetails.value,
  //     };

  //     axios
  //       .put(`/tasks/${selectedTask._id}`, updatedTask)
  //       .then((res) => {
  //         if (res.data.success) {
  //           toast.success("Task updated successfully!");
  //           setTasks((prev) =>
  //             prev.map((task) =>
  //               task._id === selectedTask._id
  //                 ? { ...task, ...updatedTask }
  //                 : task
  //             )
  //           );
  //           closeModal();
  //         } else {
  //           toast.error("Failed to update the task.");
  //         }
  //       })
  //       .catch((err) => console.error("Error updating task:", err));
  //   };

  // Handle task deletion
  //   const handleDelete = (task) => {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         axios
  //           .delete(`/tasks/${task._id}`)
  //           .then((res) => {
  //             if (res.data.success) {
  //               Swal.fire("Deleted!", "Your task has been deleted.", "success");
  //               setTasks(tasks.filter((t) => t._id !== task._id));

  //               if (!task.isCompleted) {
  //                 const refillAmount = task.requiredWorkers * task.payableAmount;
  //                 axios.put(`/users/${user.email}/coins`, { coins: refillAmount });
  //               }
  //             } else {
  //               Swal.fire("Error!", "Failed to delete task.", "error");
  //             }
  //           })
  //           .catch((err) => console.error("Error deleting task:", err));
  //       }
  //     });
  //   };

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
                  <th className="px-5 py-3 bg-white border-b text-gray-800 text-left text-sm uppercase font-normal">
                    Title
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-gray-800 text-left text-sm uppercase font-normal">
                    Task Detail
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-gray-800 text-left text-sm uppercase font-normal">
                    Submission Details
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
                  //   <tr key={task._id}>
                  //     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  //       {task.taskTitle}
                  //     </td>
                  //     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  //       {task.taskDetails}
                  //     </td>
                  //     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  //       {task.submissionInfo}
                  //     </td>
                  //     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  //       <button
                  //         className="text-blue-600 hover:underline"
                  //         onClick={() => handleEdit(task)}
                  //       >
                  //         Update
                  //       </button>
                  //     </td>
                  //     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  //       <button
                  //         className="text-red-600 hover:underline"
                  //         onClick={() => handleDelete(task)}
                  //       >
                  //         Delete
                  //       </button>
                  //     </td>
                  //   </tr>
                  <tr key={task._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="block relative">
                            <img
                              alt="profile"
                              src="https://i.ibb.co.com/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg"
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
                      <p className="text-gray-900 whitespace-no-wrap">Indoor</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">$120</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">5</p>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        
                        className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative" onClick={() => handleDelete(task)}>Delete</span>
                      </span>
                      
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        
                        className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative"  onClick={() => handleEdit(task)}>Update</span>
                      </span>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-center mb-4">Update Task</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedTask.title}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Task Detail
                </label>
                <textarea
                  name="taskDetail"
                  defaultValue={selectedTask.taskDetail}
                  className="textarea textarea-bordered w-full"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Submission Details
                </label>
                <textarea
                  name="submissionDetails"
                  defaultValue={selectedTask.submissionDetails}
                  className="textarea textarea-bordered w-full"
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
