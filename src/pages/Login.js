import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../components/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://momma-s-care.onrender.com/api/auth/login",
        formData
      );
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <section className="bg-ivory">
      <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-pink-100 to-pink-200">
        {/* Left Side - Logo and Tagline */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center bg-pink-50 p-10">
          <h1 className="text-4xl font-bold text-pink mb-4 tracking-wide">
            Momma’s Care
          </h1>
          <p className="text-center max-w-md text-charcoal text-lg">
            Your trusted companion through pregnancy and baby care. Track.
            Learn. Care.
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-6">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-semibold text-center mb-6 text-pink">
              Login to Momma’s Care
            </h2>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-pink mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                required
                className="w-full border border-lightgray px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-pink mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  required
                  className="w-full border border-lightgray px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 pr-10"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink text-ivory font-semibold py-2 rounded-lg hover:bg-darkpink transition-colors"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="mt-4 text-sm text-center text-lightgray">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-pink font-medium hover:underline"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
