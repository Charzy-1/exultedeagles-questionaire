import Image from "next/image";
import { useEffect, useState } from "react";

import AdminLoginModal from "@/components/AdminLoginModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal"; // Import the modal
import Navbar from "@/components/Navbar";

import { CustomResponseType } from "../../types/ResponseType";

const AdminPage = () => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isCustomResponseType = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response: any
  ): response is CustomResponseType => {
    return response && typeof response._id === "string"; // Adjust this check to your needs
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [responses, setResponses] = useState<CustomResponseType[]>([]);
  const [filteredResponses, setFilteredResponses] = useState<
    CustomResponseType[]
  >([]); // State for filtered responses
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [error, setError] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null); // Track selected row
  const [isModalVisible, setIsModalVisible] = useState(false); // Track modal visibility
  const [responseToDelete, setResponseToDelete] =
    useState<CustomResponseType | null>(null);

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
    const handleOutsideClick = (e: MouseEvent) => {
      const table = document.querySelector("table");
      if (table && !table.contains(e.target as Node)) {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
      if (!res.ok) {
        throw new Error("Failed to fetch responses");
      }
      const data = await res.json();
      setResponses(data);
      setFilteredResponses(data); // Initialize filtered responses
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // Safely access err.message
      } else {
        setError("An unknown error occurred");
      }
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

  const handleRowClick = (index: number) => {
    setSelectedRowIndex(index); // Select or unselect the row
  };

  const handleDeleteClick = (response: CustomResponseType) => {
    setResponseToDelete(response); // Set the response to delete
    setIsModalVisible(true); // Show the modal
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!responseToDelete) {
        throw new Error("No response selected to delete");
      }

      // Call the API to delete from the database
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/${responseToDelete._id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete response");
      }

      // Remove from UI after successful delete
      setResponses(
        responses.filter((response) => response._id !== responseToDelete._id)
      );
      setFilteredResponses(
        filteredResponses.filter(
          (response) => response._id !== responseToDelete._id
        )
      );

      // Close the modal after successful deletion
      setIsModalVisible(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Handle error
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Close the modal without deleting
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredResponses(responses); // Reset to all responses if search is cleared
    } else {
      const filtered = responses.filter((response) => {
        const branchName = response[1];
        // Ensure branchName is a string
        return (
          typeof branchName === "string" &&
          branchName.toLowerCase().includes(query)
        );
      });
      setFilteredResponses(filtered);
    }
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

      {/* Search Form */}
      <div className="mb-4 flex justify-center">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 2a6 6 0 100 12A6 6 0 008 2zM2 8a8 8 0 1114.32 5.906l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387A8 8 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by branch name"
            className="w-full rounded-full border-2 border-gray-300 px-10 py-2 text-gray-800 focus:border-gray-800 focus:outline-none"
          />
        </div>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="overflow-x-auto">
          <div className="rounded-lg bg-white shadow-lg">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-300">
                  <th className="px-4 py-2 text-left text-gray-800">S/n</th>
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
                {filteredResponses.map((response, index) => (
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
                            if (isCustomResponseType(response)) {
                              handleDeleteClick(response); // Safe to pass as CustomResponseType
                            } else {
                              console.error("Invalid response type");
                            }
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
