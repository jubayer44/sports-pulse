/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Select } from "antd";
import { Controller } from "react-hook-form";
import { SelectProps } from "antd/lib/select";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  defaultValue?: any;
  placeholder?: string;
  required?: boolean;
  options?: SelectProps["options"];
  setFile?: (file: File | null) => void;
};

const ProductInput = ({
  type,
  name,
  label,
  defaultValue,
  placeholder,
  required,
  options,
  setFile,
}: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {label ? (
        <label htmlFor={name} className="block font-semibold">
          {label}
        </label>
      ) : null}
      <Controller
        name={name}
        // @ts-ignore next-line
        render={({ field }) => {
          if (
            type === "text" ||
            type === "number" ||
            type === "date" ||
            type === "email" ||
            type === "password"
          ) {
            return (
              <Input
                {...field}
                type={type}
                id={name}
                defaultValue={defaultValue}
                placeholder={placeholder}
                required={required}
              />
            );
          } else if (type === "select") {
            return (
              <Select
                {...field}
                id={name}
                defaultValue={
                  typeof defaultValue === "boolean"
                    ? defaultValue
                      ? "Yes"
                      : "No"
                    : defaultValue || "Please Select One"
                }
                options={options}
                className="w-full"
              />
            );
          } else if (type === "file") {
            return (
              <div className="flex gap-3">
                <input
                  onChange={(e) => setFile?.(e.target.files?.[0] || null)}
                  type="file"
                  name={name}
                  id="name"
                />
                {defaultValue ? (
                  <img className="w-14 h-14" src={defaultValue} alt="" />
                ) : null}
              </div>
            );
          }
        }}
      />
    </div>
  );
};

export default ProductInput;
