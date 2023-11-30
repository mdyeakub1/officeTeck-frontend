import { apiSlice } from "../api/apiSlice";

export const assetApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAsset: builder.query({
            query: ({ page, limit, searchTerm }) => {
                return `assets?page=${page}&limit=${limit}&searchTerm=${searchTerm}`;
            }

        }),

        getSingleAsset: builder.query({
            query: (AssetId) => {
                return `assets/${AssetId}`
            }
        }),

        addAsset: builder.mutation({
            query: (data) => ({
                url: "/assets/create-asset",
                method: "POST",
                body: data,
            })
        }),

        deleteAsset: builder.mutation({
            query: (assetId) => ({
                url: `/assets/${assetId}`,
                method: "DELETE",
            }),
        }),

        editAsset: builder.mutation({
            query: ({ assetId, ...formData }) => ({
                url: `/assets/${assetId}`,
                method: "PATCH",
                body: formData,
            }
            )
        })
    }),
});

export const {
    useAddAssetMutation,
    useDeleteAssetMutation,
    useEditAssetMutation,
    useGetAssetQuery,
    useGetSingleAssetQuery
} = assetApi;
