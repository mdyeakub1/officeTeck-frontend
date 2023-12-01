import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useGetProjectQuery } from '../../features/project/projectApi';
import DeleteOfficeProject from './DeleteOfficeProject';

export const OfficeProject = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [input, setInput] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [refetchTrigger, setRefetchTrigger] = useState(false);
  const [isAssignMemberModalOpen, setAssignMemberModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const openAssignMemberModal = (projectId) => {
    setSelectedProjectId(projectId);
    setAssignMemberModalOpen(true);
  };

  const closeAssignMemberModal = () => {
    setSelectedProjectId(null);
    setAssignMemberModalOpen(false);
  };

  const { data: projects, isLoading, isError, refetch } = useGetProjectQuery({
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

  if (!projects) {
    return null;
  }

  const totalPages = Math.ceil(projects.meta.total / itemsPerPage);

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
    <>
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
          to='/project/add'
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
            <th className="py-2 px-4 border-b">StartDate</th>
            <th className="py-2 px-4 border-b">Deadline</th>
            <th className="py-2 px-4 border-b">Client</th>
            <th className="py-2 px-4 border-b">Assigned Member</th>
            <th className="py-2 px-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {projects?.data.map((project) => (
            <tr key={project.id}>
              <td className="py-2 px-4 border-b"><img className='w-10 h-10 object-cover rounded-xl' src={project.image} alt='employee.png' /> </td>
              <td className="py-2 px-4 border-b">{project.name}</td>
              <td className="py-2 px-4 border-b">{project.description}</td>
              <td className="py-2 px-4 border-b">{project.startDate}</td>
              <td className="py-2 px-4 border-b">{project.deadline}</td>
              <td className="py-2 px-4 border-b">{project.client}</td>
              <td className="py-2 px-4 border-b">
              <ul className='assignedMemberAvatar'>
                    {project.memberAssinged.map((employee) => (
                        <li>
                        <div key={employee.id} class="profile-container -mr-2 border-white border-2"> <img className='rounded-full object-fill w-full h-full' src={employee.employee.image} alt='avatar' /></div>
                        </li>
                      
                    ))}
                    </ul>
              </td>
              <td className="py-2 px-4 border-b relative">
                <div className="dropdown dropdown-left">
                  <label tabIndex={0} className="btn btn-circle m-1"><i className="fa-solid fa-ellipsis"></i></label>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to={`/project/edit/${project.id}`}>Edit</Link></li>
                    <li><DeleteOfficeProject empId={project.id} onDeleteSuccess={handleRefetch}>Delete</DeleteOfficeProject></li>
                    <li><Link to={`/project/${project.id}`}>Details</Link></li>
                    <li><Link onClick={() => document.getElementById('my_modal_3',).showModal()}>Assign Member</Link>
                    </li>
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

    <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Assign Member</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </>
  );
};
