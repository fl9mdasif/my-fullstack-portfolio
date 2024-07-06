import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPet: build.mutation({
      query: (data) => ({
        url: "/blogs",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.projects],
    }),

    getAllBlogs: build.query({
      // query: (arg: Record<string, any>) => ({
      query: () => ({
        url: "/blogs",
        method: "GET",
        // params: arg,
      }),
      providesTags: [tagTypes.blogs],
    }),

    getSinglePet: build.query({
      query: (petId) => (
        console.log("singleId", petId),
        {
          url: `/pets/${petId}`,
          method: "GET",
        }
      ),
    }),

    updatePet: build.mutation({
      query: ({ id, data }) => ({
        url: `/pets/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.projects],
    }),

    deletePet: build.mutation({
      query: (id) => ({
        url: `/pets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.projects],
    }),
  }),
});

export const {
  useCreatePetMutation,
  useDeletePetMutation,
  useGetAllBlogsQuery,
  useGetSinglePetQuery,
  useUpdatePetMutation,
} = blogApi;
