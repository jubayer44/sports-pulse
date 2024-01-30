import { useState } from "react";
import { Button, Drawer, Space } from "antd";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import ProductInput from "./ProductInput";
import { useAppDispatch } from "../../redux/hooks";
import { setSearchValues } from "../../redux/features/product/productSlice";
import { useGetProductsValuesQuery } from "../../redux/features/product/productApi";
import {
  getBrand,
  getColor,
  getMaterial,
  getSize,
  getSportType,
  getStyles,
} from "../../utils/productFilteringData";

const FilterModal = () => {
  const [open, setOpen] = useState(false);
  const { data } = useGetProductsValuesQuery("");
  const methods = useForm();
  const dispatch = useAppDispatch();

  const onSubmit = (data: FieldValues) => {
    dispatch(setSearchValues(data));
    setOpen(false);
  };

  // show drawer for antd
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    methods.reset();
  };

  const brands = getBrand(data);

  const sportTypes = getSportType(data);

  const sizes = getSize(data);

  const colors = getColor(data);

  const materials = getMaterial(data);

  const styles = getStyles(data);

  return (
    <>
      <Space>
        <Button
          onClick={showDrawer}
          type="primary"
          size="small"
          className="bg-blue-500 font-semibold "
        >
          filter
        </Button>
      </Space>
      <Drawer
        title="Filter Products"
        placement="top"
        onClose={onClose}
        open={open}
      >
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid gap-4 md:gap-y-2  md:grid-cols-3 mb-12 md:mb-4"
          >
            <ProductInput
              type="select"
              name="brand"
              label="Brand"
              options={brands}
            />
            <ProductInput
              type="number"
              name="minPrice"
              label="Min Price"
              placeholder="Min"
            />
            <ProductInput
              type="number"
              name="maxPrice"
              label="Max Price"
              placeholder="Max"
            />
            <ProductInput
              type="select"
              name="sportType"
              label="Sport"
              options={sportTypes}
            />
            <ProductInput
              type="select"
              name="condition"
              label="Condition"
              placeholder="Condition"
              options={[
                {
                  value: "New",
                  label: "New",
                },
                {
                  value: "Used",
                  label: "Used",
                },
              ]}
            />
            <ProductInput
              type="select"
              name="size"
              label="Size"
              options={sizes}
            />
            <ProductInput
              type="select"
              name="color"
              label="Color"
              options={colors}
            />
            <ProductInput
              type="select"
              name="material"
              label="Material"
              options={materials}
            />
            <ProductInput
              type="select"
              name="style"
              label="Style"
              options={styles}
            />
            <div className="absolute bottom-5 right-5">
              <Space size="middle">
                <Button className="bg-red-500 " onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  htmlType="submit"
                  className="bg-blue-500"
                  type="primary"
                >
                  Filter
                </Button>
              </Space>
            </div>
          </form>
        </FormProvider>
      </Drawer>
    </>
  );
};

export default FilterModal;
