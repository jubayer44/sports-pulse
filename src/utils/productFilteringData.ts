/* eslint-disable @typescript-eslint/no-explicit-any */
export const getBrand = (data: any) => {
  return data?.data[0]?.brand?.map((item: { _id: string }) => ({
    label: item?._id,
    value: item?._id,
  }));
};

export const getSportType = (data: any) => {
  return data?.data[0]?.sportType?.map((item: { _id: string }) => ({
    label: item?._id,
    value: item?._id,
  }));
};

export const getSize = (data: any) => {
  return data?.data[0]?.size?.map((item: { _id: string }) => ({
    label: item?._id,
    value: item?._id,
  }));
};

export const getColor = (data: any) => {
  return data?.data[0]?.color?.map((item: { _id: string }) => ({
    label: item?._id,
    value: item?._id,
  }));
};

export const getMaterial = (data: any) => {
  return data?.data[0]?.material?.map((item: { _id: string }) => ({
    label: item?._id,
    value: item?._id,
  }));
};

export const getStyles = (data: any) => {
  return data?.data[0]?.style?.map((item: { _id: string }) => ({
    label: item?._id,
    value: item?._id,
  }));
};
