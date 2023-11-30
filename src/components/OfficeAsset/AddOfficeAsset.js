import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useAddAssetMutation } from '../../features/asset/assetApi';

const AddOfficeAsset = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        buyingDate: '',
        warranty: '',
        quantity: '',
        brand: '',
        image: '',
        userId: '',
    });

    const [addAsset, { data, isLoading, isSuccess, isError, error }] = useAddAssetMutation()

    console.log("data.message", data?.message)
    console.log("isError", isError)
    console.log("error", error)




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    if (isLoading) {
        let timerInterval;
        Swal.fire({
            title: "Auto close alert!",
            html: "I will close in <b></b> milliseconds.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });

    } else if (!isLoading && isError) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Asset can not created please try again!',
            showConfirmButton: false,
            timer: 1500,
        });
        navigate('/asset');

    } else if (!isLoading && !isError && isSuccess) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Asset created successfully',
            showConfirmButton: false,
            timer: 1500,
        });
        navigate('/asset');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        await addAsset(formData);
    };



    return (

        <div className="mx-auto">
            <form onSubmit={handleSubmit} className=" mx-auto bg-white p-8 rounded shadow-md">
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><Link to='/asset' className='text-blue-600'> Home </Link> </li>
                        <li>Add New</li>
                    </ul>
                </div>
                <h2 className="text-2xl font-bold mb-2">Add New Asset</h2>

                {/* Flex container for 2x2 layout */}
                <div className="flex flex-wrap -mx-5 mb-2 form-separator">
                    {/* Name and Email (1st row) */}
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="name" className="block text-gray-600 mb-1">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="email" className="block text-gray-600 mb-1">Description</label>
                        <input 
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1  w-full"
                            required
                        />
                    </div>

                    {/* Phone and Address (2nd row) */}
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="phone" className="block text-gray-600 mb-1">buyingDate:</label>
                        <input
                            type="text"
                            id="buyingDate"
                            name="buyingDate"
                            value={formData.buyingDate}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="address" className="block text-gray-600 mb-1">warranty:</label>
                        <input
                            type="text"
                            id="warranty"
                            name="warranty"
                            value={formData.warranty}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="salary" className="block text-gray-600 mb-1">quantity:</label>
                        <input
                            type="text"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="salary" className="block text-gray-600 mb-1">brand:</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="attachment" className="block text-gray-600 mb-1">Image:</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="profileImage" className="block text-gray-600 mb-1">userId:</label>
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>
                </div>

                {/* Salary, Attachment, and Profile Image (single column) */}


                {/* Submit Button */}
                <div >
                    <button disabled={isLoading} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Submit
                    </button>

                </div>
                <div className=' px-4 py-2 '>
                    {isError && <p className='text-red-500'>${error?.data.message}</p>}
                    {isSuccess && <p className='text-green-500'>${data.message}</p>}
                </div>
            </form>
        </div>
    );
};

export default AddOfficeAsset;
