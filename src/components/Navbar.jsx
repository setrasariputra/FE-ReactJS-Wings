import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const styleUL = "m-0 p-0";
  const styleList = "inline-block";
  const styleLink = "text-white block px-4 py-4 hover:bg-indigo-700";
  return (
    <div className="bg-indigo-500">
      <ul className={styleUL}>
        <li className={styleList}>
          <Link className={styleLink} to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className={styleList}>
          <Link className={styleLink} to="/products">
            Products
          </Link>
        </li>
        <li className={styleList}>
          <Link className={styleLink} to="/report">
            Report
          </Link>
        </li>
        <li className={styleList}>
          <Link className={styleLink} to="/logout">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
