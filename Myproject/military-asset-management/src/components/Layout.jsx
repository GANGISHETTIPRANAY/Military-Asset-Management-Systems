import { NavLink, Outlet, useNavigate } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">MAMS</h2>
        <nav className="flex flex-col gap-2">
          <NavLink to="/app/dashboard" className="hover:underline">Dashboard</NavLink>
          <NavLink to="/app/purchases" className="hover:underline">Purchases</NavLink>
          <NavLink to="/app/transfers" className="hover:underline">Transfers</NavLink>
          <NavLink to="/app/assignments" className="hover:underline">Assignments</NavLink>
        </nav>
        <button onClick={logout} className="mt-6 text-sm text-red-400">Logout</button>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
