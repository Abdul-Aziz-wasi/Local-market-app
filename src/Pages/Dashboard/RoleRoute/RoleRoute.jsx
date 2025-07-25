import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';



import { AuthContext } from '../../../contexts/AuthContext';
import useUserRole from '../../../useUserRole/useUserRole';

const RoleRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, isRoleLoading } = useUserRole(user?.email);
  const location = useLocation();

  if (loading || isRoleLoading) {
    return 'loading...'
  }

  if (!user || !allowedRoles.includes(role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RoleRoute;
