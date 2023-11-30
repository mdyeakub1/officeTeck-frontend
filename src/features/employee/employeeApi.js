import { apiSlice } from "../api/apiSlice";

export const employeeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEmployee: builder.query({
            query: ({ page, limit, searchTerm }) => {
                return `employees?page=${page}&limit=${limit}&searchTerm=${searchTerm}`;
            }

        }),

        getSingleEmployee: builder.query({
            query: (empId) => {
                return `employees/${empId}`
            }
        }),

        addEmployee: builder.mutation({
            query: (data) => ({
                url: "/employees/create-employee",
                method: "POST",
                body: data,
            })
        }),

        deleteEmployee: builder.mutation({
            query: (empId) => ({
                url: `/employees/${empId}`,
                method: "DELETE",
            }),
        }),

        editEmployee: builder.mutation({
            query: ({ empId, ...formData }) => ({
                url: `/employees/${empId}`,
                method: "PATCH",
                body: formData,
            }
            )
        })
    }),
});

export const {
    useAddEmployeeMutation,
    useGetEmployeeQuery,
    useGetSingleEmployeeQuery,
    useEditEmployeeMutation,
    useDeleteEmployeeMutation
} = employeeApi;
