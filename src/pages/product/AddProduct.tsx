/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import uploadImage from "../../utils/uploadImage";
import { toast } from "sonner";
import { useAddProductMutation } from "../../redux/features/product/productApi";
import ProductForm from "../../components/product/ProductForm";

const AddProduct = () => {
  const [addProduct, { error }] = useAddProductMutation();
  const [file, setFile] = useState<File | null>(null);
  const methods = useForm();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Adding product...");
    try {
      data.image = file;
      const img = await uploadImage(data.image as File);
      if (img) {
        data.image = img;
      }

      const result = (await addProduct(data)) as any;

      if (!result?.error) {
        methods.reset();
        setFile(null);
        toast.success("Product added successfully", { id: toastId });
      } else {
        toast.error("Something went wrong", { id: toastId });
        console.log(error);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-center my-5">Add New Product</h2>

      <FormProvider {...methods}>
        <ProductForm methods={methods} onSubmit={onSubmit} setFile={setFile} />
      </FormProvider>
    </div>
  );
};

export default AddProduct;
