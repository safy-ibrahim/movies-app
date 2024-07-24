import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  const [errAPI, setErrAPI] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserToken } = useContext(UserContext);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("* Email is required")
      .matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, "Enter valid email"),
    password: Yup.string()
      .required("* password is required")
      .matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/, "Enter valid password"),
  });

  function login(formValues) {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formValues)
      .then((res) => {
        if (res?.data?.message === "success") {
          localStorage.setItem("userToken", res?.data?.token);
          setUserToken(res?.data?.token);
          setIsLoading(false);
          navigate("/");
        } else {
          setErrAPI("Unexpected error occurred. Please try again.");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setErrAPI(
          err?.response?.data?.message || "Server error. Please try again."
        );
        setIsLoading(false);
      });
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: login,
    validationSchema: validationSchema,
  });

  return (
    <div className="container py-3">
      <h3 className="text-center">Login Now</h3>
      <p className="text-center text-danger fs-5">{errAPI}</p>
      <div className="w-50 m-auto mt-2">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email Address:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="ms-2 text-danger">{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter password"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="ms-2 text-danger">{formik.errors.password}</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

{
  /* {isLoading ? <i className="fas fa-spinner fa-spin fs-4"></i> : 'Login'}   */
}
