/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Space } from "antd";
import { createStyles } from "antd-style";
import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import ProductInput from "../ProductInput";
import { useAddToSaleMutation } from "../../redux/features/sales/salesApi";
import { toast } from "sonner";

type TModalProps = {
  name: string;
  quantity: number;
  id: string;
};

const useStyle = createStyles(({ token }: any) => ({
  "my-modal-body": {
    padding: token.paddingSM,
  },
  "my-modal-mask": {
    boxShadow: `inset 0 0 15px #fff`,
  },
}));

const ProductModal = ({ name, quantity, id }: TModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState([false, false]);
  const [addToSale] = useAddToSaleMutation();

  const methods = useForm();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading...");
    data.product = id;

    try {
      const res = await addToSale(data).unwrap();

      if (res.statusCode === 201) {
        toast.success("Product added to Sale", { id: toastId });
        methods.reset();
        toggleModal(0, false);
      }
    } catch (error: any) {
      Modal.error({
        title: "Error",
        content: error?.data?.message,
        footer: (
          <div className="flex justify-end">
            <Button
              key="ok"
              className="bg-blue-500"
              type="primary"
              onClick={() => Modal.destroyAll()}
            >
              OK
            </Button>
          </div>
        ),
      });
      toast.error("Add to sale failed", { id: toastId });
      console.log("Error:", error?.data?.message);
    }
  };

  // antd modal styles and functions start
  const { styles } = useStyle();
  const toggleModal = (idx: number, target: boolean) => {
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };

  const classNames = {
    body: styles["my-modal-body"],
    mask: styles["my-modal-mask"],
  };

  const modalStyles = {
    mask: {
      backdropFilter: "blur(10px)",
    },
  };
  // antd modal styles and functions end

  return (
    <>
      <Space>
        <Button
          type="primary"
          className="bg-blue-500 w-full px-8"
          onClick={() => toggleModal(0, true)}
        >
          sell
        </Button>
      </Space>
      <Modal
        open={isModalOpen[0]}
        onCancel={() => toggleModal(0, false)}
        classNames={classNames}
        styles={modalStyles}
        footer={null}
      >
        <div>
          <div>
            <h1 className="text-xl font-bold my-2">{name}</h1>
            <p className="font-semibold">Quantity: {quantity}</p>
          </div>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            action=""
            className="my-2"
          >
            <div>
              <ProductInput
                type="text"
                name="buyerName"
                label="Name"
                placeholder="Jack Sparrow"
                required
              />
              <ProductInput
                type="number"
                name="quantity"
                label="Quantity"
                placeholder="2"
                required
              />
              <ProductInput type="date" name="saleDate" label="Date" required />
            </div>

            <div className="flex justify-end">
              <Button
                className="bg-blue-500 mt-4"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default ProductModal;
