// import node module libraries
import React, { useState, useMemo, useEffect } from "react";
import { Form, Link, useParams } from "react-router-dom";
import { ArrowDown, ChevronLeft, ChevronRight } from "react-feather";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ReactPaginate from "react-paginate";
import { showToast } from "../../../component/ShowToast";
import { Trash, Edit, MoreVertical } from "react-feather";
import { useSelector } from "react-redux";

import AxiosInterceptor from "../../../component/AxiosInterceptor";

// import custom components
import ApexCharts from "../../../component/affiliate/charts/ApexCharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
// import utility file
import { numberWithCommas } from "../../../data/utils";

// import data files
// import { WithdrawHistoryData } from "../../data/marketing/WithdrawHistoryData";
import {
  PayoutChartSeries,
  PayoutChartOptions,
} from "../../../component/affiliate/charts/ChartData";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import {
  ButtonForTabs,
  ButtonSmallPurple,
  ButtonSmallWhite,
} from "../../../component/Buttons";
import { LoadingSmall } from "../../../component/LoadingSpinner";
import api from "../../../api/Afiliate";
import { Heading, Text, TextSpan } from "../../../component/Text";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import {
  LongInputWithPlaceholder,
  ShortInputWithPlaceholder,
} from "../../../component/Inputs";

const Payouts = () => {
  const authFetch = AxiosInterceptor();

  const userId = useSelector(
    (state) => state.auth.user?.data?.AffiliateId || "Unknown User"
  );

  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const [filtering, setFiltering] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [withdrawnAmount, setWithdrawnAmount] = useState("");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [bankData, setBankData] = useState([]);
  const nairaSign = "\u20A6";
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [currency, setCurrency] = useState("");
  const [bankName, setBankName] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedBankId, setSelectedBankId] = useState("");
  const [error, setError] = useState("");
  const [errorAcc, setErrorAcc] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedAccount, setEditedAccount] = useState(null);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);
  const [percentage, setPercentage] = useState(null);
  const [banks, setBanks] = useState([]);
  const [bankLoading, setBankLoading] = useState(false);
  const [bankCode, setBankCode] = useState("");
  const [loadingVerify, setLoadingVerify] = useState(false);

  const [earnings, setEarnings] = useState({
    Naira: 0,
    Dollar: 0,
  });

  const handleShare = async () => {
    try {
      const response = await api.affiliateHandleShare({
        AffiliateId: userId,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.log("handleShare error", error);
    }
  };

  const [selectedCurrency, setSelectedCurrency] = useState("Naira");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (event) => {
    setSelectedBankId(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.affiliatePayoutEarning({
        accessToken,
        refreshToken,
        userId,
      });

      if (response.data) {
        if (
          response.data.affiliateEarning !== undefined &&
          response.data.affiliateEarning !== undefined
        ) {
          setEarnings(response.data.affiliateEarning);
        } else {
          setEarnings(0);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    setDropdownOpen(false);
  };

  const formatPrice = (currencyName) => {
    switch (currencyName) {
      case "naira":
      case "Naira":
        return `₦`;
      case "dollars":
      case "Dollar":
        return `$`;
      default:
        return `₦`;
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const accountsPerPage = 3;

  // Calculate the total number of pages
  const pageCount = Math.ceil(bankData.length / accountsPerPage);

  // Function to handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Get current accounts
  const indexOfLastAccount = (currentPage + 1) * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = bankData.slice(
    indexOfFirstAccount,
    indexOfLastAccount
  );

  // Function to retrieve bank data from the server
  const fetchBankData = async () => {
    try {
      const response = await api.affiliatePayoutBankData({
        accessToken,
        refreshToken,
        userId,
      });
      if (
        response.data.accountDetails &&
        response.data.accountDetails.length > 0
      ) {
        const fetchedBankData = response.data.accountDetails;
        setBankData(fetchedBankData);
      } else {
        setBankData([]);
      }
    } catch (error) {
      console.error("Error fetching bank data:", error);
    }
  };
  useEffect(() => {
    // Fetch bank data from server
    fetchBankData();
  }, [userId]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await api.affiliatePayoutFetchBanks({
          accessToken,
          refreshToken,
        });
        setBanks(response.data.allBanks.data);
      } catch (error) {
        console.error("Error fetching banks:", error);
        showToast("Failed to load banks.");
      }
    };
    fetchBanks();
  }, []);

  useEffect(() => {
    const verifyAccount = async () => {
      if (accountNumber.length === 10 && bankCode) {
        setLoadingVerify(true);
        try {
          const response = await api.affiliatePayoutVerifyAccount({
            accessToken,
            refreshToken,
            accountNumber,
            bankCode,
          });

          if (
            response.data.verifyDetails &&
            response.data.verifyDetails.status === true
          ) {
            setAccountName(response.data.verifyDetails.data.account_name);
            showToast("Account verified successfully.");
          } else {
            showToast("Bank verification failed. Please check the details.");
            setAccountName("");
          }
        } catch (error) {
          console.error("Error verifying bank details:", error);
          showToast("Error verifying bank details. Please try again.");
          setAccountName("");
        } finally {
          setLoadingVerify(false);
        }
      }
    };

    if (accountNumber.length === 10) {
      verifyAccount();
    }
  }, [accountNumber, bankCode]);

  const handleSave = async () => {
    if (!bankCode || !accountNumber || !accountName) {
      showToast(
        "Please complete all fields and ensure the account is verified."
      );
      return;
    }
    setLoadingSave(true);
    try {
      const saveBankData = await api.affiliatePayoutHandleSave({
        accessToken,
        refreshToken,
        userId,
        accountName,
        accountNumber,
        bankName: bankCode,
        currency,
      });

      setBankData([...bankData, saveBankData.data.newAccount]);

      showToast(saveBankData.data.message);
    } catch (error) {
      console.error("Error saving bank details:", error);
      showToast(error.response?.data?.message || "An error occurred");
    } finally {
      setLoadingSave(false);
    }

    setShowModal(false);
  };

  const handleAddAccount = () => {
    setShowModal(true);
  };

  const handleEdit = (id) => {
    const accountToEdit = currentAccounts.find((account) => account.id === id);
    if (accountToEdit) {
      setEditedAccount({ ...accountToEdit, accountId: id });
      setShowEditModal(true);
    } else {
      console.error("Account not found");
    }
  };

  const handleEditSave = async () => {
    setLoadingWithdraw(true);
    try {
      await api.affiliateHandleEditSave({
        affiliateId: userId,
        accountId: editedAccount.accountId,
        accountName: editedAccount.accountName,
        bankName: editedAccount.bankName,
        accountNumber: editedAccount.accountNumber,
        // currency: editedAccount.currency,
      });
      fetchBankData();

      setShowEditModal(false);
      showToast("Account updated successfully");
    } catch (error) {
      console.error("Error editing account:", error);
      showToast("Error updating bank details");
    } finally {
      setLoadingWithdraw(false);
    }
  };

  const handleWithdraw = async () => {
    if (!selectedBankId) {
      setErrorAcc("Please select a bank account.");
      return;
    }
    setLoading(true);

    try {
      const withdrawAmountNumeric = parseFloat(withdrawnAmount);
      const totalAmountNumeric = parseFloat(totalAmount);
      if (withdrawAmountNumeric < totalAmountNumeric) {
        const response = await api.affiliatePayoutHandleWithdraw({
          affiliateId: parseFloat(userId),
          accountId: selectedBankId,
          amount: parseFloat(withdrawnAmount),
          currency: selectedCurrency,
        });
        showToast(response.data.message);
        fetchData();
        setLoading(false);
        setErrorAcc("");
        setError("");
        setShowWithdrawModal(false);
      } else {
        setLoading(false);
        setError("Insufficient Amount.");
        setShowWithdrawModal(true);
      }
    } catch (error) {
      setLoading(false);
      setErrorAcc("");
      setError("");
      showToast(error.response.data.message);
    }
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="flex items-center justify-center w-8 h-8 bg-transparent rounded-full hover:bg-gray-200"
    >
      {children}
    </Link>
  ));

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ getValue }) => {
          return "#" + getValue();
        },
      },
      { accessorKey: "method", header: "Method" },
      { accessorKey: "date", header: "Date" },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ getValue }) => {
          return nairaSign + numberWithCommas(getValue());
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          return (
            <span
              className={`inline-block px-2 py-1 text-white rounded ${
                getValue() === "Pending"
                  ? "bg-yellow-500"
                  : getValue() === "completed"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {getValue()}
            </span>
          );
        },
      },
    ],
    []
  );

  // const historyData = WithdrawHistoryData();

  // const table = useReactTable({
  //   data: historyData,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   state: {
  //     globalFilter: filtering,
  //     rowSelection,
  //   },
  //   enableRowSelection: true,
  //   onRowSelectionChange: setRowSelection,
  //   onGlobalFilterChange: setFiltering,
  //   debugTable: false,
  // });

  const bankCurrency = [
    { value: "", label: "Select currency" },
    { value: "NGN", label: "Naira" },
    { value: "USD", label: "Dollars" },
  ];

  const AlertDismissible = () => {
    const [show, setShow] = useState(true);
    if (show) {
      return (
        <div
          className="relative p-4 mb-4 text-sm bg-warn1 rounded-lg"
          role="alert"
        >
          <Heading
            level="3"
            className="mb-2 text-sec5"
            size="lg"
            color=""
            weight="font-semibold"
            font="font-body"
            lineHeight="leading-1"
          >
            payout@dimpified.com
          </Heading>
          <TextSpan
            className="text-sec5"
            size="sm"
            color=""
            weight="font-semibold"
            lineHeight="leading-none"
          >
            You will receive your money in your bank account after two business
            working days of making a withdrawal request.
          </TextSpan>

          <ButtonForTabs
            type="button"
            className="absolute top-0 right-0 p-1.5 mt-1.5 mr-1.5 inline-flex items-center justify-center text-gray-400 rounded-lg hover:bg-gray-200 hover:text-gray-900"
            onClick={() => setShow(false)}
            aria-label="Close"
            label={<MdOutlineCancel />}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mx-auto bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="border-b">
        <div className="flex justify-between items-center p-4">
          <div>
            <Heading
              level="3"
              className="mb-2 text-lg md:text-2xl"
              size=""
              color="black"
              weight="font-semibold"
              font="font-body"
              lineHeight="leading-1"
            >
              Payout Method
            </Heading>
            <TextSpan
              className=""
              size="sm"
              color="primary3"
              weight="font-normal"
              lineHeight="leading-none"
            >
              Payouts Dashboard is a quick overview of all current and old
              payment requests.
            </TextSpan>
          </div>
          {/* Share Onboard Link Button */}
          <div className="text-end mb-4">
            <ButtonSmallPurple
              className="px-4 py-2 bg-primary3 text-white rounded hover:bg-primary4"
              onClick={handleShare}
              disabled={!userId}
              width="20"
            >
              <FontAwesomeIcon icon={faShareAlt} className="xl:mr-2" />
              <span className="hidden xl:inline-block">Share Onboard Link</span>
            </ButtonSmallPurple>
          </div>
        </div>
      </div>
      <div className="p-4">
        <AlertDismissible />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          <div className="mb-3 mb-lg-0 text-center">
            {/* Payout chart */}
            <ApexCharts
              options={PayoutChartOptions}
              series={PayoutChartSeries}
              height={165}
              type="bar"
            />

            <div className="relative inline-block text-left mb-4">
              <ButtonSmallWhite
                width="8"
                onClick={toggleDropdown}
                className="inline-flex justify-center w-full h-8 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary3"
              >
                {selectedCurrency}
                <IoIosArrowDown size={20} className="ml-1" />
              </ButtonSmallWhite>

              {dropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={() => handleCurrencyChange("Naira")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      NGN
                    </button>
                    <button
                      onClick={() => handleCurrencyChange("Dollar")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      USD
                    </button>
                  </div>
                </div>
              )}
            </div>
            <Heading
              level="4"
              className="mb-1"
              size="lg"
              color="black"
              weight="font-semibold"
              font="font-body"
              lineHeight="leading-1"
            >
              Your total earnings
            </Heading>
            <Heading
              level="5"
              className="mb-0"
              size="2xl"
              color="black"
              weight="font-bold"
              font="font-body"
              lineHeight="leading-1"
            >
              {formatPrice(selectedCurrency)}{" "}
              {earnings[selectedCurrency] || 0.0}
            </Heading>

            <p className="px-4"></p>
            <TextSpan
              className=""
              size="sm"
              color="black"
              weight="font-normal"
              lineHeight="leading-none"
            >
              You can change your payout account above
            </TextSpan>
            <div>
              {/* Withdraw Earnings Button */}
              <ButtonSmallPurple
                onClick={() => {
                  setTotalAmount(earnings.Naira);
                  setShowWithdrawModal(true);
                }}
                className="mt-4 px-4 py-2 rounded-md"
              >
                Withdraw Earnings
              </ButtonSmallPurple>

              {/* Withdraw Modal */}
              {showWithdrawModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto">
                    <div className="flex justify-between items-center mb-4">
                      <Heading
                        level="4"
                        className="mt-3 mb-1"
                        size="lg"
                        color="black"
                        weight="font-semibold"
                        font="font-body"
                        lineHeight="leading-1"
                      >
                        Withdraw Earnings
                      </Heading>
                      <ButtonForTabs
                        onClick={() => setShowWithdrawModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                        label={<MdOutlineCancel />}
                      />
                    </div>

                    <div className="border p-4 rounded-md mt-3">
                      <Heading
                        level="4"
                        className="block mt-3 mb-1"
                        size="md"
                        color="black"
                        weight="font-semibold"
                        font="font-body"
                        lineHeight="leading-1"
                      >
                        Select Bank:
                      </Heading>
                      {bankData && bankData.length > 0 ? (
                        <select
                          className="mt-2 border border-gray-300 rounded-md w-full p-2 font-body"
                          defaultValue=""
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Select an account
                          </option>
                          {bankData.map((account, index) => (
                            <option key={index} value={account.id}>
                              {account.accountName} - {account.bankName} (
                              {account.currency})
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Text size="md">No accounts found.</Text>
                      )}
                      {errorAcc && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3">
                          {errorAcc}
                        </div>
                      )}
                    </div>

                    <div className="border p-4 rounded-md mt-3">
                      <Heading
                        level="4"
                        className="block mt-3 mb-1"
                        size="md"
                        color="black"
                        weight="font-medium"
                        font="font-body"
                        lineHeight="leading-1"
                      >
                        Ledger Balance: {selectedCurrency}{" "}
                        {earnings.Naira || 0.0}
                      </Heading>

                      <div className="mt-2">
                        <Heading
                          level="5"
                          className="block mt-3 mb-1"
                          size="sm"
                          color="black"
                          weight="font-medium"
                          font="font-body"
                          lineHeight="leading-1"
                          htmlFor="withdrawnAmount"
                        >
                          Withdrawn Amount ({selectedCurrency})
                        </Heading>

                        <LongInputWithPlaceholder
                          type="text"
                          placeholder={`Enter amount in ${selectedCurrency}`}
                          value={withdrawnAmount}
                          onChange={(e) => setWithdrawnAmount(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-primary3 focus:ring-primary3"
                        />
                        {error && (
                          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3">
                            {error}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      {loading ? (
                        <ButtonSmallPurple
                          className="rounded-md px-4 py-2 opacity-70 cursor-not-allowed"
                          width="w-20"
                          disabled
                        >
                          Processing...
                        </ButtonSmallPurple>
                      ) : (
                        <ButtonSmallPurple
                          onClick={handleWithdraw}
                          className=" rounded-md px-4 py-2"
                        >
                          Withdraw
                        </ButtonSmallPurple>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2 xl:col-span-2">
            <div className="mt-3 text-center">
              <ButtonSmallWhite
                width="2"
                onClick={() => setShowModal(true)}
                className="border border-primary3 text-primary3 rounded-md px-4 py-2 hover:bg-primary3 hover:text-white"
              >
                Add Account
              </ButtonSmallWhite>

              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto">
                    <div className="flex justify-between items-center">
                      <Heading
                        level="3"
                        className="mb-2"
                        size="lg"
                        color="black"
                        weight="font-semibold"
                        font="font-body"
                        lineHeight="leading-1"
                      >
                        Enter Account Details
                      </Heading>
                      <ButtonForTabs
                        label={<MdOutlineCancel />}
                        onClick={() => setShowModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                      />
                    </div>
                    <hr />
                    <div className="mt-4">
                      <Heading
                        level="4"
                        className="block text-left"
                        size=""
                        color="black"
                        weight="font-medium"
                        font="font-body"
                        lineHeight="leading-1"
                        htmlFor="bankSelect"
                      >
                        Bank Name
                      </Heading>

                      <select
                        value={bankCode}
                        onChange={(e) => {
                          const selectedBank = banks.find(
                            (bank) => bank.code === e.target.value
                          );
                          setBankCode(selectedBank.code);
                        }}
                        className="mt-2 border text-gray-500 border-gray-300 rounded-md shadow-sm w-full p-2 font-body"
                      >
                        <option value="">Select Bank</option>
                        {banks.map((bank) => (
                          <option key={bank.code} value={bank.code}>
                            {bank.name}
                          </option>
                        ))}
                      </select>

                      <Heading
                        level="4"
                        className="block mt-4 text-left"
                        size=""
                        color="black"
                        weight="font-medium"
                        font="font-body"
                        lineHeight="leading-1"
                        htmlFor="accountNumber"
                      >
                        Account Number
                      </Heading>
                      <LongInputWithPlaceholder
                        type="text"
                        placeholder="Enter Account Number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        maxLength={10}
                        className="mt-2 border border-gray-300 rounded-md shadow-sm w-full p-2"
                      />
                      {loadingVerify && (
                        <div className="font-sans">
                          Verifying account number...
                        </div>
                      )}

                      <Heading
                        level="4"
                        className="block mt-4 text-left"
                        size=""
                        color="black"
                        weight="font-medium"
                        font="font-body"
                        lineHeight="leading-1"
                        htmlFor="accountName"
                      >
                        Account Name
                      </Heading>

                      <LongInputWithPlaceholder
                        type="text"
                        placeholder="Account Name will appear here after verification"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        readOnly
                        className="mt-2 border border-gray-300 rounded-md shadow-sm w-full p-2"
                      />

                      <Heading
                        level="4"
                        className="block mt-4 text-left"
                        size=""
                        color="black"
                        weight="font-medium"
                        font="font-body"
                        lineHeight="leading-1"
                        htmlFor="currency"
                      >
                        Currency
                      </Heading>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="mt-2 border text-gray-500 border-gray-300 rounded-md shadow-sm w-full p-2 font-body"
                      >
                        {bankCurrency.map((currency) => (
                          <option key={currency.value} value={currency.value}>
                            {currency.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <ButtonSmallWhite
                        width="2"
                        onClick={() => setShowModal(false)}
                        className="rounded-md mr-2"
                      >
                        Close
                      </ButtonSmallWhite>

                      {loadingSave ? (
                        <ButtonSmallPurple
                          width="2"
                          className="rounded-md flex items-center"
                          disabled
                        >
                          Saving...
                        </ButtonSmallPurple>
                      ) : (
                        <ButtonSmallPurple
                          width="2"
                          onClick={handleSave}
                          className=" rounded-md"
                        >
                          Save
                        </ButtonSmallPurple>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {bankData && bankData.length > 0 && (
              <div className="mt-3 mb-3 ">
                {currentAccounts.map((account, index) => (
                  <div
                    key={index}
                    className="border rounded-md shadow-lg p-4 mt-2 mx-auto relative"
                  >
                    {/* Edit button */}
                    <ButtonSmallPurple
                      width=""
                      className="absolute bottom-0 xl:top-0 end-0 m-3 xl:h-14"
                      onClick={() => handleEdit(account.id)}
                    >
                      Edit
                    </ButtonSmallPurple>
                    <Text size="sm">
                      <strong>Account Name:</strong> {account.accountName}
                    </Text>
                    <Text size="sm">
                      <strong>Account Number:</strong> {account.accountNumber}
                    </Text>
                    <Text size="sm">
                      <strong>Bank Name:</strong> {account.bankName}
                    </Text>
                    <Text size="sm">
                      <strong>Currency:</strong> {account.currency}
                    </Text>
                  </div>
                ))}
              </div>
            )}
            {bankData && bankData.length > accountsPerPage && (
              <ReactPaginate
                previousLabel={<ChevronLeft size="14px" />}
                nextLabel={<ChevronRight size="14px" />}
                pageCount={pageCount}
                onPageChange={handlePageChange}
                containerClassName={"pagination justify-content-center mb-0"}
                previousLinkClassName={"page-link mx-1 rounded"}
                nextLinkClassName={"page-link mx-1 rounded"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link mx-1 rounded"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"active"}
              />
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 rounded-lg bg-white shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center border-b pb-4">
                <Heading
                  level="2"
                  className="block mt-3 mb-1"
                  size="lg"
                  color="black"
                  weight="font-semibold"
                  font="font-body"
                  lineHeight="leading-1"
                >
                  Edit Account Details
                </Heading>
                <ButtonForTabs
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                  label={<MdOutlineCancel />}
                />
              </div>
              <div className="py-4">
                <form>
                  <div className="mb-4">
                    <Heading
                      level="4"
                      className="block mt-3 mb-1"
                      size="sm"
                      color="black"
                      weight="font-medium"
                      font="font-body"
                      lineHeight="leading-1"
                    >
                      Account Name
                    </Heading>

                    <LongInputWithPlaceholder
                      type="text"
                      placeholder="Enter Account Name"
                      value={editedAccount?.accountName || ""}
                      onChange={(e) =>
                        setEditedAccount({
                          ...editedAccount,
                          accountName: e.target.value,
                        })
                      }
                      className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-primary3"
                    />
                  </div>
                  <div className="mb-4">
                    <Heading
                      level="4"
                      className="block mt-3 mb-1"
                      size="sm"
                      color="black"
                      weight="font-medium"
                      font="font-body"
                      lineHeight="leading-1"
                    >
                      Account Number
                    </Heading>

                    <LongInputWithPlaceholder
                      type="text"
                      placeholder="Enter Account Number"
                      value={editedAccount?.accountNumber || ""}
                      onChange={(e) =>
                        setEditedAccount({
                          ...editedAccount,
                          accountNumber: e.target.value,
                        })
                      }
                      className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    />
                  </div>
                  <div className="mb-4">
                    <Heading
                      level="4"
                      className="block mt-3 mb-1"
                      size="sm"
                      color="black"
                      weight="font-medium"
                      font="font-body"
                      lineHeight="leading-1"
                    >
                      Bank Name
                    </Heading>
                    <LongInputWithPlaceholder
                      type="text"
                      placeholder="Enter Bank Name"
                      value={editedAccount?.bankName || ""}
                      onChange={(e) =>
                        setEditedAccount({
                          ...editedAccount,
                          bankName: e.target.value,
                        })
                      }
                      className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    />
                  </div>
                  <div className="mb-4">
                    <Heading
                      level="4"
                      className="block mt-3 mb-1"
                      size="sm"
                      color="black"
                      weight="font-medium"
                      font="font-body"
                      lineHeight="leading-1"
                    >
                      Currency
                    </Heading>

                    <select
                      value={editedAccount?.currency || ""}
                      onChange={(e) =>
                        setEditedAccount({
                          ...editedAccount,
                          currency: e.target.value,
                        })
                      }
                      className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-primary3 font-body"
                    >
                      {bankCurrency.map((currency) => (
                        <option key={currency.value} value={currency.value}>
                          {currency.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>
              <div className="flex justify-end border-t pt-4">
                <ButtonSmallWhite
                  onClick={() => setShowEditModal(false)}
                  width="w-20"
                  className=" rounded-md px-4 py-2 mr-2"
                >
                  Close
                </ButtonSmallWhite>
                {loadingWithdraw ? (
                  <ButtonSmallPurple
                    disabled
                    className="flex items-centerrounded-md px-4 py-2 opacity-70"
                  >
                    <LoadingSmall />
                    Saving
                  </ButtonSmallPurple>
                ) : (
                  <ButtonSmallPurple
                    width="w-20"
                    onClick={handleEditSave}
                    className=" rounded-md px-4 py-2"
                  >
                    Save
                  </ButtonSmallPurple>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payouts;
