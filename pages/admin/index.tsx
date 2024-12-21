import { useEffect, useState } from "react";

import AdminLoginModal from "@/components/AdminLoginModal";
import Navbar from "@/components/Navbar";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const loggedIn = localStorage.getItem("adminLoggedIn");
      if (loggedIn === "true") {
        setIsLoggedIn(true);
        fetchResponses(); // If logged in, fetch responses
      } else {
        setShowLoginModal(true); // Show login modal if not logged in
      }
    };

    checkLogin();
  }, []);

  const fetchResponses = async () => {
    try {
      const res = await fetch("/api/admin");
      if (!res.ok) {
        throw new Error("Failed to fetch responses");
      }
      const data = await res.json();
      setResponses(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    fetchResponses(); // Fetch responses after successful login
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsLoggedIn(false); // Update logged in state
    setShowLoginModal(true); // Show login modal again
  };

  if (!isLoggedIn) {
    return (
      <AdminLoginModal
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-32">
      <Navbar />
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
        Admin Dashboard
      </h1>
      {error && <p className="text-center text-red-600">{error}</p>}
      <div className="mx-auto max-w-4xl">
        {/* Add horizontal scrolling for the table */}
        <div className="overflow-x-auto">
          <div className="rounded-lg bg-white shadow-lg">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-300">
                  <th className="px-4 py-2 text-left text-gray-800">#</th>
                  <th className="px-4 py-2 text-left text-gray-800">Branch</th>
                  <th className="px-4 py-2 text-left text-gray-800">
                    Overall sales feedback
                  </th>
                  <th className="px-4 py-2 text-left text-gray-800">
                    Outstanding Services
                  </th>
                  <th className="px-4 py-2 text-left text-gray-800">Rate</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((response, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2 text-gray-800">{index + 1}</td>
                    <td className="px-4 py-2 text-gray-800">{response[1]}</td>
                    <td className="px-4 py-2 text-gray-800">{response[2]}</td>
                    <td className="px-4 py-2 text-gray-800">
                      {Array.isArray(response[3])
                        ? response[3].join(", ")
                        : response[3]}
                    </td>
                    <td className="px-4 py-2 text-gray-800">{response[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Make logout button responsive */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleLogout}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
