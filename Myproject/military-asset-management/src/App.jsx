import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Purchases from './pages/Purchases';
import Transfers from './pages/Transfers';
import Assignments from './pages/Assignments';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/app"
        element={
          <ProtectedRoute allowedRoles={['admin', 'commander', 'logistics']}>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Redirect /app to /app/dashboard */}
        <Route index element={<Navigate to="dashboard" />} />

        {/* Nested Pages */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="purchases" element={<Purchases />} />
        <Route path="transfers" element={<Transfers />} />
        <Route path="assignments" element={<Assignments />} />
      </Route>

      {/* Fallback Route (Optional) */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
