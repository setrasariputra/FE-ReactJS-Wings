import React, { useEffect, useState } from "react";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import Skeleton from "./components/Skeleton";
import Pagination from "./components/Pagination";
import BaseButton from "./components/BaseButton";
import BaseDialog from "./components/BaseDialog";
import FormProduct from "./components/FormProduct";
import FormProductDelete from "./components/FormProductDelete";
import axios from "./config.axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowProductTable, setShowProductTable] = useState(false);

  const [isShowDialog, setIsShowDialog] = useState(false);
  const [isShowFormProduct, setShowFormProduct] = useState(false);
  const [isShowFormDelete, setShowFormDelete] = useState(false);

  const [productSelected, setProductSelected] = useState([]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  const urlProducts = "/api/v1/products";

  const styleTable = "table-auto w-full text-sm text-slate-600 border rounded";
  const styleTR = "border-b";
  const styleTH = "text-left border-bottom p-4";
  const styleTD = "text-left p-4";

  async function getProduct() {
    try {
      setIsLoading(true);
      setShowProductTable(false);
      const response = await axios({
        method: "get",
        url: urlProducts,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.status == "success") {
        setProducts(response.data.data);
        setShowProductTable(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (values) => {
    console.log(values);
    setCurrentPage(values);
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.product_name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  });

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleOnCloseDialog = (value) => {
    if (value == true) {
      setIsShowDialog(false);
      setShowFormProduct(false);
      setProductSelected([]);
    }
  };

  function handleShowDialogProductForm() {
    setIsShowDialog(true);
    setShowFormProduct(true);
    setShowFormDelete(false);
  }

  function handleShowDialogProductDelete(row) {
    setIsShowDialog(true);
    setShowFormProduct(false);
    setShowFormDelete(true);
    setProductSelected(row);
  }

  function handleSuccessSubmit(values) {
    if (values == true) {
      setIsShowDialog(false);
      getProduct();
    }
  }

  function handleSuccessDelete(values) {
    if (values == true) {
      setIsShowDialog(false);
      getProduct();
    }
  }

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div>
      <Auth />
      <section>
        <Navbar />
      </section>
      <section className="my-10">
        <div className="border w-11/12 m-auto border-slate-200 p-4 rounded">
          <h1 className="text-center my-6 text-xl font-bold text-slate-500">
            Products
          </h1>

          {isShowProductTable == false ? null : (
            <div>
              <div className="flex justify-between items-center my-6">
                <div className="flex-none w-1/2">
                  <input
                    type="text"
                    className="p-2 border rounded"
                    placeholder="Search Code"
                    value={search}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="flex-initial w-1/2 text-right">
                  <span onClick={handleShowDialogProductForm}>
                    <BaseButton label="Add Data" type="button" color="indigo" />
                  </span>
                </div>
              </div>
              <table className={styleTable}>
                <thead>
                  <tr className={styleTR}>
                    <th className={styleTH}>Image</th>
                    <th className={styleTH}>Code</th>
                    <th className={styleTH}>Name</th>
                    <th className={styleTH}>Discount(%)</th>
                    <th className={styleTH}>Price</th>
                    <th className={styleTH}>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((row, index) => (
                    <tr className={styleTR} key={index}>
                      <td className={styleTD}>Image</td>
                      <td className={styleTD}>{row.product_code}</td>
                      <td className={styleTD}>{row.product_name}</td>
                      <td className={styleTD}>{row.discount}</td>
                      <td className={styleTD}>
                        {row.discount !== null ? (
                          <div>
                            <s className="text-red-400">{row.display_price}</s>
                            <br />
                          </div>
                        ) : null}
                        {row.display_sales_price}
                      </td>
                      <td className={styleTD}>
                        <div className="flex">
                          <a href="#" title="Modify">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 text-indigo-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </a>
                          &nbsp;&nbsp;
                          <a
                            href="#"
                            title="Delete"
                            onClick={() => handleShowDialogProductDelete(row)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 text-red-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="my-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onHandlePageChange={handlePageChange}
                />
              </div>
            </div>
          )}
          {isLoading == true ? <Skeleton rows="5" /> : null}
        </div>
      </section>

      {isShowDialog == true ? (
        <BaseDialog title="Product Form" onCloseDialog={handleOnCloseDialog}>
          <div>
            {isShowFormProduct == true ? (
              <FormProduct onSuccessSubmit={handleSuccessSubmit} />
            ) : null}
            {isShowFormDelete == true ? (
              <FormProductDelete
                product_selected={productSelected}
                onSuccessDelete={handleSuccessDelete}
              />
            ) : null}
          </div>
        </BaseDialog>
      ) : null}
    </div>
  );
}
