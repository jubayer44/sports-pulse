/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import ProductForm from "../../components/product/ProductForm";
import { useState } from "react";
import {
  useAddProductMutation,
  useGetSingleProductQuery,
} from "../../redux/features/product/productApi";
import { useNavigate, useParams } from "react-router-dom";
import generateFormData from "../../utils/generateFormData";
import { toast } from "sonner";
import uploadImage from "../../utils/uploadImage";

const CreateVariant = () => {
  const [file, setFile] = useState<File | null>(null);
  const [addProduct, { error }] = useAddProductMutation();
  const navigate = useNavigate();
  const methods = useForm();

  const param = useParams();

  const { data, isLoading } = useGetSingleProductQuery(param.id);

  const product = data?.data || {};

  const onSubmit = async (formData: FieldValues) => {
    const toastId = toast.loading("Adding product...");

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

      const result = (await addProduct(formData)) as any;

      if (!result?.error) {
        setFile(null);
        toast.success("Create a new variant successfully", { id: toastId });

        navigate("/manage-products");
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
      <h2 className="text-xl font-bold text-center my-5">Create Variant</h2>

      {isLoading ? (
        <h1 className="text-2xl font-bold text-center my-4">Loading...</h1>
      ) : null}

      <FormProvider {...methods}>
        <ProductForm
          methods={methods}
          onSubmit={onSubmit}
          setFile={setFile}
          data={data?.data}
        />
      </FormProvider>
    </div>
  );
};

export default CreateVariant;
