import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../features/auth/authApi";
import { setCredentials } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

const AuthForm = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const response = await login({
          email: formData.email,
          password: formData.password,
        }).unwrap();
        dispatch(setCredentials({ ...response.user, token: response.token }));
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords don't match!");
          return;
        }

        const response = await register({
          email: formData.email,
          password: formData.password,
        }).unwrap();
        dispatch(setCredentials({ ...response.user, token: response.token }));
      }

      navigate("/");
    } catch (err: any) {
      console.error("Auth error:", err);
      let message = "Something went wrong.";

      if (err?.data?.errors?.length) {
        message = err.data.errors.join(", ");
      } else if (err?.data?.message) {
        message = err.data.message;
      } else if (typeof err === "string") {
        message = err;
      }

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h2>
          {errorMessage && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm border border-red-300 mt-4">
              {errorMessage}
            </div>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md text-sm border-gray-300"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md text-sm border-gray-300"
                placeholder="Enter your password"
              />
            </div>
            {!isLogin && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-sm border-gray-300"
                  placeholder="Confirm your password"
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2D336B] hover:bg-[#232955]"
            >
              {loading
                ? isLogin
                  ? "Signing in..."
                  : "Creating account..."
                : isLogin
                ? "Sign in"
                : "Create account"}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          {isLogin ? (
            <>
              <span className="text-gray-500">Don't have an account?</span>{" "}
              <Link
                to="/register"
                className="font-medium text-[#2D336B] hover:text-[#232955]"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-500">Already have an account?</span>{" "}
              <Link
                to="/login"
                className="font-medium text-[#2D336B] hover:text-[#232955]"
              >
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
