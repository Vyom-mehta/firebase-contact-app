import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import ContactList from "./components/ContactList";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import {
  getContacts,
  addContactToDB,
  updateContactInDB,
  deleteContactFromDB,
} from "./config/Firebase";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getContacts(setContacts);
  }, []);

  const addContact = (newContact) => {
    addContactToDB(newContact);
  };

  const updateContact = (updatedContact) => {
    updateContactInDB(updatedContact.id, updatedContact);
  };

  const deleteContact = (id) => {
    deleteContactFromDB(id);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name?.toLowerCase().startsWith(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#323334] text-white">
      <div className="w-full max-w-md p-4">
        <Navbar />
        <SearchBar onAdd={addContact} onSearch={setSearchTerm} />
        <ContactList
          contacts={filteredContacts}
          onUpdateContact={updateContact}
          onDeleteContact={deleteContact}
        />
        <ToastContainer position="bottom-center" />
      </div>
    </div>
  );
};

export default App;
