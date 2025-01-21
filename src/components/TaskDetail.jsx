import { useContext, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import useSubmission from "./hooks/useSubmission";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "./hooks/useAxiosSecure";

const TaskDetail = () => {
  const { id } = useParams();
  const task = useLoaderData();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useSubmission();
  const {
    _id,
    taskImageUrl,
    taskTitle,
    userEmail,
    Buyer_name,
    completionDate,
    payableAmount,
    requiredWorkers,
    taskDetails,
    submissionInfo,
    addedDate,
  } = task;
  const [submissionDetails, setSubmissionDetails] = useState("");

  const handleAddSubmission = async (e) => {
    e.preventDefault();

    const submissionData = {
      task_id: id,
      task_title: taskTitle,
      image: taskImageUrl,
      payable_amount: payableAmount,
      worker_email: user?.email,
      submission_details: submissionDetails,
      worker_name: user?.displayName,
      Buyer_name,
      Buyer_email: userEmail || "N/A",
      current_date: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/submissions", submissionData);
      if (res.data.insertedId) {
        Swal.fire({
          
          icon: "success",
          text: "Submission added successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        // refetch cart to update the cart items count
        refetch();
        setSubmissionDetails("");
      } else {
        toast("Failed to add submission. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Task Header */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Section */}
          <div className="w-full h-[300px] md:w-2/5">
            <img
              src={taskImageUrl}
              alt={taskTitle}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Task Details Section */}
          <div className="w-full md:w-3/5 flex flex-col justify-between">
            {/* Title and Basic Info */}
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{taskTitle}</h1>
              <p className="text-lg text-gray-600 mt-2">
                <strong>Buyer:</strong> {Buyer_name}
              </p>
              <p className="text-lg text-gray-600 mt-1">
                <strong>Added Date:</strong> {addedDate}
              </p>
              <p className="text-lg text-gray-600 mt-1">
                <strong>Completion Date:</strong> {completionDate}
              </p>
            </div>

            {/* Payment and Worker Info */}
            <div className="mb-4">
              <p className="text-xl text-gray-700">
                <strong>Payable Amount:</strong> ${payableAmount}
              </p>
              <p className="text-lg text-gray-600 mt-1">
                <strong>Required Workers:</strong> {requiredWorkers}
              </p>
            </div>

            {/* Submission Info */}
            {submissionInfo && (
              <div className="mb-4">
                <p className="text-lg text-gray-600">
                  <strong>Submission Info:</strong> {submissionInfo}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-800">Task Details</h2>
          <p className="text-gray-700 mt-4">
            {taskDetails || "No details provided."}
          </p>
        </div>
      </div>

      {/* my submission  */}
      <section id="addReview" className="bg-gray-100 text-center p-7 my-7 ">
        <h2 className="text-3xl pb-5 font-bold ">
          Add Your Submission Details
        </h2>
        <form onSubmit={handleAddSubmission}>
          <div className="">
            <textarea
              className="w-full bg-gray border-gray-400 p-3 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
              rows="5"
              placeholder="Write your submission details here..."
              value={submissionDetails}
              onChange={(e) => setSubmissionDetails(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="text-white my-2 w-full bg-[#0F1035] hover:text-[#0F1035] hover:bg-[#0f10356c] font-semibold  px-4 py-2 rounded-lg transition"
          >
            Submit
          </button>
        </form>
      </section>
    </section>
  );
};

export default TaskDetail;
