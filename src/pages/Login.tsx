import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import ProductInput from "../components/product/ProductInput";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const methods = useForm();

  const handleLogin = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");
    try {
      const userData = {
        email: data?.email,
        password: data?.password,
      };
      const result = await login(userData).unwrap();

      const { user } = result?.data as { user: TUser; token: string };

      dispatch(setUser({ user, token: result?.data?.token }));

      toast.success("Logged in successfully", { id: toastId });

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  if (isLoading) {
    return <h1 className="text-2xl font-bold text-center my-4">Loading...</h1>;
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white">
      <div className="w-full max-w-md rounded-md border border-neutral-500 p-5 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-600 text-center mb-3 font-sans">
          Login
        </h2>
        <div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleLogin)}>
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
                Login
              </Button>
            </form>
          </FormProvider>
        </div>
        <div className="flex items-center gap-2 my-6 text-sm">
          <p>Don't have an account?</p>
          <Link to="/register" className="text-blue-500 font-bold">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
