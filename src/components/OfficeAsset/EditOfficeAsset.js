import React, { useEffect, useState } from 'react';
import { useEditAssetMutation, useGetSingleAssetQuery } from '../../features/asset/assetApi';
import { Link, useParams } from 'react-router-dom';

const EditOfficeAsset = () => {
    const { id: assetId } = useParams();
    const { data: asset, isLoading: empIsLoading, isError: empIsError, refetch: refetchAsset } = useGetSingleAssetQuery(assetId);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        deadline: '',
        client: '',
        image: '',
    });
    if (!empIsLoading && !empIsError && asset) {
        const {  name,description,startDate, deadline,client,image, } = asset.data;
        if (!formData.name) {
            setFormData({
                name,description,startDate, deadline,client,image
            });
        }
    }


    const [editAsset, { data, isLoading, isSuccess, isError, error, }] = useEditAssetMutation({
        onSuccess: () => {
            refetchAsset();
        },
    })

    useEffect(() => {
        refetchAsset()
    }, [refetchAsset])


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
        // Provide the assetId to the editAsset mutation
        editAsset({ ...formData, assetId });
        console.log({ formData })
        setFormData({
            name: '',
        description: '',
        startDate: '',
        deadline: '',
        client: '',
        image: '',
        });
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
                        <label htmlFor="phone" className="block text-gray-600 mb-1">Start Date:</label>
                        <input
                            type="text"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="address" className="block text-gray-600 mb-1">deadline:</label>
                        <input
                            type="text"
                            id="deadline"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 w-full"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-2">
                        <label htmlFor="salary" className="block text-gray-600 mb-1">Client:</label>
                        <input
                            type="text"
                            id="client"
                            name="client"
                            value={formData.client}
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

export default EditOfficeAsset;
