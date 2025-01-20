import { useContext } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const TaskDetail = () => {
  const { id } = useParams();
  const task = useLoaderData();
  const { user } = useContext(AuthContext);
  const {
    _id,
    taskImageUrl,
    taskTitle,
    Buyer_name,
    completionDate,
    payableAmount,
    requiredWorkers,
    taskDetails,
    submissionInfo,
    addedDate
    
    
  } = task;
  console.log(Buyer_name);
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
          <p className="text-gray-700 mt-4">{taskDetails || "No details provided."}</p>
        </div>
      </div>
    </section>
  );
};

export default TaskDetail;
