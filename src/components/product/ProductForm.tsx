import { Button } from "antd";
import ProductInput from "../ProductInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TResponseProduct } from "../../types";

interface ProductFormProps {
  methods: ReturnType<typeof useForm>;
  onSubmit: SubmitHandler<FieldValues>;
  setFile?: (file: File | null) => void;
  data?: TResponseProduct;
}

const ProductForm = ({
  methods,
  onSubmit,
  setFile,
  data,
}: ProductFormProps) => {
  const {
    name,
    price,
    description,
    image,
    sportType,
    brand,
    color,
    condition,
    size,
    quantity,
    isOutdoor,
    material,
    style,
    width,
  } = data || {};

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ProductInput
          type="text"
          name="name"
          label="Product Name"
          defaultValue={name}
          placeholder="Football"
          required
        />
        <ProductInput
          type="number"
          name="price"
          label="Product Price"
          defaultValue={price}
          placeholder="100"
        />
        <ProductInput
          type="text"
          name="description"
          label="Product Description"
          defaultValue={description}
          placeholder="description"
        />
        <ProductInput
          type="file"
          name="image"
          label="Image"
          defaultValue={image}
          required
          setFile={setFile}
        />
        <ProductInput
          type="text"
          name="sportType"
          label="Sport Name"
          defaultValue={sportType}
          placeholder="Sport Name"
        />
        <ProductInput
          type="text"
          name="color"
          label="Product Color"
          defaultValue={color}
          placeholder="White/Black"
        />
        <ProductInput
          type="text"
          name="brand"
          label="Product Brand"
          defaultValue={brand}
          placeholder="Adidas"
        />
        <ProductInput
          type="text"
          name="size"
          label="Product Size"
          defaultValue={size}
          placeholder="Standard | XL"
        />
        <ProductInput
          type="select"
          name="condition"
          label="Product Condition"
          defaultValue={condition}
          options={[
            { label: "New", value: "New" },
            { label: "Used", value: "Used" },
          ]}
          required
        />
        <ProductInput
          type="number"
          name="quantity"
          label="Product Quantity"
          defaultValue={quantity}
          placeholder="10"
        />
        <ProductInput
          type="text"
          name="material"
          label="Product Material"
          defaultValue={material}
          placeholder="Cotton"
        />
        <ProductInput
          type="text"
          name="width"
          label="Product Width"
          defaultValue={width}
          placeholder="250gm"
        />
        <ProductInput
          type="text"
          name="style"
          label="Product Style"
          defaultValue={style}
          placeholder="Casual"
        />
        <div>
          <ProductInput
            type="select"
            name="isOutdoor"
            label="Outdoor Game"
            defaultValue={isOutdoor}
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
          />
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <Button
          className="bg-blue-500 mt-4 px-20"
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
