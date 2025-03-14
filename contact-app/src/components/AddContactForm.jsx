import React, { useState, useEffect, useRef } from "react";

const AddContactForm = ({ onAdd, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    onAdd({ name, email });
    setName("");
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur"></div>
      <div
        className="relative z-50 w-80 rounded-lg bg-white p-6 shadow-md"
        ref={formRef}
      >
        <form onSubmit={handleAddContact}>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-3 w-full rounded border border-gray-300 p-2 text-black"
            required
          />
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-3 w-full rounded border border-gray-300 p-2 text-black"
            required
          />
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
            >
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContactForm;
