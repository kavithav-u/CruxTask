import React, { useState, useEffect } from "react";
import requests from "../data";
import Search from "./Search";
import { FaEdit, FaTrash } from "react-icons/fa";

const Table = () => {
  const [expandedAgency, setExpandedAgency] = useState(null);
  const [filteredRequests, setFilteredRequests] = useState(requests);
  const [filterStatus, setFilterStatus] = useState("All"); // Initial filter status
  const [showFilters, setShowFilters] = useState(false); // State to manage display of filters on small screens

  // Function to toggle expanded state of agency details
  const toggleExpand = (agencyName) => {
    setExpandedAgency(expandedAgency === agencyName ? null : agencyName);
  };

  // Function to handle search query change
  const handleSearchChange = (query) => {
    const filteredData = requests.filter((request) =>
      request.agencyName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRequests(filteredData);
  };

  // Function to handle status filter change
  const handleStatusFilter = (status) => {
    setFilterStatus(status);
    if (status === "All") {
      setFilteredRequests(requests);
    } else {
      const filteredData = requests.filter((request) => request.status === status);
      setFilteredRequests(filteredData);
    }
    // Close filters on small screens after selecting a filter
    if (window.innerWidth < 640) {
      setShowFilters(false);
    }
  };

  // Function to toggle display of filters on small screens
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Reset filters when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setShowFilters(false); // Reset filters on large screens
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white px-4 pt-3 pb-4 mt-3 rounded-sm border border-gray-200">
        {/* Filter section */}
        <div className="mb-4">
                        {/* Search input */}
                        <Search onChange={handleSearchChange} />

          <div className="flex justify-between items-center">
            {/* Hamburger button to toggle filter display on small screens */}
            <button
              className="sm:hidden text-gray-600 focus:outline-none"
              onClick={toggleFilters}
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>


            {/* Filter buttons for large screens */}
            <div className="hidden sm:flex space-x-4">
              <button
                onClick={() => handleStatusFilter("All")}
                className={`py-1 px-3 rounded-md ${
                  filterStatus === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                All Requests
              </button>
              <button
                onClick={() => handleStatusFilter("Awaiting")}
                className={`py-1 px-3 rounded-md ${
                  filterStatus === "Awaiting" ? "bg-yellow-500 text-white" : "bg-gray-200"
                }`}
              >
                Awaiting
              </button>
              <button
                onClick={() => handleStatusFilter("Approved")}
                className={`py-1 px-3 rounded-md ${
                  filterStatus === "Approved" ? "bg-green-500 text-white" : "bg-gray-200"
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => handleStatusFilter("Awaiting Approval")}
                className={`py-1 px-3 rounded-md ${
                  filterStatus === "Awaiting Approval"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Awaiting Approval
              </button>
              <button
                onClick={() => handleStatusFilter("Rejected")}
                className={`py-1 px-3 rounded-md ${
                  filterStatus === "Rejected" ? "bg-red-500 text-white" : "bg-gray-200"
                }`}
              >
                Rejected
              </button>
            </div>
          </div>

          {/* Filter buttons for small screens */}
          {showFilters && (
            <div className="mt-3 flex flex-col space-y-2 sm:hidden">
              <button
                onClick={() => handleStatusFilter("All")}
                className={`w-full py-1 px-3 rounded-md ${
                  filterStatus === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                All Requests
              </button>
              <button
                onClick={() => handleStatusFilter("Awaiting")}
                className={`w-full py-1 px-3 rounded-md ${
                  filterStatus === "Awaiting" ? "bg-yellow-500 text-white" : "bg-gray-200"
                }`}
              >
                Awaiting
              </button>
              <button
                onClick={() => handleStatusFilter("Approved")}
                className={`w-full py-1 px-3 rounded-md ${
                  filterStatus === "Approved" ? "bg-green-500 text-white" : "bg-gray-200"
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => handleStatusFilter("Awaiting Approval")}
                className={`w-full py-1 px-3 rounded-md ${
                  filterStatus === "Awaiting Approval"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Awaiting Approval
              </button>
              <button
                onClick={() => handleStatusFilter("Rejected")}
                className={`w-full py-1 px-3 rounded-md ${
                  filterStatus === "Rejected" ? "bg-red-500 text-white" : "bg-gray-200"
                }`}
              >
                Rejected
              </button>
            </div>
          )}
        </div>

        {/* Table section */}
        <div className="overflow-x-auto">
          {/* Conditional rendering based on screen size */}
          {window.innerWidth < 640 ? (
            <div className="sm:hidden">
              {/* Accordion section for small screens */}
              {filteredRequests.map((request) => (
                <div key={request.id} className="border-b border-gray-200">
                  <div
                    className="flex justify-between items-center p-2 cursor-pointer"
                    onClick={() => toggleExpand(request.agencyName)}
                  >
                    <span>{request.agencyName}</span>
                    <svg
                      className={`w-4 h-4 text-black transform ${
                        expandedAgency === request.agencyName
                          ? "rotate-180"
                          : "rotate-0"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.4142 6.58579C13.8047 6.97631 13.8047 7.60948 13.4142 8L8.70711 12.7071C8.31658 13.0976 7.68342 13.0976 7.29289 12.7071L2.58579 8C2.19527 7.60948 2.19527 6.97631 2.58579 6.58579C2.97631 6.19527 3.60948 6.19527 4 6.58579L8 10.5858L12 6.58579C12.3905 6.19527 13.0237 6.19527 13.4142 6.58579Z"
                      />
                    </svg>
                  </div>
                  {expandedAgency === request.agencyName && (
                    <div className="p-2">
                      <p>Request ID: {request.id}</p>
                      <p>Received Date: {request.receivedDate}</p>
                      <p>
                        Status:
                        <span
                          className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded-full ${
                            request.status === "Approved"
                              ? "bg-green-500"
                              : request.status === "Awaiting"
                              ? "bg-yellow-500"
                              : request.status === "Awaiting Approval"
                              ? "bg-orange-500"
                              : request.status === "Rejected"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          {request.status}
                        </span>
                      </p>
                      <p className="mx-auto">
                        <button className="text-green-600">
                          <FaEdit />
                        </button>
                        <button className="ml-3 text-red-700">
                          <FaTrash />
                        </button>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="hidden sm:block">
              {/* Full table for larger screens */}
              <table className="w-full text-sm text-gray-700">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-2">Request ID</th>
                    <th className="p-2">Agency Name</th>
                    <th className="p-2">Received Date</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <React.Fragment key={request.id}>
                      <tr className="border bg-white border-gray-200">
                        <td
                          className="p-2 cursor-pointer"
                          onClick={() => toggleExpand(request.agencyName)}
                        >
                          {request.id}
                        </td>
                        <td>{request.agencyName}</td>
                        <td>{request.receivedDate}</td>
                        <td>
                          <span
                            className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded-full ${
                              request.status === "Approved"
                                ? "bg-green-500"
                                : request.status === "Awaiting"
                                ? "bg-yellow-500"
                                : request.status === "Awaiting Approval"
                                ? "bg-orange-500"
                                : request.status === "Rejected"
                                ? "bg-red-500"
                                : "bg-gray-500"
                            }`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td>
                          <button className="text-green-600">
                            <FaEdit />
                          </button>
                          <button className="ml-3 text-red-700">
                            <FaTrash />
                          </button>{" "}
                        </td>
                      </tr>
                      {expandedAgency === request.agencyName && (
                        <tr className="border bg-gray-100">
                          <td colSpan="5" className="p-2">
                            <div>
                              <p>Request ID: {request.id}</p>
                              <p>Received Date: {request.receivedDate}</p>
                              <p>
                                Status:
                                <span
                                  className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded-full ${
                                    request.status === "Approved"
                                      ? "bg-green-500"
                                      : request.status === "Awaiting"
                                      ? "bg-yellow-500"
                                      : request.status === "Awaiting Approval"
                                      ? "bg-orange-500"
                                      : request.status === "Rejected"
                                      ? "bg-red-500"
                                      : "bg-gray-500"
                                  }`}
                                >
                                  {request.status}
                                </span>
                              </p>
                              <p className="mx-auto">
                                <button className="text-green-600">
                                  <FaEdit />
                                </button>
                                <button className="ml-3 text-red-700">
                                  <FaTrash />
                                </button>
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
