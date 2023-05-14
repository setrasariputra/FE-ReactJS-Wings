import React, { useState } from "react";
import BaseButton from "./BaseButton";
import axios from "../config.axios";

export default function FormProductDelete(props) {
  const [isLoading, setIsLoading] = useState(false);
  const productSelected = props.product_selected;

  const urlDelete = "/api/v1/product/delete";

  async function handleDelete() {
    try {
      setIsLoading(true);
      
      const response = await axios({
        method: "get",
        url: urlDelete+'/'+productSelected.id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if(response.data.status == 'success') {
        props.onSuccessDelete(true)
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  return (
    <div>
      <h1 className="text-red-800 text-xl mb-4">
        Are you sure want to delete?
      </h1>
      <div>
        Product Code: <b>{productSelected.product_code}</b>
        <br />
        Product Name: <b>{productSelected.product_name}</b>
      </div>
      <div className="mt-9">
        <span onClick={handleDelete}>
          <BaseButton
            type="button"
            label="Yes! Delete"
            color="red"
            isLoading={isLoading}
          />
        </span>
      </div>
    </div>
  );
}
