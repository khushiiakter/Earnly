import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
const useSubmission = () => { 
    const axiosSecure = useAxiosSecure();
    const { user} = useContext(AuthContext);

    const { data: submissions = [],  refetch} = useQuery({
        queryKey: ['submissions', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/submissions?worker_email=${user?.email}`);
            return res.data;
        },
        
    });
    
    return [submissions, refetch]
};

export default useSubmission;