// components/DeleteConfirmationModal.tsx

import React from "react";

type DeleteConfirmationModalProps = {
  onClose: () => void; // Function type for the onClose handler
  onDelete: () => void; // Function type for the onDelete handler
  isVisible: boolean; // Boolean type for visibility
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  onClose,
  onDelete,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-6">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Confirm Deletion
        </h2>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete this response?
        </p>
        <div className="flex justify-between">
          <button
            onClick={onDelete}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
