import React, { useContext, useEffect, useState } from "react";
import style from "./Register.module.css";
import { useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  const [errAPI, setErrAPI] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { userToken, setUserToken } = useContext(UserContext);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name min length is 3")
      .max(15, "Name length must be less than 15 characters or equil")
      .required("* Name is required"),
    email: Yup.string()
      .required("* Email is required")
      .matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, "Enter valid email"),
    phone: Yup.string()
      .required("* Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Enter valid number"),
    password: Yup.string()
      .required("* password is required")
      .matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/, "Enter valid password"),
    rePassword: Yup.string()
      .required("* Confirm password is required")
      .oneOf([Yup.ref("password")], "password and rePassword must be matched"),
  });

  // ------------------------------------- register
  function register(formValues) {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", formValues)
      .then((res) => {
        if (res?.data?.message == "success") {
          localStorage.setItem("userToken", res?.data?.token);
          setUserToken(res?.data?.token);
          setIsLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        setErrAPI(err?.response?.data?.message);
        setIsLoading(false);
      });
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: register,
    validationSchema: validationSchema,
  });

  useEffect(() => {}, []);
  return (
    <>
      <div className="container py-3">
        <h3 className="text-center">Register Now</h3>
        <p className="text-center text-danger fs-5">{errAPI}</p>
        <div className="w-50 m-auto mt-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold">
                User Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your name"
              />
              {/* {(formik.errors.name && formik.touched.name)? <div className="my-1">{formik.errors.name}</div> : null} */}
              {formik.errors.name && formik.touched.name && (
                <p className="ms-2 text-danger">{formik.errors.name}</p>
              )}
            </div>
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
                placeholder="Enter our email"
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
            <div className="mb-3">
              <label htmlFor="rePassword" className="form-label fw-semibold">
                Re-Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="rePassword"
                name="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="confirm password"
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <p className="ms-2 text-danger">{formik.errors.rePassword}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label fw-semibold">
                Phone Number:
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your number"
              />
              {formik.errors.phone && formik.touched.phone && (
                <p className="ms-2 text-danger">{formik.errors.phone}</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              {isLoading ? (
                <i className="fas fa-spinner fa-spin fs-4"></i>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
