const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="py-5">
      <nav>
        <ul className="flex justify-center space-x-2 mb-0">
          {/* Previous Button */}
          <li>
            <button
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
            >
              <i className="fe fe-chevron-left"></i>
            </button>
          </li>

          {/* Page Numbers */}
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`px-3 py-1 border rounded ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {number}
              </button>
            </li>
          ))}

          {/* Next Button */}
          <li>
            <button
              disabled={currentPage === pageNumbers.length}
              onClick={() => paginate(currentPage + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === pageNumbers.length
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
            >
              <i className="fe fe-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
