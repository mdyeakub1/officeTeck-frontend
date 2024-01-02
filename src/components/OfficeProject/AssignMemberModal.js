
import { useState } from "react";
import { useAddAssignProjectMutation, useGetSingleProjectForAssignQuery } from "../../features/assignProject/assignProjectApi";
import { useGetEmployeeQuery } from "../../features/employee/employeeApi";

const AssignMemberModal = ({ isAssignMemberModalOpen, selectedProjectId:projectId, closeAssignMemberModal }) => {

  const [input, setInput] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const { data: project, } = useGetSingleProjectForAssignQuery(projectId)
  const [formData, setFormData] = useState({
    projectId: '',
    employeeId: '',
});

  const memberAssinged = project?.data?.memberAssinged
  const { data: employee, isLoading, isError, refetch } = useGetEmployeeQuery({
    page: 1,
    limit: 20,
    searchTerm: input
  });

  const [addAssignProject, {data}] = useAddAssignProjectMutation()

  console.log(memberAssinged?.map(e => e.employeeId))

  const handleAssignMember = async (e) => {
    e.preventDefault();
    // Trigger a refetch when the form is submitted
    setFormData({
      projectId: projectId,
      employeeId: employeeId,
    })
    addAssignProject(formData)
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  if (!employee) {
    return <div>No employee found</div>;
  }

  const filteredEmployeeData = employee.data.filter(
    (employee) => !memberAssinged.map(e => e.employeeId === employee.id)
  );


  return (
    <>
    <dialog id="my_modal_3" className="modal" open={isAssignMemberModalOpen}>
    <div className="modal-box">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeAssignMemberModal}>✕</button>
      </form>
      <h3 className="font-bold text-lg">Assign Member</h3>
      <ul className='assignedMemberAvatar'>
                {memberAssinged?.map((employee) => (
                    <li>
                    <div
                        data-te-chip-init
                        data-te-ripple-init
                        class="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-[#eceff1] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-neutral-600 dark:text-neutral-200">
                        <img
                          class="my-0 -ml-[12px] mr-[8px] h-[inherit] w-[inherit] rounded-[100%]"
                          src={`${employee.employee.image}`}
                          alt="Contact Person" />
                        {employee.employee.name}
                        <span
                          data-te-chip-close
                          class="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-3 w-3">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                      </div>
                    </li>
                  
                ))}
          </ul>
          <form className="mt-6" onSubmit={handleAssignMember}>
            <label className="block mb-2 text-sm font-medium text-gray-700">Search Member</label>
            <div className="flex">
            <input
              type="text"
              id="search"
              placeholder="Search..."
              className="border border-gray-300 px-3  py-2 mr-3 focus:outline-none focus:ring focus:border-blue-300 h-[48px]"
              value={input}
              onChange={(e) => {
                if (!employee.length) {
                  setInput(e.target.value);
                }
              }}
            />
            <button className="btn btn-outline">Assign</button>
            </div>
          </form>
          {input && (
            <ul className="search-suggestions">
          {employee?.data?.map((employee) => (
            <li
              key={employee?.id}
              onClick={() => {
                setInput(employee.name);
                setEmployeeId(employee.id)
                }}
                className="cursor-pointer py-2 px-4 hover:bg-gray-100"
            >
              {employee?.name}
            </li>
          ))}
        </ul>
          )}
    </div>
  </dialog>
    </>
  );
};

export default AssignMemberModal;
