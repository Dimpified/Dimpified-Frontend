import React, { useState } from "react";
import { Heading, Text } from "../../Text";

const PaymentHistories = ({ withdrawHistory, transactionHistory }) => {
  const [activeTab, setActiveTab] = useState("transaction");
  const [transactionPage, setTransactionPage] = useState(1);
  const [withdrawPage, setWithdrawPage] = useState(1);
  const itemsPerPage = 10;

  // Dummy transaction data remains unchanged
  const transactionRequests = transactionHistory?.data || [];

  // Replace dummyWithdrawData with withdrawHistory.withdrawalRequests
  const withdrawalRequests = withdrawHistory?.withdrawalRequests || [];

  const transactionDataToDisplay = transactionRequests.slice(
    (transactionPage - 1) * itemsPerPage,
    transactionPage * itemsPerPage
  );

  const withdrawDataToDisplay = withdrawalRequests.slice(
    (withdrawPage - 1) * itemsPerPage,
    withdrawPage * itemsPerPage
  );

  const totalTransactionPages = Math.ceil(
    transactionRequests.length / itemsPerPage
  );
  const totalWithdrawPages = Math.ceil(
    withdrawalRequests.length / itemsPerPage
  );

  const handleTransactionPrevPage = () => {
    if (transactionPage > 1) {
      setTransactionPage(transactionPage - 1);
    }
  };

  // Function to format date to "10 Oct 2024"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Function to format time to "10:30 AM"
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleTransactionNextPage = () => {
    if (transactionPage < totalTransactionPages) {
      setTransactionPage(transactionPage + 1);
    }
  };

  const handleWithdrawPrevPage = () => {
    if (withdrawPage > 1) {
      setWithdrawPage(withdrawPage - 1);
    }
  };

  const handleWithdrawNextPage = () => {
    if (withdrawPage < totalWithdrawPages) {
      setWithdrawPage(withdrawPage + 1);
    }
  };

  return (
    <div className="w-full my-10 bg-primary1 shadow-md rounded-lg overflow-hidden">
      <Heading
        level={2}
        weight="font-bold"
        className="lg:text-2xl text-lg font-bold mb-4 px-4"
      >
        {activeTab === "transaction"
          ? "Transaction History"
          : "Withdraw History"}
      </Heading>

      <div className="flex border-b mt-8">
        <button
          className={`lg:px-4 px-2 py-1 lg:py-2 text-sm lg:text-lg  ${
            activeTab === "transaction" ? "border-b-2 border-primary3" : ""
          }`}
          onClick={() => setActiveTab("transaction")}
        >
          Transaction History
        </button>
        <button
          className={`lg:px-4 px-2 py-1 lg:py-2 text-sm lg:text-lg ${
            activeTab === "withdraw" ? "border-b-2 border-primary3" : ""
          }`}
          onClick={() => setActiveTab("withdraw")}
        >
          Withdraw History
        </button>
      </div>

      <div className="overflow-x-auto mx-3 mt-4 mb-4">
        {activeTab === "transaction" ? (
          <>
            {transactionDataToDisplay.length === 0 ? (
              <div className="flex justify-center items-center p-10">
                <Text className="text-ter6">No recent transactions found.</Text>
              </div>
            ) : (
              <table className="min-w-full bg-primary1 border border-sec1">
                <thead>
                  <tr className="border-b-2">
                    <th className="py-4 px-4 border-b text-left">ID</th>
                    <th className="py-4 px-4 border-b text-left"> User Name</th>
                    <th className="py-4 px-4 border-b text-left">
                      Payment Method
                    </th>
                    <th className="py-4 px-4 border-b text-left">Date</th>
                    <th className="py-4 px-4 border-b text-left">Time</th>
                    <th className="py-4 px-4 border-b text-left">Amount</th>
                    <th className="py-4 px-4 border-b text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionDataToDisplay.map((activity) => (
                    <tr key={activity.id} className="hover:bg-sec1">
                      <td className="pb-2 pt-6 px-4 border-b">
                        TH{activity.id}PD
                      </td>
                      <td className="pb-2 pt-6 px-4 border-b">
                        {activity.EcosystemUser.username}
                      </td>
                      <td className="pb-2 pt-6 px-4 border-b">
                        {activity.paymentMethod}
                      </td>
                      <td className="pb-2 pt-6 px-4 border-b">
                        {formatDate(activity.transactionDate)}
                      </td>
                      <td className="pb-2 pt-6 px-4 border-b">
                        {formatTime(activity.transactionDate)}
                      </td>
                      <td className="pb-2 pt-6 px-4 border-b">
                        {activity.amount}
                      </td>
                      <td className="pb-2 pt-6 px-4 border-b">
                        <span
                          className={`w-2 h-2 mr-2 inline-block rounded-full ${
                            activity.status === "paid"
                              ? "bg-ter8"
                              : activity.status === "unpaid"
                              ? "bg-ter7"
                              : "bg-ter9"
                          }`}
                        ></span>
                        <span
                          className={`font-semibold ${
                            activity.status === "paid"
                              ? "text-ter8"
                              : activity.status === "unpaid"
                              ? "text-ter7"
                              : "text-ter9"
                          }`}
                        >
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {totalTransactionPages > 1 && (
              <div className="flex justify-center my-4">
                <button
                  className={`px-3 py-1 mx-1 rounded ${
                    transactionPage === 1
                      ? "bg-sec1 cursor-not-allowed"
                      : "bg-primary3 text-primary1"
                  }`}
                  onClick={handleTransactionPrevPage}
                  disabled={transactionPage === 1}
                >
                  &lt;
                </button>

                {Array.from({ length: totalTransactionPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`px-3 py-1 mx-1 rounded ${
                      transactionPage === i + 1
                        ? "bg-primary3 text-primary1"
                        : "bg-sec1"
                    }`}
                    onClick={() => setTransactionPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  className={`px-3 py-1 mx-1 rounded ${
                    transactionPage === totalTransactionPages
                      ? "bg-sec1 cursor-not-allowed"
                      : "bg-primary3 text-primary1"
                  }`}
                  onClick={handleTransactionNextPage}
                  disabled={transactionPage === totalTransactionPages}
                >
                  &gt;
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {withdrawDataToDisplay.length === 0 ? (
              <div className="flex justify-center items-center p-10">
                <Text className="text-ter6">No recent withdrawals found.</Text>
              </div>
            ) : (
              <table className="min-w-full bg-primary1 border border-sec1">
                <thead>
                  <tr className="border-b-2">
                    <th className="py-4 px-4 border-b text-left">ID</th>
                    <th className="py-4 px-4 border-b text-left">Name</th>
                    <th className="py-4 px-4 border-b text-left">Amount</th>
                    <th className="py-4 px-4 border-b text-left">Method</th>
                    <th className="py-4 px-4 border-b text-left">Date</th>
                    <th className="py-4 px-4 border-b text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawDataToDisplay.map((withdrawal) => (
                    <tr key={withdrawal.id} className="hover:bg-sec1">
                      <td className="pb-2 pt-6 px-4 border-b">
                        #WH{withdrawal.id}PD
                      </td>
                      <td className="pb-2 pt-6 px-4 border-b">
                        {withdrawal.Account.accountName}
                      </td>
                      <td className="pb-2 pt-6 px-4 border-b">
                        {withdrawal.amount}
                      </td>
                      <td className="pb-2 pt-6 px-4 border-b">Bank Transfer</td>
                      <td className="pb-2 pt-6 px-4 border-b">
                        {formatDate(withdrawal.createdAt)}
                      </td>
                      <td className="pb-2 pt-6 px-4 border-b">
                        <span
                          className={`w-2 h-2 mr-2 inline-block rounded-full ${
                            withdrawal.status === "completed"
                              ? "bg-ter8"
                              : "bg-ter7"
                          }`}
                        ></span>
                        <span
                          className={`font-semibold ${
                            withdrawal.status === "completed"
                              ? "text-ter8"
                              : "text-ter7"
                          }`}
                        >
                          {withdrawal.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {totalWithdrawPages > 1 && (
              <div className="flex justify-center my-4">
                <button
                  className={`px-3 py-1 mx-1 rounded ${
                    withdrawPage === 1
                      ? "bg-sec1 cursor-not-allowed"
                      : "bg-primary3 text-primary1"
                  }`}
                  onClick={handleWithdrawPrevPage}
                  disabled={withdrawPage === 1}
                >
                  &lt;
                </button>

                {Array.from({ length: totalWithdrawPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`px-3 py-1 mx-1 rounded ${
                      withdrawPage === i + 1
                        ? "bg-primary3 text-primary1"
                        : "bg-sec1"
                    }`}
                    onClick={() => setWithdrawPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  className={`px-3 py-1 mx-1 rounded ${
                    withdrawPage === totalWithdrawPages
                      ? "bg-sec1 cursor-not-allowed"
                      : "bg-primary3 text-primary1"
                  }`}
                  onClick={handleWithdrawNextPage}
                  disabled={withdrawPage === totalWithdrawPages}
                >
                  &gt;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentHistories;
