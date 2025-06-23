import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Shield } from 'lucide-react'; // npm install lucide-react

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password && role) {
      localStorage.setItem('userRole', role);
      navigate('/app/dashboard');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen bg-[url('/military-bg.jpg')] bg-cover bg-center flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5 animate-fade-in"
      >
        <h2 className="text-3xl font-extrabold text-center text-green-800 tracking-wide">
          Military Asset Command
        </h2>
        <p className="text-sm text-center text-gray-600">Secure Login Portal</p>

        <div className="flex items-center border p-2 rounded">
          <Mail className="text-gray-400 mr-2" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-transparent focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center border p-2 rounded">
          <Lock className="text-gray-400 mr-2" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-transparent focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center border p-2 rounded">
          <Shield className="text-gray-400 mr-2" />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-transparent focus:outline-none"
            required
          >
            <option value="">Select Role</option>
            <option value="admin">🛡️ Admin</option>
            <option value="commander">🎖️ Base Commander</option>
            <option value="logistics">📦 Logistics Officer</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
        >
          Log In Securely
        </button>

        <p className="text-xs text-center text-gray-500 mt-2">
          Unauthorized access is prohibited.
        </p>
      </form>
    </div>
  );
}

export default Login;
