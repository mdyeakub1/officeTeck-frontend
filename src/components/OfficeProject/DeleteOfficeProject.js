import React from 'react';
import Swal from 'sweetalert2';
import { useDeleteProjectMutation } from '../../features/project/projectApi';

const DeleteOfficeProject = ({ empId, onDeleteSuccess }) => {
    const [deleteProject, { isLoading, isSuccess, isError }] = useDeleteProjectMutation();

    const handleDelete = async () => {
        try {
            await deleteProject(empId);
            console.log("clicked on delete")
            if (!isLoading && !isError) {
                console.log("clicked on delete", isSuccess)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Project deleted successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
                onDeleteSuccess()
            }
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error deleting project',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <button onClick={handleDelete} disabled={isLoading}>
            Delete
        </button>
    );
};

export default DeleteOfficeProject;
