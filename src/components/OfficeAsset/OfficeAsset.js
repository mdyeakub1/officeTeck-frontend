import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useGetAssetQuery } from '../../features/asset/assetApi';
import DeleteOfficeAsset from './DeleteOfficeAsset';

export const OfficeAsset = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [input, setInput] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const { data: assets, isLoading, isError, refetch } = useGetAssetQuery({
    page: currentPage,
    limit: itemsPerPage,
    searchTerm: input
  });



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Trigger a refetch when the form is submitted
    await refetch();
  };

  useEffect(() => {
    const fetchData = async () => {
      await refetch();
    };

    fetchData();
  }, [currentPage, refetch, refetchTrigger]);



  const handleRefetch = () => {
    setRefetchTrigger(!refetchTrigger);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  if (!assets) {
    return null;
  }

  const totalPages = Math.ceil(assets.meta.total / itemsPerPage);

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = employees.data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = async () => {
    if (currentPage < totalPages) {
      await setCurrentPage(currentPage + 1);
      await refetch();
    }
  };

  const prevPage = async () => {
    if (currentPage > 1) {
      await setCurrentPage(currentPage - 1);
      await refetch();
    }
  };


  const handleItemsPerPageChange = (e) => {
    const selectedItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };


  return (
    <div className="container mx-auto pt-3 pb-4">
      <div className="flex justify-between items-center mb-3">
        <Outlet />
        {/* Search Bar */}
        <div className="flex items-center">
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              id="search"
              placeholder="Search by name, email.."
              className="border border-gray-300 px-3 py-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}

            />
          </form>
        </div>



        {/* Add New Button */}
        <Link
          to='/asset/add'
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        // Add your "Add New" functionality here
        >
          Add New
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead className='bg-slate-100'>
          <tr>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">buyingDate</th>
            <th className="py-2 px-4 border-b">warranty</th>
            <th className="py-2 px-4 border-b">quantity</th>
            <th className="py-2 px-4 border-b">brand</th>
            <th className="py-2 px-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {assets?.data.map((asset) => (
            <tr key={asset.id}>
              <td className="py-2 px-4 border-b"><img className='w-10 h-10 object-cover rounded-xl' src={asset.image} alt='employee.png' /> </td>
              <td className="py-2 px-4 border-b">{asset.name}</td>
              <td className="py-2 px-4 border-b">{asset.description}</td>
              <td className="py-2 px-4 border-b">{asset.buyingDate}</td>
              <td className="py-2 px-4 border-b">{asset.warranty}</td>
              <td className="py-2 px-4 border-b">{asset.quantity}</td>
              <td className="py-2 px-4 border-b">{asset.brand}</td>
              <td className="py-2 px-4 border-b relative">
                <div className="dropdown dropdown-left">
                  <label tabIndex={0} className="btn btn-circle m-1"><i className="fa-solid fa-ellipsis"></i></label>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to={`/asset/edit/${asset.id}`}>Edit</Link></li>
                    <li><DeleteOfficeAsset empId={asset.id} onDeleteSuccess={handleRefetch}>Delete</DeleteOfficeAsset></li>
                    <li><Link to={`/asset/${asset.id}`}>Details</Link></li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="container mx-auto pt-4">
        <div className="flex justify-between items-center mb-4">
          {/* Items Per Page Dropdown (left) */}
          <div className="flex items-center">
            <label htmlFor="itemsPerPage" className="mr-2">
              Items per page:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border border-gray-300 px-2 py-1 w-[60px]"
            >
              <option value="6">6</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>

          {/* Spacer for center alignment */}
          <div></div>

          {/* Pagination Controls (right) */}
          <div className="flex">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-2 py-1 border ${currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'text-blue-500 hover:text-blue-700'
                }`}
            >
              Prev
            </button>
            <ul className="flex">
              {Array.from({ length: totalPages }).map((_, index) => (
                <li key={index} className="mx-1">
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-1 border ${currentPage === index + 1
                      ? 'bg-blue-500 text-white'
                      : 'text-blue-500 hover:text-blue-700'
                      }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 border ${currentPage === totalPages ? 'text-gray-500 cursor-not-allowed' : 'text-blue-500 hover:text-blue-700'
                }`}
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
