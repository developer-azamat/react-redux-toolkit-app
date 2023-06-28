import React, { useEffect, useState } from "react";
import { Input } from "../ui";
import { useDispatch, useSelector } from "react-redux";
import {
  signUserFailure,
  signUserStart,
  signUserSuccess,
} from "../reducers/auth";
import authService from "../service/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, loggedIn } = useSelector((state) => state.auth);

  const submitLoginHandler = async (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(signUserStart());
    try {
      const response = await authService.userLogin(user);
      dispatch(signUserSuccess(response.user));
      navigate("/");
    } catch (error) {
      dispatch(signUserFailure(error.response.data.errors));
    }
  };

  useEffect(()=> {
    if(loggedIn){
        navigate('/')
    }
}, [])
  return (
    <div className="d-flex align-items-center py-4 px-5 text-center ">
      <div className="form-signin m-auto">
        <form onSubmit={submitLoginHandler} style={{ width: "300px" }}>
          <div className={"mb-2"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-bootstrap-fill d-inline-block me-2"
              viewBox="0 0 16 16"
            >
              <path d="M6.375 7.125V4.658h1.78c.973 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23H6.375zm0 3.762h1.898c1.184 0 1.81-.48 1.81-1.377 0-.885-.65-1.348-1.886-1.348H6.375v2.725z" />
              <path d="M4.002 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4h-8zm1.06 12V3.545h3.399c1.587 0 2.543.809 2.543 2.11 0 .884-.65 1.675-1.483 1.816v.1c1.143.117 1.904.931 1.904 2.033 0 1.488-1.084 2.396-2.888 2.396H5.062z" />
            </svg>
          </div>
          <h1 className="h3 mb-3 fw-normal">Please login </h1>
          <Input label={"Email address"} state={email} setState={setEmail} />
          <Input
            label={"Password"}
            state={password}
            type={"password"}
            setState={setPassword}
          />
          <button
            disabled={isLoading}
            className="btn btn-primary mt-2 w-100 py-2"
            type="submit"
          >
            {isLoading ? "loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
