import React from 'react';
import Swal from 'sweetalert2';
import { useDeleteEmployeeMutation } from '../../features/employee/employeeApi';

const DeleteOfficeEmployee = ({ empId, onDeleteSuccess }) => {
    const [deleteEmployee, { isLoading, isSuccess, isError }] = useDeleteEmployeeMutation();

    const handleDelete = async () => {
        try {
            await deleteEmployee(empId);
            console.log("clicked on delete")
            if (!isLoading && !isError) {
                console.log("clicked on delete", isSuccess)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Employee deleted successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
                onDeleteSuccess()
            }
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error deleting employee',
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

export default DeleteOfficeEmployee;
