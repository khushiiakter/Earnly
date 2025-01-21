import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
const useSubmission = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useContext(AuthContext);
    const { refetch, data: submission = [] } = useQuery({
        queryKey: ['submission', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/submissions?worker_email=${user?.email}`);
            return res.data;
        }
    })
    
    return [submission, refetch]
};

export default useSubmission;