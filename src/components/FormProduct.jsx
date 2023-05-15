import React, { useEffect, useState } from "react";
import BaseButton from "./BaseButton";
import BaseAlert from "./BaseAlert";
import BaseInput from "./BaseInput";
import axios from "../config.axios";

export default function FormProduct(props) {
  const productSelected = props.product_selected;
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
  });
  const urlStore = "/api/v1/product/store";
  const urlUpdate = "/api/v1/product/update";

  function handleInputChange(event) {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setIsLoading(true);

      let url = urlStore;
      if(inputValues.id != "") {
        url = urlUpdate
      }

      const response = await axios({
        method: "post",
        url: url,
        data: inputValues,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.status == "error") {
        showErrorMessage(response.data.message);
      } else if (response.data.status == "success") {
        props.onSuccessSubmit(true);
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

  function resetFormValue() {
    if (Object.keys(productSelected).length == 0) {
      setInputValues({
        id: "",
        product_code: "",
        product_name: "",
        price: "",
        discount: "",
        dimension: "",
      });
    }
  }

  function setValuesFromProductSelected() {
    if (Object.keys(productSelected).length > 0) {
      let discountValue = productSelected.discount;
      if(productSelected.discount === null) {
        discountValue = "";
      }
      setInputValues({
        id: productSelected.id,
        product_code: productSelected.product_code,
        product_name: productSelected.product_name,
        price: productSelected.price,
        discount: discountValue,
        dimension: productSelected.dimension,
      });

      console.log(productSelected);
    }
  }

  useEffect(() => {
    resetFormValue();
    setValuesFromProductSelected();
  }, []);

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
              value={inputValues.product_code}
              maxlength="18"
              required={true}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className="my-4">
            <label className="block">Product Name</label>
            <BaseInput
              type="text"
              name="product_name"
              value={inputValues.product_name}
              maxlength="30"
              required={true}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className="my-4">
            <label className="block">Price</label>
            <BaseInput
              type="number"
              name="price"
              value={inputValues.price}
              maxlength="255"
              required={true}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className="my-4">
            <label className="block">Discount</label>
            <BaseInput
              type="number"
              name="discount"
              value={inputValues.discount}
              maxlength="255"
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className="my-4">
            <label className="block">Dimension</label>
            <BaseInput
              type="text"
              name="dimension"
              value={inputValues.dimension}
              maxlength="50"
              required={true}
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
