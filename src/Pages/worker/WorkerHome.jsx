import { useContext } from "react";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const WorkerHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
  
    // Fetch Worker Statistics
    const { data: stats = {} } = useQuery({
      queryKey: ["workerStatistics", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/worker/statistics?worker_email=${user?.email}`);
        return res.data;
      },
      enabled: !!user?.email,
    });
  
    // Fetch Approved Submissions
    const { data: approvedSubmissions = [] } = useQuery({
      queryKey: ["workerApprovedSubmissions", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/worker/approved-submissions?worker_email=${user?.email}`);
        return res.data;
      },
      enabled: !!user?.email,
    });
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Worker Dashboard</h1>
  
        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card bg-base-100 shadow-md p-4">
            <h2 className="text-xl font-bold">Total Submissions</h2>
            <p className="text-3xl">{stats.totalSubmissions || 0}</p>
          </div>
          <div className="card bg-base-100 shadow-md p-4">
            <h2 className="text-xl font-bold">Pending Submissions</h2>
            <p className="text-3xl">{stats.pendingSubmissions || 0}</p>
          </div>
          <div className="card bg-base-100 shadow-md p-4">
            <h2 className="text-xl font-bold">Total Earnings</h2>
            <p className="text-3xl">${stats.totalEarnings || 0}</p>
          </div>
        </div>
  
        {/* Approved Submissions Table */}
        <h2 className="text-2xl font-bold mb-4">Approved Submissions</h2>
        {approvedSubmissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Payable Amount</th>
                  <th>Buyer Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {approvedSubmissions.map((submission) => (
                  <tr key={submission._id}>
                    <td>{submission.task_title}</td>
                    <td>${submission.payable_amount}</td>
                    <td>{submission.buyer_name}</td>
                    <td className="text-success font-bold">{submission.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-lg">No approved submissions yet.</p>
        )}
      </div>
    );
  };
  
  export default WorkerHome;