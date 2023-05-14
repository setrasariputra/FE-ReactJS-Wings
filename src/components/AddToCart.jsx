import React, { useEffect, useState } from "react";
import BaseButton from "./BaseButton";
import Skeleton from "./Skeleton";
import BaseDialog from "./BaseDialog";
import ProductDetail from "./ProductDetail";
import axios from "../config.axios";

export default function AddToCart(props) {
  const styleTable = "table-auto w-full text-sm text-slate-600 border rounded";
  const styleTR = "border-b";
  const styleTH = "text-left border-bottom p-4";
  const styleTD = "text-left p-4";

  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setLoadingProducts] = useState(false);
  const [isShowProductTable, setShowProductTable] = useState(false);
  const [isProductSelected, setProductSelected] = useState([]);
  const [productCart, setProductCart] = useState([]);
  const [isCheckoutDisabled, setCheckoutDisabled] = useState(true);

  const [isShowDialog, setIsShowDialog] = useState(false);

  const urlProducts = "/api/v1/products";

  const [displayProduct, setDisplayProduct] = useState("");

  const handleOnCloseDialog = (value) => {
    if (value == true) {
      setIsShowDialog(false);
    }
  };

  async function getProducts() {
    try {
      setLoadingProducts(true);
      const response = await axios({
        method: "get",
        url: urlProducts,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.status == "success") {
        setProducts(response.data.data);
        setLoadingProducts(false);
        setShowProductTable(true);
      }
    } catch (error) {
      console.log(error);
      setLoadingProducts(false);
    }
  }

  function handleProductDetail(row) {
    //console.log(row);
    setIsShowDialog(true);
    setProductSelected(row);
  }

  function handleBuy(index, row) {
    let choose = false;
    let cart = productCart;
    if (row.choose === undefined || row.choose === false) {
      choose = true;
      cart.push(row);
      setProductCart(cart);
    } else if (row.choose === true) {
      choose = false;
      // remove array
      const cartIndex = cart.indexOf(row);
      if (cartIndex !== -1) {
        cart.splice(cartIndex, 1);
        setProductCart(cart);
      }
    }

    console.log(productCart);

    // update productList
    let productList = products;
    productList[index].choose = choose;
    productList[index].qty = 1;
    productList[index].subtotal = row.sales_price;
    productList[index].display_subtotal = formatCurrency(row.sales_price);
    setProducts(productList);

    //console.log(products)

    disabledCheckout();

    // close dialog
    setIsShowDialog(false);
  }

  function disabledCheckout() {
    if (productCart.length > 0) {
      setCheckoutDisabled(false);
    } else {
      setCheckoutDisabled(true);
    }
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

  function handleCheckout() {
    props.onProductCartCheckout(productCart)
  }

  function handleReloadProduct(values) {
    if(values == true) {
        handleOnCloseDialog(values);
        getProducts();
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {isShowProductTable == false ? null : (
        <div>
          <table className={styleTable}>
            <thead>
              <tr className={styleTR}>
                <th className={styleTH} width="100px">Image</th>
                <th className={styleTH}>Price</th>
                <th className={styleTH}>Buy</th>
              </tr>
            </thead>
            <tbody>
              {products.map((row, index) => (
                <tr className={styleTR} key={row.id}>
                  <td className={styleTD}>
                  <div className="w-20 h-20 p-2 border border-slate-200 rounded cursor-pointer hover:drop-shadow-lg hover:border-indigo-300" onClick={() => handleProductDetail(row)}>
                  {row.image === null ? "" : (<img src={row.image.image_url} />)}
                  </div>
                  </td>
                  <td className={styleTD}>
                    <b>
                      <a
                        href="#"
                        className="text-sky-400 hover:text-sky-500"
                        onClick={() => handleProductDetail(row)}
                      >
                        {row.product_name}
                      </a>
                    </b>
                    <br />
                    {row.discount !== null ? (
                      <div>
                        <s className="text-red-400">{row.display_price}</s>
                        <br />
                      </div>
                    ) : null}
                    {row.display_sales_price}
                  </td>
                  <td className={styleTD}>
                    <input
                      type="checkbox"
                      onClick={() => handleBuy(index, row)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="my-6 text-center">
            <span onClick={handleCheckout}>
              <BaseButton
                type="button"
                label="Checkout"
                color="indigo"
                disabled={isCheckoutDisabled}
              />
            </span>
          </div>
        </div>
      )}
      {isLoadingProducts == true ? <Skeleton rows="5" /> : null}

      {isShowDialog == true ? (
        <BaseDialog title="Product Detail" onCloseDialog={handleOnCloseDialog}>
          <ProductDetail product_selected={isProductSelected} onReloadProduct={handleReloadProduct} />
        </BaseDialog>
      ) : null}
    </>
  );
}
