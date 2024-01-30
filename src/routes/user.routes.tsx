import Home from "../pages/home/Home";
import AddProduct from "../pages/product/AddProduct";
import AllProduct from "../pages/product/AllProduct";
import CreateVariant from "../pages/product/CreateVariant";
import EditProduct from "../pages/product/EditProduct";
import ManageProduct from "../pages/product/ManageProduct";
import ManageProductDetails from "../pages/product/ManageProductDetails";
import ProductDetails from "../pages/product/ProductDetails";
import SalesOverview from "../pages/sales/SalesOverview";

export const userPaths = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "",
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    name: "Sales Overview",
    path: "/sales-overview",
    element: <SalesOverview />,
  },
  {
    name: "Products",
    children: [
      {
        name: "Add a Product",
        path: "add-product",
        element: <AddProduct />,
      },
      {
        name: "All Products",
        path: "all-products",
        element: <AllProduct />,
      },
      {
        name: "Mange Products",
        path: "manage-products",
        element: <ManageProduct />,
      },
      {
        path: "manage-product/:id",
        element: <ManageProductDetails />,
      },
      {
        path: "create-variant/:id",
        element: <CreateVariant />,
      },
      {
        path: "edit-product/:id",
        element: <EditProduct />,
      },
    ],
  },
];
