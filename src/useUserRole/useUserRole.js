// src/hooks/useUserRole.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useUserRole = (email) => {
  const { data: role = '', isLoading: isRoleLoading } = useQuery({
    queryKey: ['userRole', email],
    enabled: !!email, 
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/users/role/${email}`);
      return res.data?.role;
    }
  });

  return { role, isRoleLoading };
};

export default useUserRole;
