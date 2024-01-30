import { Button, Input } from "antd";
import ManageProductCard from "../../components/product/ManageProductCard";
import {
  useDeleteMultipleProductsMutation,
  useGetProductsQuery,
} from "../../redux/features/product/productApi";
import { TResponseProduct } from "../../types";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "sonner";
import {
  resetCheckedValues,
  resetSearchValues,
  setSearchValues,
} from "../../redux/features/product/productSlice";
import { useDispatch } from "react-redux";
import FilterModal from "../../components/product/FilterModal";
import { FormEvent, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ManageProduct = () => {
  const { checkedValues, searchValues } = useAppSelector(
    (state) => state.product
  );

  const { data, isLoading, refetch, error } = useGetProductsQuery(searchValues);
  const [deleteMultipleProducts] = useDeleteMultipleProductsMutation();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting...");
    try {
      const result = await deleteMultipleProducts(checkedValues).unwrap();

      if (result.statusCode === 200) {
        toast.success("Product deleted successfully", { id: toastId });
        dispatch(resetCheckedValues());
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  // handle search
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const value = form.elements.namedItem("search") as HTMLInputElement;

    if (value) {
      const inputValue = value.value;
      dispatch(setSearchValues({ search: inputValue }));
    }
  };

  // refetch data on search state change
  useEffect(() => {
    refetch();
  }, [refetch]);

  // reset search values on url pathname change
  useEffect(() => {
    dispatch(resetSearchValues());
  }, [location?.pathname, dispatch]);
  if (isLoading) {
    return <h2 className="text-xl font-bold text-center my-5">Loading...</h2>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-center my-5">Manage Product </h2>
      <div className="rounded-md md:flex justify-end">
        <form
          onSubmit={(e) => handleSearch(e)}
          className="flex items-center gap-2"
        >
          <p className="font-bold text-gray-600">Search</p>
          <Input placeholder="Search" name="search" />
        </form>
      </div>
      <div className="my-2 border border-gray-300 rounded-md p-2 flex justify-between gap-2">
        <div>
          {checkedValues.length > 0 ? (
            <div className="flex gap-2">
              <Button
                onClick={handleDelete}
                type="primary"
                size="small"
                className="bg-red-500 font-semibold "
              >
                Delete
              </Button>
              <p className="text-gray-600 text-sm font-semibold">
                {checkedValues?.length} items selected
              </p>
            </div>
          ) : null}
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-gray-600 text-sm font-semibold">
            Total: {data?.data?.length}
          </p>

          <FilterModal />
        </div>
      </div>
      <div>
        {error ? (
          <h2 className="text-xl font-bold text-center my-5">No Data Found</h2>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {data?.data?.map((product: TResponseProduct) => (
              <ManageProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProduct;
