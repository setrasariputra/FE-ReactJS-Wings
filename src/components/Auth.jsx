import React, { useEffect } from "react";
import global from "../global";

export default function Auth() {
  const frontURL = global.frontURL;

  function checkToken() {
    const token = localStorage.getItem("token");
    const refresh_token = localStorage.getItem("refresh_token");
    const auth = localStorage.getItem("auth");

    if (token == "" || refresh_token == "" || auth == "") {
      window.location.href = frontURL + "/login";
    }
  }

  useEffect(() => {
    checkToken();
  }, []);
  return <></>;
}
