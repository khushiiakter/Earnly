import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const useBuyer = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isBuyer, isLoading: isBuyerLoading } = useQuery({
    queryKey: [user?.email, 'isBuyer'],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/buyer/${user.email}`);
      return res.data?.buyer;
    },
  });
  return [isBuyer, isBuyerLoading];
};

export default useBuyer;
