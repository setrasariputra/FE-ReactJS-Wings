import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Skeleton from "./components/Skeleton";
import Pagination from "./components/Pagination";
import Auth from "./components/Auth";
import axios from "./config.axios";

export default function Report() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowReportTable, setShowReportTable] = useState(false);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);

  const urlTransaction = "/api/v1/transaction";

  const styleTable = "table-auto w-full text-sm text-slate-600 border rounded";
  const styleTR = "border-b";
  const styleTH = "text-left border-bottom p-4";
  const styleTD = "text-left p-4";

  async function getTransaction() {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "get",
        url: urlTransaction,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.status == "success") {
        setTransactions(response.data.data);
        setShowReportTable(true);
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
    console.log(values)
    setCurrentPage(values);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    return (
      transaction.transaction.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  });

  const totalTransactions = filteredTransactions.length;
  const totalPages = Math.ceil(totalTransactions / transactionsPerPage);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  useEffect(() => {
    getTransaction();
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
            Report
          </h1>

          {isShowReportTable == false ? null : (
            <div>
              <div className="flex justify-between items-center my-6">
                <div className="w-1/3">
                  <input
                    type="text"
                    className="p-2 border rounded"
                    placeholder="Search Code"
                    value={search}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <table className={styleTable}>
                <thead>
                  <tr className={styleTR}>
                    <th className={styleTH}>Code</th>
                    <th className={styleTH}>User</th>
                    <th className={styleTH}>Total</th>
                    <th className={styleTH}>Date</th>
                    <th className={styleTH}>Item</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTransactions.map((row, index) => (
                    <tr className={styleTR} key={index}>
                      <td className={styleTD}>{row.transaction}</td>
                      <td className={styleTD}>{row.user}</td>
                      <td className={styleTD}>{row.display_total}</td>
                      <td className={styleTD}>{row.display_date}</td>
                      <td
                        className={styleTD}
                        dangerouslySetInnerHTML={{
                          __html: row.display_product_detail,
                        }}
                      ></td>
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
    </div>
  );
}
