import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  FileText,
  ArrowRight,
  User,
} from 'lucide-react';
import { API_PATHS } from '../../utils/apiPaths';
import { useAuth } from '../../context/AuthContext'
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/helpers';

const SignUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const validateName = (name) => {
    if (!name) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    if (name.length > 50) return 'Name must be less than 50 characters';
    return '';
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== password) return 'Passwords do not match';
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const newFieldErrors = { ...fieldErrors };
      if (name === 'name') {
        newFieldErrors.name = validateName(value);
      } else if (name === 'email') {
        newFieldErrors.email = validateEmail(value);
      } else if (name === 'password') {
        newFieldErrors.password = validatePassword(value);
        if (touched.confirmPassword) {
          newFieldErrors.confirmPassword = validateConfirmPassword(
            formData.confirmPassword,
            value
          );
        }
      } else if (name === 'confirmPassword') {
        newFieldErrors.confirmPassword = validateConfirmPassword(
          value,
          formData.password
        );
      }
      setFieldErrors(newFieldErrors);
    }
    if (error) setError('');
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newFieldErrors = { ...fieldErrors };
    if (name === 'name') {
      newFieldErrors.name = validateName(formData.name);
    } else if (name === 'email') {
      newFieldErrors.email = validateEmail(formData.email);
    } else if (name === 'password') {
      newFieldErrors.password = validatePassword(formData.password);
    } else if (name === 'confirmPassword') {
      newFieldErrors.confirmPassword = validateConfirmPassword(
        formData.confirmPassword,
        formData.password
      );
    }
    setFieldErrors(newFieldErrors);
  };

  const isFormValid = () => {
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword,
      formData.password
    );
    return (
      !nameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      formData.name &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      termsAccepted
    );
  };

  const handleSubmit = async () => {
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword,
      formData.password
    );

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setFieldErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
      });
      return;
    }

    if (!termsAccepted) {
      setError('Please accept the Terms of Service and Privacy Policy');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        const { token, ...user } = response.data;
        setSuccess('Account created successfully! Redirecting...');
        login(user, token);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-green-800 to-green-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600 text-sm">Join Invoice Generator today</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                  fieldErrors.name && touched.name
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-black'
                }`}
                placeholder="Enter your full name"
              />
            </div>
            {fieldErrors.name && touched.name && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                  fieldErrors.email && touched.email
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-black'
                }`}
                placeholder="Enter your email"
              />
            </div>
            {fieldErrors.email && touched.email && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                  fieldErrors.password && touched.password
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-black'
                }`}
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {fieldErrors.password && touched.password && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                  fieldErrors.confirmPassword && touched.confirmPassword
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-black'
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {fieldErrors.confirmPassword && touched.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.confirmPassword}</p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-4 h-4 text-green-800 border-gray-300 rounded focus:ring-black"
            />
            <label htmlFor="terms">
              I agree to the{' '}
              <a href="#" className="text-green-800 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-green-800 hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          {/* Sign Up Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || !isFormValid()}
            className="w-full bg-gradient-to-r from-green-800 to-green-600 text-white py-3 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center group"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              className="text-black font-medium hover:underline"
              onClick={() => navigate('/login')}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;