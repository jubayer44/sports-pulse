import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (queryParams) => {
        const params = new URLSearchParams();
        if (queryParams) {
          Object.entries(queryParams).forEach(([key, value]) => {
            if (key && value) {
              params.append(key, value!.toString());
            }
          });
        }
        return {
          url: "/products",
          method: "GET",
          params,
        };
      },
      providesTags: ["Products"],
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/product",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, product }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    deleteMultipleProducts: builder.mutation({
      query: (ids) => ({
        url: `/products`,
        method: "DELETE",
        body: ids,
      }),
      invalidatesTags: ["Products"],
    }),
    getProductsValues: builder.query({
      query: () => ({
        url: "/products/values",
        method: "GET",
      }),
    }),
    getProductAndUserCount: builder.query({
      query: () => ({
        url: "/products-users",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useGetSingleProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useDeleteMultipleProductsMutation,
  useGetProductsValuesQuery,
  useGetProductAndUserCountQuery,
} = productApi;
