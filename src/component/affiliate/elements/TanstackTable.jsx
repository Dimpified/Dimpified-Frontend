import { Fragment, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import GlobalFilter from "./GlobalFilter";
import Pagination from "./Pagination";

const TanstackTable = ({
  data,
  columns,
  filter = false,
  pagination = false,
  filterPlaceholder,
  exportButton = false,
}) => {
  const [filtering, setFiltering] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setFiltering,
    debugTable: false,
  });

  return (
    <Fragment>
      {/* Filter section */}
      {!exportButton && filter && (
        <div className="overflow-hidden px-2 sm:px-5 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="col-span-12">
              <GlobalFilter
                filtering={filtering}
                setFiltering={setFiltering}
                placeholder={filterPlaceholder}
              />
            </div>
          </div>
        </div>
      )}

      {exportButton && filter && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-2 sm:px-5 py-4">
          <div className="col-span-11">
            <GlobalFilter
              filtering={filtering}
              setFiltering={setFiltering}
              placeholder={filterPlaceholder}
            />
          </div>
          <div className="col-span-1 flex justify-end">
            <Link
              to="#"
              className="bg-gray-600 text-white rounded py-2 px-4 hover:bg-gray-700"
            >
              Export CSV
            </Link>
          </div>
        </div>
      )}

      {/* Responsive Table Container */}
      <div className="overflow-x-auto font-body">
        <table className="table-auto w-full text-left whitespace-nowrap">
          <thead className="bg-gray-200 text-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-sm sm:text-base">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsive Pagination */}
      {pagination && (
        <div className="mt-4 px-2 sm:px-5">
          <Pagination table={table} />
        </div>
      )}
    </Fragment>
  );
};

export default TanstackTable;
