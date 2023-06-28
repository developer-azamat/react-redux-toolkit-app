import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../helper/persistance-log";
import { logoutUser } from "../reducers/auth";
const Navbar = () => {
  const { user, loggedIn } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
      dispatch(logoutUser());
    removeItem("token");
    navigate("/login");
  };
  return (
    <header className="d-flex container justify-content-between align-items-center px-5 py-2  mb-5 border-bottom">
      <h1 className="h4">
        <Link
          to="/"
          className="d-flex align-items-center text-dark text-decoration-none"
        >
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
          <span>React</span>
        </Link>
      </h1>
      <div className={"d-flex gap-2 align-items-center nav-links"}>
        {loggedIn ? (
          <div className={"d-flex gap-2 align-content-center"}>
            <p
              className={
                "text-black text-decoration-none fs-5 m-0 text-capitalize"
              }
            >
              {user.username}
            </p>
            <button className="btn btn-outline-danger" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <NavLink
              to={"/login"}
              className={"text-black text-decoration-none fs-5"}
            >
              Login
            </NavLink>
            <NavLink
              to={"/register"}
              className={"text-black text-decoration-none fs-5"}
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
