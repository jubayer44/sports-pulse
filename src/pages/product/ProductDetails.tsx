import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/features/product/productApi";
import noImage from "../../assets/images/no_image.png";
import ProductModal from "../../components/product/ProductModal";
import { useEffect } from "react";

const ProductDetails = () => {
  const param = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetSingleProductQuery(param?.id);

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
    if (!isLoading && !quantity) {
      navigate("/all-products");
    }
  }, [quantity, isLoading, navigate]);

  if (isLoading) {
    return <h1 className="text-2xl font-bold text-center my-4">Loading...</h1>;
  }

  return (
    <section className="overflow-hidden font-poppins text-black">
      <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 md:w-1/2 ">
            <div className="sticky top-0 z-50 overflow-hidden ">
              <div
                className="relative mb-6 lg:mb-10"
                style={{ height: "450px" }}
              >
                {image ? (
                  <img
                    src={image}
                    alt="image"
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <img
                    src={noImage}
                    alt="image"
                    className="object-contain w-full h-full"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 ">
            <div className="lg:pl-20">
              <div className="pb-6 mb-8 border-b border-gray-700">
                <h2 className="mt-2 text-xl font-bold md:text-2xl">{name}</h2>
                <p className="text-green-500 font-bold mt-2">
                  In Stock: {quantity}
                </p>
                <div className="flex flex-wrap items-center mb-6"></div>
                <p className="max-w-md mb-8 text-gray-600">{description}</p>

                <p className="inline-block text-xl font-semibold text-gray-700">
                  <span>${price}</span>
                </p>
              </div>
              <div className="flex justify-between gap-2">
                <div className="mb-8">
                  <h2 className="mb-2 text-base font-bold text-gray-600">
                    Color
                  </h2>
                  <p className="font-semibold text-gray-500">{color}</p>
                </div>
                <div className="mb-8">
                  <h2 className="mb-2 text-base font-bold text-gray-600">
                    Brand
                  </h2>
                  <p className="font-semibold text-gray-500">{brand}</p>
                </div>
                <div className="mb-8">
                  <h2 className="mb-2 text-base font-bold text-gray-600">
                    Size
                  </h2>
                  <p className="font-semibold text-gray-500">{size}</p>
                </div>
              </div>
              <div className="flex justify-between gap-2">
                <div className="pb-6 mb-8 border-b border-gray-300 ">
                  <h2 className="mb-2 text-base font-bold text-gray-600">
                    Condition
                  </h2>
                  <div className="flex flex-wrap -mb-2">
                    <p className="font-semibold text-gray-500">{condition}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center ">
                <ProductModal name={name} quantity={quantity} id={_id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
