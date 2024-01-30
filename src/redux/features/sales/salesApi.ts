import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToSale: builder.mutation({
      query: (data) => ({
        url: "/sale",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products", "Sales"],
    }),
    getSales: builder.query({
      query: (priority) => {
        const params = new URLSearchParams();

        if (priority) {
          params.append("priority", priority!);
        }

        return { url: "/sales", method: "GET", params };
      },
      providesTags: ["Sales"],
    }),
    deleteSale: builder.mutation({
      query: (id) => ({
        url: `/sale/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sales"],
    }),
  }),
});

export const { useAddToSaleMutation, useGetSalesQuery, useDeleteSaleMutation } =
  salesApi;
