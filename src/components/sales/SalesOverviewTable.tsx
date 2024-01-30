import { Link } from "react-router-dom";
import { TSaleProductResponse } from "../../types";
import { DeleteFilled } from "@ant-design/icons";
import { useDeleteSaleMutation } from "../../redux/features/sales/salesApi";

type TSaleProps = {
  item: TSaleProductResponse;
  index: number;
};

const SalesOverviewTable = ({ item, index }: TSaleProps) => {
  const [deleteSale] = useDeleteSaleMutation();

  const modifyDate = new Date(item?.saleDate);

  const formattedDate = modifyDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <tr
      key={index}
      className="border-b transition duration-300 ease-in-out hover:bg-neutral-300"
    >
      <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-600 text-xs">
        {index + 1}
      </td>
      <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-600 text-xs">
        {item?.product?._id ? (
          <Link to={`/manage-product/${item?.product?._id}`}>
            {item?.product?.name || "N/A"}
          </Link>
        ) : (
          "N/A"
        )}
      </td>
      <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-600 text-xs">
        {`${item?.product?.price ? `$${item?.product?.price}` : "N/A"}`}
      </td>
      <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-600 text-xs">
        {item?.buyerName}
      </td>
      <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-600 text-xs">
        {item?.quantity}
      </td>
      <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-600 text-xs">
        {formattedDate}
      </td>
      <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-600 text-xs">
        <DeleteFilled
          onClick={() => deleteSale(item?._id)}
          className="text-red-500 text-xl cursor-pointer"
        />
      </td>
    </tr>
  );
};

export default SalesOverviewTable;
