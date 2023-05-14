import React, { useEffect, useState } from "react";
import AddToCart from "./AddToCart";
import ConfirmCheckout from "./ConfirmCheckout";
import SuccessCheckout from "./SuccessCheckout";

export default function Transaction() {
  const [isAddToCartStep, setAddToCartStep] = useState(true);
  const [isConfirmCheckoutStep, setConfirmCheckoutStep] = useState(false);
  const [isSuccessCheckoutStep, setSuccessCheckoutStep] = useState(false);
  const [productCart, setProductCart] = useState([]);

  const [styleStep01, setStyleStep01] = useState("");
  const [styleStep02, setStyleStep02] = useState("");
  const [styleStep03, setStyleStep03] = useState("");

  function title() {
    return <b>Transaction</b>;
  }

  function handleProductCartCheckout(values) {
    setProductCart(values);
    showConfirmCheckoutStep();
  }

  function handlePreviousStep(values) {
    switch (values) {
      case "addtocart":
        showAddToCartStep();
        break;
    }
  }

  function handleCreateNewTransaction(values) {
    showAddToCartStep();
  }

  function showAddToCartStep() {
    setAddToCartStep(true);
    setConfirmCheckoutStep(false);
    setSuccessCheckoutStep(false);

    let styleStep01 = 'flex-none w-1/3 p-2 border-t-2 border-indigo-500';
    let styleStep02 = 'flex-initial p-2 w-1/3';
    let styleStep03 = 'flex-initial p-2 w-1/3';

    setStyleStep01(styleStep01)
    setStyleStep02(styleStep02)
    setStyleStep03(styleStep03)
  }

  function showConfirmCheckoutStep() {
    setAddToCartStep(false);
    setConfirmCheckoutStep(true);
    setSuccessCheckoutStep(false);

    let styleStep01 = 'flex-none w-1/3 p-2 border-t-2 border-indigo-500';
    let styleStep02 = 'flex-initial p-2 w-1/3 border-t-2 border-indigo-500';
    let styleStep03 = 'flex-initial p-2 w-1/3';

    setStyleStep01(styleStep01)
    setStyleStep02(styleStep02)
    setStyleStep03(styleStep03)

  }

  function showSuccessCheckoutStep() {
    setAddToCartStep(false);
    setConfirmCheckoutStep(false);
    setSuccessCheckoutStep(true);

    let styleStep01 = 'flex-none w-1/3 p-2 border-t-2 border-indigo-500';
    let styleStep02 = 'flex-initial p-2 w-1/3 border-t-2 border-indigo-500';
    let styleStep03 = 'flex-initial p-2 w-1/3 border-t-2 border-indigo-500';

    setStyleStep01(styleStep01)
    setStyleStep02(styleStep02)
    setStyleStep03(styleStep03)
  }

  function handleSuccessConfirmCheckout(values) {
    showSuccessCheckoutStep();
  }

  useEffect(() => {
    showAddToCartStep();
  }, []);

  return (
    <>
      <div className="transaction-height max-w-lg py-10 px-4 m-auto overflow-y-scroll border border-inherit rounded-md">
        <h1 className="text-center text-3xl my-4 text-slate-600">{title()}</h1>

        <div className="flex gap-2 my-6 text-sm text-slate-600">
          <div className={styleStep01}>
            <span className="text-indigo-500">Step 1</span><br />
            <b>AddToCart</b>
          </div>
          <div className={styleStep02}>
            <span className="text-indigo-500">Step 2</span><br />
            <b>Checkout</b>
          </div>
          <div className={styleStep03}>
            <span className="text-indigo-500">Step 3</span><br />
            <b>Success</b>
          </div>
        </div>

        {isAddToCartStep == true ? (
          <AddToCart onProductCartCheckout={handleProductCartCheckout} />
        ) : null}
        {isConfirmCheckoutStep == true ? (
          <ConfirmCheckout product_cart={productCart} onPreviousStep={handlePreviousStep} onSuccessConfirmCheckout={handleSuccessConfirmCheckout}/>
        ) : null}
        {isSuccessCheckoutStep == true ? <SuccessCheckout onCreateNewTransaction={handleCreateNewTransaction} /> : null}
      </div>
    </>
  );
}
