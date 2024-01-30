import { useEffect } from "react";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import {
  removeUser,
  selectCurrentToken,
} from "./redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { isTokenValid } from "./utils/verifyJwt";
import { useLocation } from "react-router-dom";

function App() {
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();
  const pathName = useLocation()?.pathname;

  // if user is not authenticated, remove user

  useEffect(() => {
    if (token) {
      const isValid = isTokenValid(token);
      if (!isValid) {
        dispatch(removeUser());
      }
    }
  }, [token, dispatch, pathName]);

  return (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  );
}

export default App;
