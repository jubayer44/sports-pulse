/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "antd";
import SalesOverviewTable from "../../components/sales/SalesOverviewTable";
import { useGetSalesQuery } from "../../redux/features/sales/salesApi";
import { TSaleProductResponse } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setPriority } from "../../redux/features/sales/salesSlice";
import { useEffect } from "react";

const SalesOverview = () => {
  const { priority } = useAppSelector((state) => state.sales);
  const dispatch = useAppDispatch();
  const { data, isLoading, refetch, error } = useGetSalesQuery(priority);

  useEffect(() => {
    refetch();
  }, [priority, dispatch, refetch]);

  if (isLoading) {
    return <h1 className="text-xl font-bold text-center my-4">Loading...</h1>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-center my-4">Sales Overview</h1>
      <div className="flex justify-end">
        <div className="relative group">
          <Button type="primary" className="bg-blue-500">
            Filter
          </Button>
          <div className="absolute hidden group-hover:flex flex-col gap-1 min-w-[100px] right-0 text-center bg-gray-200 z-10 p-3 rounded-md font-semibold text-gray-600">
            <p
              onClick={() => dispatch(setPriority("daily"))}
              className="p-1 hover:bg-blue-200 cursor-pointer rounded-md text-sm font-semibold"
            >
              Daily
            </p>
            <p
              onClick={() => dispatch(setPriority("weekly"))}
              className="p-1 hover:bg-blue-200 cursor-pointer rounded-md text-sm font-semibold"
            >
              Weekly
            </p>
            <p
              onClick={() => dispatch(setPriority("monthly"))}
              className="p-1 hover:bg-blue-200 cursor-pointer rounded-md text-sm font-semibold"
            >
              Monthly
            </p>
            <p
              onClick={() => dispatch(setPriority("yearly"))}
              className="p-1 hover:bg-blue-200 cursor-pointer rounded-md text-sm font-semibold"
            >
              Yearly
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-gray-700 text-sm">
                      No
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-700 text-sm">
                      Product Name
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-700 text-sm">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-700 text-sm">
                      Seller Name
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-700 text-sm">
                      Sale
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-700 text-sm">
                      Sale Date
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-700 text-sm">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map(
                    (item: TSaleProductResponse, index: number) => (
                      <SalesOverviewTable
                        key={index}
                        item={item}
                        index={index}
                      />
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOverview;
