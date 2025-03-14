// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {getFirestore} from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBadCIslAV4HYV-cVDgPVpaWbTsc7oykKk",
//   authDomain: "contact-app-13ce4.firebaseapp.com",
//   projectId: "contact-app-13ce4",
//   storageBucket: "contact-app-13ce4.firebasestorage.app",
//   messagingSenderId: "658578716585",
//   appId: "1:658578716585:web:fc635e24a5871c05a4f6b8",
// };

// // Initialize Firebase
// //export here is by me 
// export const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app)








// USING 

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
/*
  Each field is important for Firebase services to work correctly:
          apiKey - Your Firebase API key (authentication and communication).
          authDomain - Domain for Firebase Auth.
          projectId - Unique identifier for your Firebase project.
          storageBucket - Firebase storage for storing files.
          messagingSenderId - Sender ID for Firebase Cloud Messaging (FCM).
          appId - App identifier for your Firebase project.This value uniquely identifies your app within your Firebase project. You don’t need to change it or worry about it unless you are creating a new app within the same Firebase project.


*/
const firebaseConfig = {
  apiKey: "AIzaSyBadCIslAV4HYV-cVDgPVpaWbTsc7oykKk",
  authDomain: "contact-app-13ce4.firebaseapp.com",
  projectId: "contact-app-13ce4",
  storageBucket: "contact-app-13ce4.firebasestorage.app",
  messagingSenderId: "658578716585",
  appId: "1:658578716585:web:fc635e24a5871c05a4f6b8",
};

// Initialize Firebase:
/*  
    initializeApp(firebaseConfig) - Initializes Firebase using the configuration object.

    getFirestore(app) - Creates a Firestore instance (ndividual copy or representation of a service (in this case, Firestore)) linked to your Firebase project. 
    
    *app → Represents your Firebase project.
     db → Represents your Firestore database linked to that project


    Exported as app and db to be used throughout the code project.


*/
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


// Fetch contacts from Firestore
/*    
        export const getContacts = (setContacts) => { ... }
                The function getContacts is exported to be used in other parts of your application.

                It accepts a function parameter called setContacts, which is typically a state updater function (like from React’s useState hook). This function is used to update the contacts list in the UI.

        const contactsRef = collection(db, "contacts");
                The collection function is imported from the Firestore library.
                db: This is your Firestore instance, created using getFirestore(app).

                "contacts": This is the name of the Firestore collection where your contacts are stored.
                The function returns a reference to the "contacts" collection.

        
        onSnapshot(contactsRef, (snapshot) => { ... });
                onSnapshot: Sets up a real-time listener to the specified collection (contactsRef).
                It listens for changes in the collection and triggers the callback function whenever data is added, removed, or updated.

                snapshot: Represents the current state of the collection at the time of the update.

        
        const contactList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

                snapshot.docs: Returns an array of document snapshots (each representing a single document in the collection).
                .map((doc) => {...}): Iterates through each document and returns an object.
                Inside the map:
                id: doc.id: Gets the document ID, which acts as a unique identifier.
                ...doc.data(): Uses the spread syntax to get all the fields (key-value pairs) from the document.
                This results in an array of objects where each object represents a contact with an id and the contact data fields.

        setContacts(contactList); 

                  This function call updates the contacts list in your UI with the latest data from Firestore.
                  
                  Whenever the collection changes, the setContacts function gets called with the new list, keeping the UI in sync with the database.

*/
export const getContacts = (setContacts) => {
  const contactsRef = collection(db, "contacts");
  onSnapshot(contactsRef, (snapshot) => {
    // new array 
    const contactList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setContacts(contactList);
  });
};

// Add a new contact
/* 
  await addDoc(collection(db, "contacts"), contact);

        addDoc(): A Firebase Firestore function that adds a new document to a specified collection.
        collection(db, "contacts"): Specifies the Firestore collection named "contacts".
        contact: The object containing contact details to be stored.
        await: Pauses execution until the addDoc() promise is fulfilled.
        docRef: The reference to the newly created document in Firestore, which includes properties like id.

*/


/* Adds the given contact object as a new document to the "contacts" collection in the Firestore database(db), generating a unique ID automatically. ✅

    example : 
contacts (collection)
  └── ABC123xyz (document ID - auto-generated)
        ├── name: "John Doe"
        ├── phone: "123-456-7890"
        └── email: "john@example.com"

 */
export const addContactToDB = async (contact) => {
  try {
    await addDoc(collection(db, "contacts"), contact);
    toast.success("Contact added successfully");
  } catch (error) {
    toast.error("Error adding contact");
    console.error(error);
  }
};

// Update an existing contact
/*

    export const updateContactInDB = async (id, updatedContact) => {

              Defines an async function named updateContactInDB that takes two arguments:

              id - The unique ID of the contact to update.
              updatedContact - An object containing the updated contact data.


    doc(db, "contacts", id):

        Finds the specific contact document in the "contacts" collection by its ID.
        Think of it as saying:
        "Go to the 'contacts' collection and get me the document with this ID!"

    updateDoc(...):

        Updates the existing document with the new data from updatedContact.
        Only the fields present in updatedContact will be updated (it won’t replace the whole document).


*/
export const updateContactInDB = async (id, updatedContact) => {
  try {
    await updateDoc(doc(db, "contacts", id), updatedContact);
    toast.success("Contact updated successfully");
  } catch (error) {
    toast.error("Error updating contact");
    console.error(error);
  }
};

// Delete an existing contact
/* 
 code > export const deleteContactFromDB = async (id) => {

     An async function that takes an id as a parameter.
    The id represents the unique document ID of the contact to be deleted.

 await deleteDoc(doc(db, "contacts", id));

      deleteDoc(): Deletes a specific document from Firestore.

      doc(db, "contacts", id): Gets a reference to the document in the "contacts" collection with the given ID.*simply saying   --> "Hey Firestore, find me the document with this ID in the 'contacts' collection!".db here refers to the Firestore database copy ✅

      await: Waits for the deletion to complete before moving on

*/
export const deleteContactFromDB = async (id) => {
  try {
    await deleteDoc(doc(db, "contacts", id));
    toast.success("Contact deleted successfully");
  } catch (error) {
    toast.error("Error deleting contact");
    console.error(error);
  }
};





/*
    Benefits of Using async and await:
          Cleaner Syntax: Eliminates nested callbacks (.then() and .catch()).

          Better Error Handling: Easily use try and catch for error management.

          Improved Readability: Code looks more like synchronous code while still being asynchronous.
          
          Smooth UI Experience: Keeps the UI responsive and doesn’t block the main thread
        
 */