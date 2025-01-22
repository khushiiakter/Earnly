import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
// import axios from "axios";

import useTask from "../../components/hooks/useTask";


const ManageTasks = () => {
  const [tasks, refetch] = useTask();
  
  const axiosSecure = useAxiosSecure();
 
  const handleDeleteTask = (task) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/tasks/${task._id}`);
            // console.log(res.data);
            if (res.data.success) {
                // refetch to update the ui
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${task.name} has been deleted`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }


        }
    });
}
  

  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <h2 className="text-3xl font-bold">Manage Tasks</h2>
        <h2 className="text-3xl font-bold">Total Tasks: </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Details</th>
              <th className="border border-gray-300 px-4 py-2">
                Payable Amount
              </th>
              <th className="border border-gray-300 px-4 py-2">Added date</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {task.taskTitle}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {task.taskDetails.length > 50
                    ? `${task.taskDetails.substring(0, 50)}...`
                    : task.taskDetails}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {task.payableAmount}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  ${task.addedDate}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleDeleteTask(task)}
                    className="btn btn-ghost"
                  >
                    <FaTrashAlt className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTasks;
