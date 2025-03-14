import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBadCIslAV4HYV-cVDgPVpaWbTsc7oykKk",
  authDomain: "contact-app-13ce4.firebaseapp.com",
  projectId: "contact-app-13ce4",
  storageBucket: "contact-app-13ce4.firebasestorage.app",
  messagingSenderId: "658578716585",
  appId: "1:658578716585:web:fc635e24a5871c05a4f6b8",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const getContacts = (setContacts) => {
  const contactsRef = collection(db, "contacts");
  onSnapshot(contactsRef, (snapshot) => {
    const contactList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setContacts(contactList);
  });
};

export const addContactToDB = async (contact) => {
  try {
    await addDoc(collection(db, "contacts"), contact);
    toast.success("Contact added successfully");
  } catch (error) {
    toast.error("Error adding contact");
    console.error(error);
  }
};

export const updateContactInDB = async (id, updatedContact) => {
  try {
    await updateDoc(doc(db, "contacts", id), updatedContact);
    toast.success("Contact updated successfully");
  } catch (error) {
    toast.error("Error updating contact");
    console.error(error);
  }
};

export const deleteContactFromDB = async (id) => {
  try {
    await deleteDoc(doc(db, "contacts", id));
    toast.success("Contact deleted successfully");
  } catch (error) {
    toast.error("Error deleting contact");
    console.error(error);
  }
};
