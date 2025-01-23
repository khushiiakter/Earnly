import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";

const BuyerHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Fetch Submissions
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/submissions/${user.email}`)
        .then((res) => {
          if (Array.isArray(res.data)) {
            setSubmissions(
              res.data.sort(
                (a, b) =>
                  new Date(b.completionDate) - new Date(a.completionDate)
              )
            );
          } else {
            console.error("Invalid data format:", res.data);
            setSubmissions([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching submissions:", error);
          setSubmissions([]);
        });
    }
  }, [user?.email]);

  // Fetch Buyer Statistics
  const {
    data: stats = { totalTasks: 0, pendingWorkers: 0, totalPayment: 0 },
  } = useQuery({
    queryKey: ["buyerStatistics", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/buyer/statistics");
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Approve Submission Mutation
  const approveMutation = useMutation({
    mutationFn: async ({ _id, worker_email, payable_amount }) => {
      return await axiosSecure.post("/submissions/approve", {
        _id,
        worker_email,
        payable_amount,
      });
    },
    onSuccess: (_, { _id }) => {
      setSubmissions((prev) => prev.filter((sub) => sub._id !== _id));
    },
    onError: (error) => {
      console.error("Error approving submission:", error);
      alert("Failed to approve submission. Please try again.");
    },
  });

  // Reject Submission Mutation
  const rejectMutation = useMutation({
    mutationFn: async ({ _id, task_id }) => {
      return await axiosSecure.post("/submissions/reject", {
        _id,
        task_id,
      });
    },
    onSuccess: (_, { _id }) => {
      setSubmissions((prev) => prev.filter((sub) => sub._id !== _id));
    },
    onError: (error) => {
      console.error("Error rejecting submission:", error);
      alert("Failed to reject submission. Please try again.");
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Buyer Dashboard</h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="text-xl font-bold">Total Tasks</h2>
          <p className="text-3xl">{stats.totalTasks}</p>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="text-xl font-bold">Pending Workers</h2>
          <p className="text-3xl">{stats.pendingWorkers}</p>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="text-xl font-bold">Total Payment</h2>
          <p className="text-3xl">${stats.totalPayment}</p>
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
                      className={`btn btn-info btn-sm mr-2`}
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      View
                    </button>
                    <button
                      className={`btn btn-success btn-sm mr-2 ${
                        approveMutation.isLoading ? "loading" : ""
                      }`}
                      onClick={() =>
                        approveMutation.mutate({
                          _id: submission._id,
                          worker_email: submission.worker_email,
                          payable_amount: submission.payable_amount,
                        })
                      }
                      disabled={approveMutation.isLoading}
                    >
                      Approve
                    </button>
                    <button
                      className={`btn btn-error btn-sm ${
                        rejectMutation.isLoading ? "loading" : ""
                      }`}
                      onClick={() =>
                        rejectMutation.mutate({
                          _id: submission._id,
                          task_id: submission.task_id,
                        })
                      }
                      disabled={rejectMutation.isLoading}
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
          <input
            type="checkbox"
            id="submission-modal"
            className="modal-toggle"
          />
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
