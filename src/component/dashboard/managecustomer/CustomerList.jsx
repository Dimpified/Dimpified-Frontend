import React, { useState, useEffect } from "react";
import { FiTrash } from "react-icons/fi";
import AddCustomerModal from "./AddCustomerModal";
import CustomerProfileModal from "./CustomerProfileModal";
import { ButtonSmallPurple } from "../../../component/Buttons";
import { Heading, Text } from "../../../component/Text";
import api from "../../../api/DashboardApi";
import { useSelector } from "react-redux";
import { showToast } from "../../../component/ShowToast";

const ITEMS_PER_PAGE = 10;

const CustomerList = () => {
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const openProfileModal = (customer) => {
    setSelectedCustomer(customer);
    setIsProfileModalOpen(true);
  };
  const closeProfileModal = () => setIsProfileModalOpen(false);

  const toggleSelectCustomer = (id) => {
    setSelectedCustomers((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    getAllCustomers();
  }, [ecosystemDomain, accessToken, refreshToken]);

  const getAllCustomers = async () => {
    setLoading(true);
    try {
      if (!accessToken || !refreshToken) return;
      const response = await api.creatorGetAllCustomer({
        ecosystemDomain,
        accessToken,
        refreshToken,
      });
      setCustomers(response.data.customers);
    } catch (error) {
      console.error("Could not fetch customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSelectedCustomers = async () => {
    setDeleteLoading(true);
    try {
      if (!accessToken || !refreshToken) return;
      await api.creatorDeleteCustomer({
        ecosystemDomain,
        accessToken,
        refreshToken,
        ids: selectedCustomers,
      });
      setCustomers((prev) =>
        prev.filter((customer) => !selectedCustomers.includes(customer.id))
      );
      setSelectedCustomers([]);
      closeDeleteModal();
      showToast("Customers deleted successfully", "success");
    } catch (error) {
      console.error("Could not delete customers:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <Heading level={2} className="text-lg sm:text-xl font-bold">
          {filteredCustomers.length} Customers
        </Heading>
        <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
          <input
            type="search"
            placeholder="Search by name or email"
            className="border rounded px-3 py-1 sm:px-4 sm:py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ButtonSmallPurple onClick={openAddModal}>
            Add Customer
          </ButtonSmallPurple>
          {selectedCustomers.length > 0 && (
            <FiTrash
              className="text-gray-500 cursor-pointer text-3xl" // Adjust size with text-3xl, 4xl, etc.
              onClick={openDeleteModal}
            />
          )}
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="loader border-t-4 border-purple-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No customers found.</p>
      ) : (
        <div className="overflow-x-auto">
          {filteredCustomers.length === 0 ? (
            <p className="text-center text-gray-500 py-6">
              No customers found.
            </p>
          ) : (
            <table className="min-w-[600px] w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-left text-xs sm:text-sm">
                  <th className="border px-2 py-1 sm:px-4 sm:py-2"></th>
                  <th className="border px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                    S/N
                  </th>
                  <th className="border px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                    Name
                  </th>
                  <th className="border px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                    Email
                  </th>
                  <th className="border px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                    Phone
                  </th>
                  <th className="border px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                    DOB
                  </th>
                  <th className="border px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                    Onboard Date
                  </th>
                  <th className="border px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.map((customer, index) => (
                  <tr
                    key={customer.id}
                    className="text-xs sm:text-sm text-center"
                  >
                    <td className="border px-2 py-1 sm:px-4 sm:py-2">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => toggleSelectCustomer(customer.id)}
                      />
                    </td>
                    <td className="border px-2 py-1 sm:px-4 sm:py-2">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td className="border px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                      {customer.username}
                    </td>
                    <td className="border px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                      {customer.email}
                    </td>
                    <td className="border px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                      {customer.phoneNumber}
                    </td>
                    <td className="border px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                      {formatDate(customer.dob)}
                    </td>
                    <td className="border px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                      {formatDate(customer.createdAt)}
                    </td>
                    <td className="border px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                      <button
                        onClick={() => openProfileModal(customer)}
                        className="bg-purple-500 text-white px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-1 rounded"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded text-sm transition ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          ⏮ First
        </button>

        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded text-sm transition ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          ◀ Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={`px-3 py-1 border rounded text-sm transition ${
              currentPage === index + 1
                ? "bg-purple-500 text-white font-bold"
                : "hover:bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded text-sm transition ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          Next ▶
        </button>

        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded text-sm transition ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          Last ⏭
        </button>
      </div>

      {isAddModalOpen && (
        <AddCustomerModal
          onClose={closeAddModal}
          setCustomers={setCustomers}
          getAllCustomers={getAllCustomers}
        />
      )}
      {isProfileModalOpen && selectedCustomer && (
        <CustomerProfileModal
          customer={selectedCustomer}
          onClose={closeProfileModal}
          getAllCustomers={getAllCustomers}
        />
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-md">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <Heading level={2} className="text-lg font-semibold">
              Confirm Delete
            </Heading>
            <p className="text-gray-600">
              Are you sure you want to delete the selected customers?
            </p>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={deleteSelectedCustomers}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
