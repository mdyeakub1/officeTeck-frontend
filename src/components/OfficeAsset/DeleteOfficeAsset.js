import React from 'react';
import Swal from 'sweetalert2';
import { useDeleteAssetMutation } from '../../features/asset/assetApi';

const DeleteOfficeAsset = ({ empId, onDeleteSuccess }) => {
    const [deleteAsset, { isLoading, isSuccess, isError }] = useDeleteAssetMutation();

    const handleDelete = async () => {
        try {
            await deleteAsset(empId);
            console.log("clicked on delete")
            if (!isLoading && !isError) {
                console.log("clicked on delete", isSuccess)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Asset deleted successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
                onDeleteSuccess()
            }
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error deleting asset',
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

export default DeleteOfficeAsset;
