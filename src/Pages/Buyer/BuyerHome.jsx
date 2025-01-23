
import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../providers/AuthProvider";
// import useTask from "../../components/hooks/useTask";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import useSubmission from "../../components/hooks/useSubmission";
// import { FaTrashAlt } from "react-icons/fa";
// import useSubmission from "../../components/hooks/useSubmission";

const BuyerHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [submissions, refetch] = useSubmission();
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Fetch Buyer Statistics
  const { data: stats = {} } = useQuery({
    queryKey: ["buyerStatistics", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/buyer/statistics");
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Approve Submission Mutation
  const approveMutation = useMutation({
    mutationFn: async ({ submissionId, worker_email, payable_amount }) => {
      return await axiosSecure.post("/submissions/approve", {
        submissionId,
        worker_email,
        payable_amount,
      });
    },
    onSuccess: () => {
      refetch();
    },
  });

  // Reject Submission Mutation
  const rejectMutation = useMutation({
    mutationFn: async ({ submissionId, task_id }) => {
      return await axiosSecure.post("/submissions/reject", {
        submissionId,
        task_id,
      });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleApprove = (submissionId, worker_email, payable_amount) => {
    approveMutation.mutate({ submissionId, worker_email, payable_amount });
  };

  const handleReject = (submissionId, task_id) => {
    rejectMutation.mutate({ submissionId, task_id });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Buyer Dashboard</h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="text-xl font-bold">Total Tasks</h2>
          <p className="text-3xl">{stats.totalTasks || 0}</p>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="text-xl font-bold">Pending Workers</h2>
          <p className="text-3xl">{stats.pendingWorkers || 0}</p>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="text-xl font-bold">Total Payment</h2>
          <p className="text-3xl">${stats.totalPayment || 0}</p>
        </div>
      </div>

      {/* Submissions Table */}
      <h2 className="text-2xl font-bold mb-4">Task Submissions to Review</h2>
      {submissions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Worker Name</th>
                <th>Task Title</th>
                <th>Payable Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission._id}>
                  <td>{submission.worker_name}</td>
                  <td>{submission.task_title}</td>
                  <td>${submission.payable_amount}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm mr-2"
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-success btn-sm mr-2"
                      onClick={() =>
                        handleApprove(
                          submission._id,
                          submission.worker_email,
                          submission.payable_amount
                        )
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() =>
                        handleReject(submission._id, submission.task_id)
                      }
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-lg">No pending submissions to review.</p>
      )}

      {/* Modal */}
      {selectedSubmission && (
        <div>
          <input type="checkbox" id="submission-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="submission-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setSelectedSubmission(null)}
              >
                ✕
              </label>
              <h3 className="text-lg font-bold">Submission Details</h3>
              <p>
                <strong>Worker Name:</strong> {selectedSubmission.worker_name}
              </p>
              <p>
                <strong>Task Title:</strong> {selectedSubmission.task_title}
              </p>
              <p>
                <strong>Details:</strong>{" "}
                {selectedSubmission.details || "No details provided."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerHome;

