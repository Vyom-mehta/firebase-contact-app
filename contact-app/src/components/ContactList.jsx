import React, { useState } from "react";
import UpdateContact from "./UpdateContact";

const ContactList = ({ contacts = [], onUpdateContact, onDeleteContact }) => {
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <div className="mt-4">
      {contacts.length === 0 ? (
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="flex items-center space-x-3">
            <img src="/Hands Contact.png" alt="Contact" className="h-20 w-20" />
            <p className="text-xl font-semibold text-white">No Contact Found</p>
          </div>
        </div>
      ) : (
        <div className="mt-2 space-y-4">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-yellow-200 p-4 shadow-md"
            >
              <div className="flex items-center space-x-3">
                <i className="fa-solid fa-user-circle text-3xl text-orange-500"></i>
                <div>
                  <p className="font-semibold text-black">{contact.name}</p>
                  <p className="text-sm text-gray-700">{contact.email}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedContact(contact)}
                  className="cursor-pointer text-black"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  onClick={() => onDeleteContact(contact.id)}
                  className="cursor-pointer text-black"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedContact && (
        <UpdateContact
          contact={selectedContact}
          onUpdate={(updatedData) => {
            onUpdateContact(updatedData);
            setSelectedContact(null);
          }}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </div>
  );
};

export default ContactList;
