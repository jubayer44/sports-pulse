import { TSaleProductResponse } from "../types";

export const calculateRevenue = (data: TSaleProductResponse[]) => {
  let revenue: number = 0;

  // calculate total revenue
  data?.forEach((item: TSaleProductResponse) => {
    revenue += item?.quantity * item?.product?.price || 1;
  });

  return revenue;
};

export const calculateTotalSale = (data: TSaleProductResponse[]) => {
  let totalSaleItems = 0;

  // calculate total sale items
  data?.forEach((item: TSaleProductResponse) => {
    totalSaleItems += item?.quantity;
  });

  return totalSaleItems;
};

export const getSellersName = (data: TSaleProductResponse[]) => {
  const sellerArray = [] as string[];
  const num = data?.length > 10 ? 10 : data?.length;
  for (let i = 0; i < num; i++) {
    if (!sellerArray.includes(data[i]?.buyerName)) {
      sellerArray.push(data[i]?.buyerName);
    }
  }
  return sellerArray;
};
