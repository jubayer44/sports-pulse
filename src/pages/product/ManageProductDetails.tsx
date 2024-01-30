import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetSingleProductQuery,
} from "../../redux/features/product/productApi";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect } from "react";
import { toast } from "sonner";

const ManageProductDetails = () => {
  const param = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetSingleProductQuery(param?.id);

  const [deleteProduct, { isSuccess }] = useDeleteProductMutation();

  const {
    name,
    price,
    description,
    image,
    color,
    brand,
    size,
    condition,
    quantity,
    _id,
  } = data?.data || {};

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product deleted successfully");
      navigate("/manage-products");
    }
  }, [isSuccess, navigate]);

  if (isLoading) {
    return <h2 className="text-xl font-bold text-center my-5">Loading...</h2>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img className="w-full h-full" src={image} alt="Product Image" />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {name}
            </h2>

            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300 mr-1">
                  Price:
                </span>
                <span className=" dark:text-red-500 font-bold text-red-500">
                  ${price}
                </span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300 mr-1">
                  In Stock:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {quantity}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Color:
              </span>
              <span className="ml-2 text-gray-600-font-semibold dark:text-gray-300">
                {color}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Condition:
              </span>

              <span className="ml-2 text-gray-600-font-semibold dark:text-gray-300">
                {condition}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Brand:
              </span>

              <span className="ml-2 text-gray-600-font-semibold dark:text-gray-300">
                {brand}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Size:
              </span>
              <span className="ml-2 text-gray-600-font-semibold dark:text-gray-300">
                {size}
              </span>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Product Description:
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {description}
              </p>
            </div>
            <div className="flex gap-2 items-center mt-2">
              <div>
                <DeleteFilled
                  className="text-red-500 w-16 h-16 text-[30px]"
                  onClick={() => {
                    deleteProduct(_id);
                  }}
                />
                <Link to={`/edit-product/${_id}`}>
                  <EditFilled className="text-blue-500 w-16 h-16 text-[30px]" />
                </Link>
              </div>
              <Link to={`/create-variant/${_id}`}>
                <Button type="primary" className="bg-blue-500">
                  Create Variant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProductDetails;
