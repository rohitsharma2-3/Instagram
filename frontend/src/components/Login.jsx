import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import load from "../animation/WhiteLoad.json";

const Login = () => {
  const navigate = useNavigate();
  let [login, setLogin] = useState("login");
  let [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHanler = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signUpRoute = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:4040/insta/signup", formData, {
        withCredentials: true,
      })
      .then((res) => {
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        toast.success(res.data.message);
        if (res.data.Success === true) {
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loginRoute = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:4040/insta/login", formData, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        if (res.data.Success === true) {
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="p-4">
      <div className="w-2/2 md:w-6/12 shadow-lg mx-auto mt-30 p-5 md:p-10">
        {login === "signup" ? (
          <h2 className="text-3xl font-bold text-center">SignUp Form</h2>
        ) : (
          <h2 className="text-3xl font-bold text-center">Login Form</h2>
        )}
        <form>
          {login === "signup" ? (
            <div className="pt-3">
              <label htmlFor="name" className="block">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={inputHanler}
                placeholder="Full name"
                className="w-full border border-gray-400 mt-2 px-4 py-2 rounded"
              />
            </div>
          ) : null}
          <div className="pt-3">
            <label htmlFor="email" className="block">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={inputHanler}
              placeholder="Enter email"
              className="w-full border border-gray-400 mt-2 px-4 py-2 rounded"
            />
          </div>
          <div className="pt-3">
            <label htmlFor="password" className="block">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={inputHanler}
              placeholder="•••••••••••••"
              className="w-full border border-gray-400 mt-2 px-4 py-2 rounded"
            />
          </div>
          <div>
            <p className="mt-4">
              Already have an account,{" "}
              {login === "signup" ? (
                <span
                  className="text-red-500 font-bold cursor-pointer"
                  onClick={() => setLogin("login")}
                >
                  Login
                </span>
              ) : (
                <span
                  className="text-red-500 font-bold cursor-pointer"
                  onClick={() => setLogin("signup")}
                >
                  SignUp
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center justify-end mt-4">
            {login === "signup" ? (
              <button
                className="bg-black text-white px-10 py-2 outline-none rounded cursor-pointer"
                onClick={signUpRoute}
              >
                {loading ? (
                  <Lottie
                    animationData={load}
                    loop={true}
                    className="w-6 h-6"
                  />
                ) : (
                  `SignUp`
                )}
              </button>
            ) : (
              <button
                className="bg-black text-white px-10 py-2 outline-none rounded cursor-pointer"
                onClick={loginRoute}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
