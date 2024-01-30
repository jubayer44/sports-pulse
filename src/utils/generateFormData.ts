import { FieldValues } from "react-hook-form";
import { TResponseProduct } from "../types";

const generateFormData = (data: TResponseProduct, formData: FieldValues) => {
  const {
    name,
    price,
    description,
    sportType,
    brand,
    material,
    color,
    condition,
    size,
    quantity,
    isOutdoor,
    style,
    width,
  } = data;

  formData.name = formData.name || name;
  formData.price = formData.price || price;
  formData.description = formData.description || description;
  formData.color = formData.color || color;
  formData.brand = formData.brand || brand;
  formData.size = formData.size || size;
  formData.condition = formData.condition || condition;
  formData.quantity = formData.quantity || quantity;
  formData.sportType = formData.sportType || sportType;
  formData.isOutdoor = formData.isOutdoor || isOutdoor;
  formData.material = formData.material || material;
  formData.style = formData.style || style;
  formData.width = formData.width || width;
};

export default generateFormData;
