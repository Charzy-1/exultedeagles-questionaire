import Image from "next/image";
import { useEffect, useState } from "react";

import AdminLoginModal from "@/components/AdminLoginModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal"; // Import the modal
import Navbar from "@/components/Navbar";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null); // Track selected row
  const [isModalVisible, setIsModalVisible] = useState(false); // Track modal visibility
  const [responseToDelete, setResponseToDelete] = useState(null); // Track the response to delete

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

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const table = document.querySelector("table");
      if (table && !table.contains(e.target)) {
        setSelectedRowIndex(null); // Deselect row when clicking outside
      }
    };

    if (selectedRowIndex !== null) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [selectedRowIndex]);

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

  const handleRowClick = (index) => {
    setSelectedRowIndex(index); // Select or unselect the row
  };

  const handleDeleteClick = (response) => {
    setResponseToDelete(response); // Set the response to delete
    setIsModalVisible(true); // Show the modal
  };

  const handleDeleteConfirm = async () => {
    try {
      // Remove from UI first
      setResponses(
        responses.filter((response) => response !== responseToDelete)
      );

      // Call the API to delete from the database
      const res = await fetch(`/api/admin/${responseToDelete._id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete response");
      }

      setIsModalVisible(false); // Hide the modal after successful deletion
    } catch (err) {
      setError(err.message);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Close the modal without deleting
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
    <div className="min-h-screen bg-gray-100 px-10 py-32 lg:px-80">
      <Navbar />
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
        Admin Dashboard
      </h1>
      {error && <p className="text-center text-red-600">{error}</p>}
      <div className="mx-auto max-w-4xl">
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
                  <th className="px-4 py-2 text-left text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((response, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      selectedRowIndex === index ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleRowClick(index)}
                  >
                    <td className="px-4 py-2 text-gray-800">{index + 1}</td>
                    <td className="px-4 py-2 text-gray-800">{response[1]}</td>
                    <td className="px-4 py-2 text-gray-800">{response[2]}</td>
                    <td className="px-4 py-2 text-gray-800">
                      {Array.isArray(response[3])
                        ? response[3].join(", ")
                        : response[3]}
                    </td>
                    <td className="px-4 py-2 text-gray-800">{response[4]}</td>
                    <td className="px-4 py-2 text-gray-800">
                      {selectedRowIndex === index && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click event from firing
                            handleDeleteClick(response);
                          }}
                          className="rounded p-1 hover:bg-gray-300"
                        >
                          <Image
                            src="/images/trash-bin.png"
                            alt="Delete"
                            width={20}
                            height={20}
                          />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleLogout}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Modal */}
      <DeleteConfirmationModal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        onDelete={handleDeleteConfirm}
      />
    </div>
  );
};

export default AdminPage;
