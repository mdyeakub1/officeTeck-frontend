import { useState } from 'react';

const AssignMemberModal = ({ closeModal, projectId, allMembers }) => {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleAssignMember = () => {
    if (selectedMember) {
      // Implement the logic for assigning the selected member to the project
      // Update state accordingly
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Assign Member</h3>
        <div className="py-4">
          <label htmlFor="memberDropdown" className="block text-sm font-semibold mb-2">
            Select a member:
          </label>
          <div className="relative">
            <select
              id="memberDropdown"
              className="input input-bordered w-full"
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              <option value="" disabled>
                Choose a member
              </option>
              {allMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="py-4">
          <h4 className="text-sm font-semibold">Assigned Members</h4>
          {/* Render assigned members similarly to the previous example */}
        </div>
        <div className="py-4">
          <button className="btn btn-primary" onClick={handleAssignMember}>
            Assign Member
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AssignMemberModal;
