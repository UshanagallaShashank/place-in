import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useAppContext } from "../context/appContext";
import Logo from "../components/Logo";

const initialState = {
  name: "",
  email: "",
  enrollmentNo: "",
  password: "",
  showAlert: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState(initialState);
  const { user, isLoading, displayAlert, registerUser } = useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  async function onSubmit(e) {
    e.preventDefault();
    const { name, enrollmentNo, email, password } = values;
    if (!email || !password || !name || !enrollmentNo) {
      displayAlert("danger", "Please enter email and password");
      return;
    }
    registerUser({ name, enrollmentNo, email, password });
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <div className="h-screen items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Student Sign up
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <form
                className="mx-auto max-w-xs flex flex-col gap-4"
                onSubmit={onSubmit}
              >
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter your Roll No"
                  name="enrollmentNo"
                  value={values.enrollmentNo}
                  onChange={handleChange}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <button className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <span className="ml-3">Sign Up</span>
                </button>
              </form>
              <p className="mt-6 text-xs text-gray-600 text-center">
                Already have an account?{" "}
                <span
                  className="text-blue-900 font-semibold cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
