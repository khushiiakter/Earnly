import { Link } from "react-router-dom";

const TaskCard = ({ task }) => {
  const {
    _id,
    taskImageUrl,
    taskTitle,
    Buyer_name,
    completionDate,
    payableAmount,
    requiredWorkers,
    
  } = task;
  return (
    <div className="border flex flex-col rounded-lg shadow-lg p-4 bg-white">
      <div className="flex flex-col flex-grow">
        <img src={taskImageUrl} className="w-full h-[150px]" alt="" />
        <h3 className="text-xl font-bold text-gray-800">{taskTitle}</h3>
        <p className="text-base text-gray-600 mt-2">
          <strong>Buyer:</strong> {Buyer_name}
        </p>
        <p className="text-base text-gray-600 mt-1">
          <strong>Completion Date:</strong> {completionDate}
        </p>
        <p className="text-base text-gray-600 mt-1">
          <strong>Payable Amount:</strong> ${payableAmount}
        </p>
        <p className="text-base text-gray-600 mt-1">
          <strong>Required Workers:</strong> {requiredWorkers}
        </p>
        
        <div className="mt-4">
          <Link to={`/task-details/${_id}`}>
            <button className="text-white bg-blue-600 w-full hover:bg-blue-700 font-semibold px-4 py-2 rounded-md">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
