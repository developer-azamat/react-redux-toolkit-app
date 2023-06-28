import { Route, Routes } from "react-router-dom";
import { Register, Login, Main, Navbar } from "./components";
import authService from "./service/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signUserSuccess } from "./reducers/auth";
import { getItem } from "./helper/persistance-log";

function App() {
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const response = await authService.getUser();
      dispatch(signUserSuccess(response.user));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      getUser();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
