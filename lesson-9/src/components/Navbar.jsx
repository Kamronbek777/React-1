import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [links, setLinks] = useState([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ])
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>

      </div>
      <div className="flex-none">
        {
          links.map((link, index) => (
            <Link key={index} to={link.path} className="btn btn-ghost text-sm gap-x-2">
              {link.name}
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default Navbar;
