import React, { useEffect } from "react";
import axios from "./config.axios";
import global from "./global";

export default function Logout() {
  const urllogout = "/api/v1/logout";
  const frontURL = global.frontURL;

  async function clearSession() {
    try {
      const response = await axios.get(urllogout, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response.data);
      if (response.data.status == "success") {
        clearValueSession();
      }
    } catch (error) {
      console.log(error);
      clearValueSession();
    }
  }

  function clearValueSession() {
    localStorage.setItem("token", "");
    localStorage.setItem("refresh_token", "");
    localStorage.setItem("google_token", "");
    localStorage.setItem("auth", "");

    setTimeout(() => {
        window.location.href = frontURL + "/login";
      }, 2000);
  }

  useEffect(() => {
    clearSession();
  }, []);

  return (
    <section className="flex items-center justify-center min-h-screen text-slate-600">
      <div>
        <h1 className="text-3xl my-2">Logout from all session!</h1>
        <br />
        <h5>processing...</h5>
        <p>please wait for remove auth and redirection...</p>
      </div>
    </section>
  );
}
