import React, { useState } from 'react';
import { useAddEmployeeMutation } from '../../features/employee/employeeApi';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const AddOfficeEmployee = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        emergencyContact: '',
        bloodGroup: '',
        joiningDate: '',
        department: '',
        supervisor: '',
        nidNumber: '',
        passportNumber: '',
        image: '',
        bio: '',
        userId: '',
    });

    const [addEmployee, { data, isLoading, isSuccess, isError, error }] = useAddEmployeeMutation()

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
            title: 'Employee can not created please try again!',
            showConfirmButton: false,
            timer: 1500,
        });
        navigate('/employee');

    } else if (!isLoading && !isError && isSuccess) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Employee created successfully',
            showConfirmButton: false,
            timer: 1500,
        });
        navigate('/employee');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        await addEmployee(formData);
    };



    return (

        <div className="mx-auto">
            <form onSubmit={handleSubmit} className=" mx-auto bg-white p-8 rounded shadow-md">
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><Link to='/employee' className='text-blue-600'> Home </Link> </li>
                        <li>Add New</li>
                    </ul>
                </div>
                <h2 className="text-2xl font-bold mb-2">Add New Employee</h2>

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
                        <label htmlFor="salary" className="block text-gray-600 mb-1">emergencyContact</label>
                        <input
                            type="text"
                            id="emergencyContact"
                            name="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="attachment" className="block text-gray-600 mb-1">Blood Group:</label>
                        <input
                            type="text"
                            id="bloodGroup"
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="profileImage" className="block text-gray-600 mb-1">joiningDate:</label>
                        <input
                            type="text"
                            id="joiningDate"
                            name="joiningDate"
                            value={formData.joiningDate}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="profileImage" className="block text-gray-600 mb-1">department:</label>
                        <select className='border border-gray-300 px-3 py-1 w-full' name="department" id="department">
                            <option >Select</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Web Design">Web Design</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="SQA">SQA</option>
                        </select>
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="profileImage" className="block text-gray-600 mb-1">supervisor:</label>
                        <input
                            type="text"
                            id="supervisor"
                            name="supervisor"
                            value={formData.supervisor}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="profileImage" className="block text-gray-600 mb-1">nidNumber:</label>
                        <input
                            type="text"
                            id="nidNumber"
                            name="nidNumber"
                            value={formData.nidNumber}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="profileImage" className="block text-gray-600 mb-1">passportNumber:</label>
                        <input
                            type="text"
                            id="passportNumber"
                            name="passportNumber"
                            value={formData.passportNumber}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="profileImage" className="block text-gray-600 mb-1">image:</label>
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
                        <label htmlFor="profileImage" className="block text-gray-600 mb-1">bio:</label>
                        <input
                            type="text"
                            id="bio"
                            name="bio"
                            value={formData.bio}
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

export default AddOfficeEmployee;
