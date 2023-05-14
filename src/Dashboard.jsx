import React from "react";
import Navbar from "./components/Navbar";
import Transaction from "./components/Transaction";
import Auth from "./components/Auth";

export default function Dashboard() {
  return (
    <div>
      <Auth />
      <section>
        <Navbar />
      </section>
      <section className="my-10">
        <Transaction />
      </section>
    </div>
  );
}