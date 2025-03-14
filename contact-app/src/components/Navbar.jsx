import React from "react";

const Navbar = () => {
  return (
    <header className="flex w-full items-center justify-center rounded-md bg-white px-6 py-3 text-black shadow-md">
      <img src="public/logo.png" alt="Firebase Logo" className="mr-2 h-6" />
      <h1 className="font-inter font-bold">Firebase Contact App</h1>
    </header>
  );
};

export default Navbar;
