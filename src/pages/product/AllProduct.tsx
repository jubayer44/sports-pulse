import { Link, useLocation } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import { TResponseProduct } from "../../types";
import ProductCard from "../../components/product/ProductCard";
import { Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FormEvent, useEffect } from "react";
import { RootState } from "../../redux/store";
import {
  resetSearchValues,
  setSearchValues,
} from "../../redux/features/product/productSlice";

const AllProduct = () => {
  const { searchValues } = useAppSelector((state: RootState) => state.product);
  const { data, isLoading, refetch, error } = useGetProductsQuery(searchValues);
  const dispatch = useAppDispatch();
  const location = useLocation();

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
      <h1 className="text-xl text-center my-5 font-bold text-black">
        All Products
      </h1>
      <div className="rounded-md md:flex justify-end mb-4">
        <form
          onSubmit={(e) => handleSearch(e)}
          className="flex items-center gap-2"
        >
          <p className="font-bold text-gray-600">Search</p>
          <Input placeholder="Search" name="search" />
        </form>
      </div>

      <div>
        {error ? (
          <h2 className="text-xl font-bold text-center my-5">No Data Found</h2>
        ) : (
          <div className="grid md:grid-cols-3 gap-3">
            {data?.data?.map((product: TResponseProduct) => {
              return (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <ProductCard product={product} />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProduct;
