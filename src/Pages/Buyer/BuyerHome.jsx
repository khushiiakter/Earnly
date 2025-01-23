import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
// import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const BuyerHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    pendingWorkers: 0,
    totalPayment: 0,
  });
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
      // Fetch Buyer Statistics
      axiosSecure.get(`/buyer/statistics?email=${user.email}`)
        .then((res) => {
          setStats(res.data);
        })
        .catch((error) => {
          console.error("Error fetching statistics:", error);
        });
    }
  }, [user?.email]);

   // Approve Submission
   const approveSubmission = async (_id, worker_email, payable_amount) => {
    try {
      const response = await axios.post("https://earnly-server.vercel.app/submissions/approve", {
        _id,
        worker_email,
        payable_amount,
      });
      if (response.data.message === "Submission approved successfully.") {
        setSubmissions((prev) => prev.filter((sub) => sub._id !== _id));
      }
    } catch (error) {
      console.error("Error approving submission:", error);
      alert("Failed to approve submission. Please try again.");
    }
  };

  // Reject Submission
  const rejectSubmission = async (_id, task_id) => {
    try {
      const response = await axios.post("https://earnly-server.vercel.app/submissions/reject", {
        _id,
        task_id,
      });
      if (response.data.message === "Submission rejected successfully.") {
        setSubmissions((prev) => prev.filter((sub) => sub._id !== _id));
      }
    } catch (error) {
      console.error("Error rejecting submission:", error);
      alert("Failed to reject submission. Please try again.");
    }
  };

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
                      className="btn btn-info btn-sm mr-2"
                      onClick={() => {
                        
                      }}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-success btn-sm mr-2"
                      onClick={() =>
                        approveSubmission(
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
                        rejectSubmission(submission._id, submission.task_id)
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
    </div>
  );
};

export default BuyerHome;
