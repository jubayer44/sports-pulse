import { TResponseProduct } from "../../types";
import noImage from "../../assets/images/no_image.png";

const ProductCard = ({ product }: { product: TResponseProduct }) => {
  const { name, price, image } = product;

  return (
    <div className="relative flex flex-col md:flex-row rounded-md shadow-lg p-2 border border-white bg-white">
      <div className="w-full bg-white grid place-items-center">
        {image ? (
          <img
            src={image}
            alt="Image"
            className="rounded-xl w-full max-h-[150px] md:max-h-[100px]"
          />
        ) : (
          <img
            src={noImage}
            alt="Image"
            className="rounded-xl w-full max-h-[150px] md:max-h-[100px]"
          />
        )}
      </div>
      <div className="w-full bg-white flex flex-col space-y-2 p-3">
        <h3 className="text-gray-700 text-base font-bold"> {name} </h3>

        <div>
          <p className="text-red-500 font-semibold">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
