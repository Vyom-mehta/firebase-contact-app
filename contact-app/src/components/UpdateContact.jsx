import React, { useState, useEffect, useRef } from "react";

const UpdateContact = ({ contact, onUpdate, onClose }) => {
  const [name, setName] = useState(contact?.name || "");
  const [email, setEmail] = useState(contact?.email || "");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onUpdate({ ...contact, name, email });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur"></div>
      <div
        ref={formRef}
        className="z-50 w-80 rounded-lg bg-white p-6 shadow-md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-black"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-black"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
            >
              Update Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateContact;
