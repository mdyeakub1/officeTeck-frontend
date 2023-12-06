
import { useGetAssignProjectQuery } from "../../features/assignProject/assignProjectApi";

const AssignMemberModal = ({ isAssignMemberModalOpen, selectedProjectId:projectId, assignedMembers, closeAssignMemberModal }) => {


  const { data: employeeAssign, isLoading, isError, refetch } = useGetAssignProjectQuery(projectId)
  
  


  return (
    <>
    <dialog id="my_modal_3" className="modal" open={isAssignMemberModalOpen}>
    <div className="modal-box">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeAssignMemberModal}>✕</button>
      </form>
      <h3 className="font-bold text-lg">Assign Member</h3>
      <ul className='assignedMemberAvatar'>
                {assignedMembers.map((employee) => (
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
                </ul>{employeeAssign?.data.map(employee => console.log(employee))}
    </div>
  </dialog>
    </>
  );
};

export default AssignMemberModal;
