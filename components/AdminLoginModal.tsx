// components/AdminLoginModal.tsx
import { useState } from "react";

interface AdminLoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem("adminLoggedIn", "true");
      onLoginSuccess(); // Trigger success callback
      onClose(); // Close the modal
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-80 rounded bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold">Admin Login</h2>
        {error && <p className="mb-2 text-center text-red-600">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="mb-4 w-full rounded border p-2"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mb-4 w-full rounded border p-2"
            required
          />
          <button
            type="submit"
            className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
