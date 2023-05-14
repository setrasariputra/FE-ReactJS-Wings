import React, { useState } from "react";
import BaseButton from "./BaseButton";
import BaseInput from "./BaseInput";
import BaseAlert from "./BaseAlert";
import global from "../global";
import axios from "../config.axios";

export default function FormLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const urllogin = "/api/v1/login";
  const frontURL = global.frontURL;
  const [inputValues, setInputValues] = useState({
    user: "",
    password: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  function showErrorMessage(message) {
    setIsError(true);
    setErrorMsg(message);

    setTimeout(function() {
      hideErrorMessage();
    }, 5000)
  }

  function hideErrorMessage() {
    setIsError(false);
    setErrorMsg('');
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setIsLoading(true);
      const response = await axios({
        method: "post",
        url: urllogin,
        data: inputValues,
      });
      console.log(response.data);
      if (response.data.status == "error") {
        showErrorMessage(response.data.message);
        setIsLoading(false);
      } else if (response.data.status == "success") {
        let dataAuth = JSON.stringify(response.data.auth);
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        localStorage.setItem("auth", dataAuth);

        window.location.href = frontURL + "/dashboard";
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showErrorMessage('Invalid login access.');
    }
  }

  return (
    <>
      <section className="flex items-center justify-center min-h-screen text-slate-600">
        <div className="w-96 py-10 px-4 border border-inherit rounded-md">
          <h1 className="text-center text-3xl">#Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="my-10">
              {isError ? <BaseAlert message={errorMsg} /> : null}
              <div className="my-4">
                <label className="block">Username</label>
                <BaseInput
                  type="text"
                  name="user"
                  onChange={(event) => handleInputChange(event)}
                />
              </div>
              <div className="my-4">
                <label className="block">Password</label>
                <BaseInput
                  type="password"
                  name="password"
                  onChange={(event) => handleInputChange(event)}
                />
              </div>
              <div className="my-4">
                <BaseButton type="submit" color="indigo" label="Sign in" isLoading={isLoading} />
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
