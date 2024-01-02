import { apiSlice } from "../api/apiSlice";

export const assignProjectApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssignProject: builder.query({
            query: (projectId) => {
                return `employee-project?searchTerm=${projectId}`;
            }
        }),

        getSingleAssignProject: builder.query({
            query: (ProjectId) => {
                return `employee-project/${ProjectId}`
            }
        }),

        getSingleProjectForAssign: builder.query({
            query: (ProjectId) => {
                return `projects/${ProjectId}`
            }
        }),

        addAssignProject: builder.mutation({
            query: (data) => ({
                url: "/employee-project/create-employee-project",
                method: "POST",
                body: data,
            })
        }),

        deleteAssignProject: builder.mutation({
            query: (projectId) => ({
                url: `/employee-project/${projectId}`,
                method: "DELETE",
            }),
        }),

        editAssignProject: builder.mutation({
            query: ({ projectId, ...formData }) => ({
                url: `/employee-project/${projectId}`,
                method: "PATCH",
                body: formData,
            }
            )
        })
    }),
});

export const {
    useAddAssignProjectMutation,
    useDeleteAssignProjectMutation,
    useEditAssignProjectMutation,
    useGetAssignProjectQuery,
    useGetSingleAssignProjectQuery,
    useGetSingleProjectForAssignQuery
} = assignProjectApi;
