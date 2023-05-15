import React, { useEffect, useState } from "react";
import BaseButton from "./BaseButton";
import axios from "../config.axios";

export default function ConfirmCheckout(props) {
  const [productCart, setProductCart] = useState(props.product_cart);
  const [total, setTotal] = useState(0);
  const [displayTotal, setDisplayTotal] = useState("Rp. 0");
  const [isLoading, setIsLoading] = useState(false);

  const urlCheckout = "/api/v1/transaction/checkout";

  const styleTable = "table-auto w-full text-sm text-slate-600 border rounded";
  const styleTR = "border-b";
  const styleTH = "text-left border-bottom p-4";
  const styleTD = "text-left p-4";

  function handlePreviousStep() {
    props.onPreviousStep("addtocart");
  }

  function handleUpdateQtyCartProduct(type, index, qty) {
    if (type == "up") {
      let new_qty = qty + 1;
      let new_subtotal = productCart[index].sales_price * new_qty;
      productCart[index].qty = new_qty;
      productCart[index].subtotal = new_subtotal;
      productCart[index].display_subtotal = formatCurrency(new_subtotal);
    } else {
      if (qty > 1) {
        let new_qty = qty - 1;
        let new_subtotal = productCart[index].sales_price * new_qty;
        productCart[index].qty = new_qty;
        productCart[index].subtotal = new_subtotal;
        productCart[index].display_subtotal = formatCurrency(new_subtotal);
      }
    }

    updateTotal();
  }

  function updateTotal() {
    let new_total = 0;
    for (let x in productCart) {
      new_total = new_total + productCart[x].qty * productCart[x].sales_price;
    }
    setTotal(new_total);
    setDisplayTotal(formatCurrency(new_total));
  }

  function formatCurrency(value) {
    let result = "";
    let intPart = Math.floor(value);

    result = intPart.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });

    return result;
  }

  async function handleCheckoutConfirm() {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "post",
        url: urlCheckout,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          product_cart: productCart,
        },
      });
      console.log(response.data);
      if (response.data.status == "error") {
        console.log(response.data.message);
      } else if (response.data.status == "success") {
        props.onSuccessConfirmCheckout(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    updateTotal();
  }, []);

  return (
    <>
      <div className="mb-6">
        <span onClick={handlePreviousStep}>
          <BaseButton type="button" label="Previous Step" color="plain" />
        </span>
      </div>
      <div>
        <div className="h-80 overflow-y-scroll">
          <table className={styleTable}>
            <thead>
              <tr className={styleTR}>
                <th className={styleTH}>Image</th>
                <th className={styleTH}>Cart</th>
              </tr>
            </thead>
            <tbody>
              {productCart.map((row, index) => (
                <tr className={styleTR} key={row.id}>
                  <td className={styleTD}>
                  <div
                        className="w-20 h-20 p-2 border border-slate-200 rounded cursor-pointer hover:drop-shadow-lg hover:border-indigo-300"
                      >
                        {row.image === null ? (
                          ""
                        ) : (
                          <img src={row.image.image_url} />
                        )}
                      </div>
                  </td>
                  <td className={styleTD}>
                    <div>
                      <b>{row.product_name}</b>
                    </div>
                    <div className="inline-block border border-slate-300 my-2">
                      <ul>
                        <li
                          onClick={() =>
                            handleUpdateQtyCartProduct("down", index, row.qty)
                          }
                          className="inline-block px-4 py-2 cursor-pointer hover:text-indigo-500"
                        >
                          -
                        </li>
                        <li className="inline-block px-4 py-2">{row.qty}</li>
                        <li
                          onClick={() =>
                            handleUpdateQtyCartProduct("up", index, row.qty)
                          }
                          className="inline-block px-4 py-2 cursor-pointer hover:text-indigo-500"
                        >
                          +
                        </li>
                      </ul>
                    </div>
                    &nbsp;{row.unit}
                    <div>Subtotal: {row.display_subtotal}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-10 text-slate-600">
          <h2 className="text-xl my-4">TOTAL: {displayTotal}</h2>
          <div>
            <span onClick={handleCheckoutConfirm}>
              <BaseButton
                label="Confirm"
                color="indigo"
                type="button"
                isLoading={isLoading}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
