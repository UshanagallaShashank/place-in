import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Alert from "../components/Alert";
import Logo from "../components/Logo";

const initialState = {
  email: "",
  password: "",
  userType: "admin",
  showAlert: true,
};

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, loginUser } =
    useAppContext();

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "select"
        ? e.target.selectedOptions[0].value
        : e.target.value;
    setValues({ ...values, [name]: value });
  };

  async function onSubmit(e) {
    e.preventDefault();
    const { email, password, userType } = values;
    if (!email || !password || !userType) {
      displayAlert("danger", "Please enter email and password");
      return;
    }
    loginUser({ email, password, userType });
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
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="font-medium text-2xl xl:text-4xl text-blue-900 text-center mb-4">
              LOGIN
            </div>
            {showAlert && <Alert />}
            <form
              className="w-full max-w-xs"
              onSubmit={onSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="userType"
                >
                  User Type
                </label>
                <select
                  className="mt-2 w-full h-10 border border-gray-300 rounded-md transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 p-2"
                  id="userType"
                  name="userType"
                  value={values.userType}
                  onChange={handleChange}
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                  <option value="company">Company</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="mt-2 w-full h-10 border border-gray-300 rounded-md transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 p-2"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email Address"
                  required={true}
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <div className="relative mb-4">
  <label
    className="block text-sm font-medium text-gray-700"
    htmlFor="password"
  >
    Password
  </label>
  <div className="relative">
    <input
      className="mt-2 w-full h-10 border border-gray-300 rounded-md transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 p-2 pr-10"
      type={showPassword ? "text" : "password"}
      id="password"
      name="password"
      placeholder="Enter your password"
      required={true}
      value={values.password}
      onChange={handleChange}
    />
    {showPassword ? (
      <AiFillEyeInvisible
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-xl cursor-pointer"
      />
    ) : (
      <AiFillEye
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-xl cursor-pointer"
      />
    )}
  </div>
</div>

              <button
                disabled={isLoading}
                className="mt-8 w-full bg-black text-white px-7 py-3 text-sm 
                  font-medium uppercase rounded shadow-md
                  hover:bg-gray-700 transition duration-150 
                  ease-in-out hover:shadow-lg active:bg-gray-800"
                type="submit"
              >
                {isLoading && (
                  <Loader
                    backgroundColor="text-gray-300"
                    loaderColor="fill-black"
                  />
                )}
                {!isLoading && "Login"}
              </button>
              <div className="mt-4 flex flex-col md:flex-row items-center w-full">
                <div className="flex items-center font-light text-base text-gray-500">
                  Don't have an account
                  <span
                    className="text-black ml-2 font-medium cursor-pointer"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </span>
                </div>
                
              </div>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
