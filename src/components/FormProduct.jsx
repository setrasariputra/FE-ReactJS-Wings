import React, { useState } from "react";
import BaseButton from "./BaseButton";
import BaseAlert from "./BaseAlert";
import BaseInput from "./BaseInput";
import axios from "../config.axios";

export default function FormProduct(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [inputValues, setInputValues] = useState({
    id: "",
    product_code: "",
    product_name: "",
    price: "",
    discount: "",
    dimension: "",
    stock: 0,
  });
  const urllogin = "/api/v1/product/store";

  function handleInputChange(event) {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setIsLoading(true);

      const response = await axios({
        method: "post",
        url: urllogin,
        data: inputValues,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.status == "error") {
        showErrorMessage(response.data.message);
      }else
      if(response.data.status == 'success') {
        props.onSuccessSubmit(true)
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showErrorMessage("Invalid data.");
    }
  }

  function showErrorMessage(message) {
    setIsError(true);
    setErrorMsg(message);

    setTimeout(function () {
      hideErrorMessage();
    }, 5000);
  }

  function hideErrorMessage() {
    setIsError(false);
    setErrorMsg("");
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          {isError ? <BaseAlert message={errorMsg} /> : null}
          <div className="my-4">
            <label className="block">Product Code</label>
            <BaseInput
              type="text"
              name="product_code"
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className="my-4">
            <label className="block">Product Name</label>
            <BaseInput
              type="text"
              name="product_name"
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className="my-4">
            <label className="block">Price</label>
            <BaseInput
              type="number"
              name="price"
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className="my-4">
            <label className="block">Discount</label>
            <BaseInput
              type="number"
              name="discount"
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className="my-4">
            <label className="block">Dimension</label>
            <BaseInput
              type="text"
              name="dimension"
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className="my-4">
            <label className="block">Stock</label>
            <BaseInput
              type="number"
              name="stock"
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className="mt-10">
            <BaseButton
              type="submit"
              color="indigo"
              label="Submit Data"
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>
    </>
  );
}
