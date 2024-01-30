import { Input } from "antd";
import noImage from "../../assets/images/no_image.png";
import { TResponseProduct } from "../../types";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  removeCheckedValue,
  setCheckedValue,
} from "../../redux/features/product/productSlice";
import { useEffect, useState } from "react";

const ManageProductCard = ({ product }: { product: TResponseProduct }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { checkedValues } = useAppSelector((state) => state.product);
  const { name, price, image, _id, quantity, brand, condition, sportType } =
    product;

  const dispatch = useAppDispatch();

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(setCheckedValue(e.target.value));
    } else if (!e.target.checked) {
      dispatch(removeCheckedValue(e.target.value));
    }
  };

  useEffect(() => {
    checkedValues.includes(_id) ? setIsChecked(true) : setIsChecked(false);
  }, [checkedValues, _id]);

  return (
    <div className="relative rounded-md shadow-lg p-2 border border-gray-500 bg-white">
      <Input
        onChange={(e) => handleCheck(e)}
        type="checkbox"
        className="h-5 w-5 absolute top-2 z-10"
        value={_id}
        checked={isChecked}
      />
      <Link to={`/manage-product/${_id}`}>
        <div className="p-4">
          <div className="w-full bg-white grid place-items-center p-1 mb-2">
            {image ? (
              <img
                src={image}
                alt="Image"
                className="rounded-xl w-full max-h-[200px]"
              />
            ) : (
              <img
                src={noImage}
                alt="Image"
                className="rounded-xl w-full max-h-[200px]"
              />
            )}
          </div>
          <div className="w-full bg-white md:flex justify-between items-center space-y-2 p-1">
            <h3 className="font-black text-gray-800 text-base "> {name} </h3>

            <div className=" font-black text-gray-800 ">
              <p className="text-red-500 font-semibold">${price}</p>
            </div>
          </div>
          <div className="md:flex justify-between items-center mb-2">
            <p className="text-gray-600 font-semibold">Quantity: {quantity}</p>
            <p className="text-gray-600 font-semibold">Brand: {brand}</p>
          </div>
          <div className="md:flex justify-between items-center">
            <p className="text-gray-600 font-semibold">
              Condition: {condition}
            </p>
            <p className="text-gray-600 font-semibold">Game: {sportType}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ManageProductCard;
