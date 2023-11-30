import { apiSlice } from "../api/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProject: builder.query({
            query: ({ page, limit, searchTerm }) => {
                return `projects?page=${page}&limit=${limit}&searchTerm=${searchTerm}`;
            }

        }),

        getSingleProject: builder.query({
            query: (ProjectId) => {
                return `projects/${ProjectId}`
            }
        }),

        addProject: builder.mutation({
            query: (data) => ({
                url: "/projects/create-project",
                method: "POST",
                body: data,
            })
        }),

        deleteProject: builder.mutation({
            query: (projectId) => ({
                url: `/projects/${projectId}`,
                method: "DELETE",
            }),
        }),

        editProject: builder.mutation({
            query: ({ projectId, ...formData }) => ({
                url: `/projects/${projectId}`,
                method: "PATCH",
                body: formData,
            }
            )
        })
    }),
});

export const {
    useAddProjectMutation,
    useDeleteProjectMutation,
    useEditProjectMutation,
    useGetProjectQuery,
    useGetSingleProjectQuery
} = projectApi;
