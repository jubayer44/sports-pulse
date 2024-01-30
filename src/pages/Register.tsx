import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import ProductInput from "../components/product/ProductInput";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const methods = useForm();

  if (isLoading) {
    return <h1 className="text-2xl font-bold text-center my-4">Loading...</h1>;
  }

  const handleRegister = async (data: FieldValues) => {
    const toastId = toast.loading("Registering...");
    try {
      await register({
        name: data?.name,
        email: data?.email,
        password: data?.password,
      });

      toast.success("Registered successfully", { id: toastId });
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white">
      <div className="w-full max-w-md rounded-md border border-neutral-500 p-5 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-600 text-center mb-3 font-sans">
          Register
        </h2>
        <div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleRegister)}>
              <ProductInput type="text" name="name" label="Name" required />
              <ProductInput type="email" name="email" label="Email" required />
              <ProductInput
                type="password"
                name="password"
                label="Password"
                required
              />
              <Button
                type="primary"
                className="bg-blue-500 w-full"
                htmlType="submit"
              >
                Register
              </Button>
            </form>
          </FormProvider>
        </div>
        <div className="flex items-center gap-2 my-6 text-sm">
          <p>Already have an account?</p>
          <Link to="/login" className="text-blue-500 font-bold">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
