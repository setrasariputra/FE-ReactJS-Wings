import React from "react";
import Navbar from "./components/Navbar";
import Transaction from "./components/Transaction";

export default function Dashboard() {
  return (
    <div>
      <section>
        <Navbar />
      </section>
      <section className="my-10">
        <Transaction />
      </section>
    </div>
  );
}