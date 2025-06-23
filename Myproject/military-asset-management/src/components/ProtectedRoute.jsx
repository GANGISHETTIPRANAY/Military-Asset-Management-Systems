import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles }) {
  const role = localStorage.getItem('userRole');

  if (!role) return <Navigate to="/" />;

  if (!allowedRoles.includes(role)) {
    return <div className="p-6 text-red-600">Access Denied: Role Not Authorized</div>;
  }

  return children;
}

export default ProtectedRoute;
