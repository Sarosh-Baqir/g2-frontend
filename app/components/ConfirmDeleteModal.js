// ConfirmDeleteModal.js (React Component Example)
import React from "react";

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => (
  <div className="modal">
    <p>Are you sure you want to delete this agency and all related data?</p>
    <button onClick={onConfirm}>Yes, Delete</button>
    <button onClick={onCancel}>Cancel</button>
  </div>
);

export default ConfirmDeleteModal;
