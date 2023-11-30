import React, { useEffect, useState } from 'react';
import { useEditEmployeeMutation, useGetSingleEmployeeQuery } from '../../features/employee/employeeApi';
import { Link, useParams } from 'react-router-dom';

const EditOfficeEmployee = () => {
    const { id: empId } = useParams();
    const { data: employee, isLoading: empIsLoading, isError: empIsError, refetch: refetchEmployee } = useGetSingleEmployeeQuery(empId);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        salary: '',
        attachment: '',
        profileImage: '',
    });
    if (!empIsLoading && !empIsError && employee) {
        const { name, email, phone, address, salary, attachment, profileImage } = employee.data;
        if (!formData.name) {
            setFormData({
                name,
                email,
                phone,
                address,
                salary,
                attachment,
                profileImage,
            });
        }
    }


    const [editEmployee, { data, isLoading, isSuccess, isError, error, }] = useEditEmployeeMutation({
        onSuccess: () => {
            refetchEmployee();
        },
    })

    useEffect(() => {
        refetchEmployee()
    }, [refetchEmployee])


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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Provide the employeeId to the editEmployee mutation
        editEmployee({ ...formData, empId });
        console.log({ formData })
        setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
            salary: "",
            attachment: "",
            profileImage: "",
        });
    };

    return (

        <div className="mx-auto">
            <form onSubmit={handleSubmit} className=" mx-auto bg-white p-8 rounded shadow-md">
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><Link to='/employee' className='text-blue-600'> Home </Link> </li>
                        <li>Edit</li>
                    </ul>
                </div>
                <h2 className="text-2xl font-bold mb-2">Edit Employee</h2>

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
                        <label htmlFor="email" className="block text-gray-600 mb-1">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>

                    {/* Phone and Address (2nd row) */}
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="phone" className="block text-gray-600 mb-1">Phone:</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="address" className="block text-gray-600 mb-1">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="salary" className="block text-gray-600 mb-1">Salary:</label>
                        <input
                            type="text"
                            id="salary"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="attachment" className="block text-gray-600 mb-1">Attachment:</label>
                        <input
                            type="text"
                            id="attachment"
                            name="attachment"
                            value={formData.attachment}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="profileImage" className="block text-gray-600 mb-1">Profile Image:</label>
                        <input
                            type="text"
                            id="profileImage"
                            name="profileImage"
                            value={formData.profileImage}
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
                        Update
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

export default EditOfficeEmployee;
