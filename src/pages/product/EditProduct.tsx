/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../redux/features/product/productApi";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import ProductForm from "../../components/product/ProductForm";
import { useState } from "react";
import { toast } from "sonner";
import generateFormData from "../../utils/generateFormData";
import uploadImage from "../../utils/uploadImage";

const EditProduct = () => {
  const [file, setFile] = useState<File | null>(null);
  const param = useParams();
  const { data, isLoading } = useGetSingleProductQuery(param?.id);
  const [updateProduct, { error }] = useUpdateProductMutation();
  const methods = useForm();

  const product = data?.data || {};

  const onSubmit = async (formData: FieldValues) => {
    const toastId = toast.loading("Updating product...");

    try {
      formData.image = file || product?.image;

      generateFormData(product, formData); // generate form data

      // upload image to ImageBB
      if (formData?.image?.name) {
        const img = await uploadImage(formData.image as File);
        if (img) {
          formData.image = img;
        }
      }

      const updatedData = {
        id: product?._id,
        product: formData,
      };

      const result = (await updateProduct(updatedData)) as any;

      if (!result?.error) {
        setFile(null);
        toast.success("Product update successfully", { id: toastId });

        // navigate("/manage-products");
      } else {
        toast.error("Something went wrong", { id: toastId });
        console.log(error);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  if (isLoading) {
    return <h2 className="text-xl font-bold text-center my-5">Loading...</h2>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-center my-5">Edit Your Product</h2>
      <div className="max-w-3xl border border-gray-400 rounded-md shadow-lg mx-auto p-2 md:p-4">
        <FormProvider {...methods}>
          <ProductForm
            methods={methods}
            onSubmit={onSubmit}
            setFile={setFile}
            data={data?.data}
          />
        </FormProvider>
      </div>
    </div>
  );
};

export default EditProduct;
