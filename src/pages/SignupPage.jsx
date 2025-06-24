import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, UserPlus, Store, Shield, User } from 'lucide-react';
import { apiClient } from '../../api/client';

export default function SignupPage() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    role: "user", // default selection
  });

  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const registerUser = async (data) => {
    setLoading(true);
    try {
      const response = await apiClient.post('/users/signup', data, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <UserPlus className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <form action={registerUser} className="space-y-6">
          {/* FirstName */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter your first name"
            />
          </div>

          {/* LastName */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter your last name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter your email"
            />
          </div>

          {/* Role Selection */}

          <div className="">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Account Type
              </label>

              <div className="grid grid-cols-1 gap-3">
                {/* User Option */}
                <label
                  className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${formData.role === "user"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={formData.role === "user"}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <User className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      Regular User
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Buy, browse and interact with vendors.
                    </div>
                  </div>
                </label>

                {/* Vendor Option */}
                <label
                  className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${formData.role === "vendor"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="vendor"
                    checked={formData.role === "vendor"}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <Store className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      Vendor
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Post and manage advertisements for your business.
                    </div>
                  </div>
                </label>
              </div>
            </div>


          </div>

          <div>

            <div className="grid grid-cols-1 gap-3">
              <label
              >
                <input
                  type="radio"
                  name="role"
                  className="sr-only"
                />
             
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                  </div>
                </div>
              </label>

            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                className="input-field pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
             
                className="input-field pr-10"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              I agree to the{' '}
              <Link to="/terms" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Terms and Conditions
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full btn-primary flex justify-center items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <UserPlus className="h-4 w-4" />
            <span>Create Account</span>
            
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500">Already have an account?</span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/login"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

