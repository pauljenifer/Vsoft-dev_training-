import React, { useState } from 'react';
import { Lock, User, Mail, Building, UserCog, AlertCircle, CheckCircle, LogOut, UserPlus, Eye, EyeOff, Users, UserCheck, Building2, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SuperNav from '../../components/SuperAdmin/SuperNav';

const CreateUser = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
    companyName: '',
    password: '',
    confirmPassword: '',
    phoneNumber :'',
    city:'',
    address:''
  });
  const [isFocused, setIsFocused] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    // Validation
    if (!userData.name || !userData.email || !userData.role ||
      !userData.companyName || !userData.password || !userData.confirmPassword || !userData.phoneNumber || !userData.city || !userData.address) {
      setError('All fields are required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (userData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (userData.phoneNumber.length < 10 || userData.phoneNumber.length >10) {
      setError('Enter correct Phone Number');
      return;
    }

    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://test.vconstech.in';
      
      const response = await fetch(`${API_URL}/api/superadmin/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          role: userData.role,
          companyName: userData.companyName,
          password: userData.password,
          city:userData.city,
          phoneNumber:userData.phoneNumber,
          address:userData.address
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to create user');
      }

      setSuccess(data.message || 'User created successfully!');
      setUserData({
        name: '',
        email: '',
        role: '',
        companyName: '',
        password: '',
        confirmPassword: '',
        phoneNumber :'',
        city :'',
        address:''
      });

    } catch (err) {
      console.error('Create user error:', err);
      setError(err.message || 'An error occurred while creating the user');
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (field, focused) => {
    setIsFocused({ ...isFocused, [field]: focused });
  };

  const handleLogout = () => {
    console.log('Logout');
    navigate('/SuperAdmin/login');
  };

  const roles = ['Admin'];

  // Summary Cards Data
  const summaryCards = [
    {
      title: '0 Total Users',
      subtitle: 'User Management',
      detail: '0 Active',
      icon: Users,
      bgColor: 'bg-gradient-to-br from-red-400 to-red-500',
      iconBg: 'bg-white'
    },
    {
      title: '0 Admins',
      subtitle: 'Admin Accounts',
      detail: '0 Recent Updates',
      icon: UserCheck,
      bgColor: 'bg-gradient-to-br from-orange-400 to-orange-500',
      iconBg: 'bg-white'
    },
    {
      title: '0 Companies',
      subtitle: 'Company Management',
      detail: '0 Active Companies',
      icon: Building2,
      bgColor: 'bg-gradient-to-br from-green-400 to-green-500',
      iconBg: 'bg-white'
    },
    {
      title: '0 Records',
      subtitle: 'Total Records',
      detail: '0 This Month',
      icon: FileText,
      bgColor: 'bg-gradient-to-br from-blue-400 to-blue-500',
      iconBg: 'bg-white'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 py-12 px-4">
      <SuperNav/>

      <div className="max-w-7xl mx-auto pt-24 md:pt-32">
        {/* Summary Cards Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryCards.map((card, index) => (
              <div
                key={index}
                className={`${card.bgColor} rounded-3xl shadow-lg p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              >
                <div className={`w-14 h-14 ${card.iconBg} rounded-2xl flex items-center justify-center mb-4`}>
                  <card.icon className="w-7 h-7 text-gray-700" />
                </div>
                <h3 className="text-2xl font-bold mb-1">{card.title}</h3>
                <p className="text-white/90 font-semibold mb-2">{card.subtitle}</p>
                <p className="text-white/80 text-sm">{card.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl bg-[#ffbe2a] flex items-center justify-center shadow-xl transform transition-all duration-300 group-hover:scale-105">
                <User className="w-10 h-10 text-black" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-lg font-bold">+</span>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New User</h1>
              <p className="text-gray-600 text-lg">Add a new user to the ERP system</p>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-10">
            {/* Error Alert */}
            {error && (
              <div className="mb-8 p-5 bg-red-50 border-l-4 border-red-500 rounded-2xl flex items-start shadow-md">
                <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-bold text-red-900">{error}</p>
                </div>
              </div>
            )}

            {/* Success Alert */}
            {success && (
              <div className="mb-8 p-5 bg-green-50 border-l-4 border-green-500 rounded-2xl flex items-start shadow-md">
                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-bold text-green-900">{success}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-800 tracking-wide">
                  Client Name <span className="text-red-500">*</span>
                </label>
                <div className={`relative rounded-2xl transition-all duration-300 ${
                    isFocused.name 
                      ? 'ring-2 ring-[#ffbe2a] shadow-lg shadow-[#ffbe2a]/20' 
                      : 'ring-1 ring-gray-200 hover:ring-gray-300'
                  }`}>
                  <div className="flex items-center px-5 py-4 bg-gray-50 rounded-2xl">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isFocused.name ? 'bg-[#ffbe2a] shadow-md' : 'bg-white'
                      }`}>
                      <User className={`w-5 h-5 ${isFocused.name ? 'text-black' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      onFocus={() => handleFocus('name', true)}
                      onBlur={() => handleFocus('name', false)}
                      className="flex-1 ml-4 bg-transparent text-gray-900 placeholder-gray-400 outline-none font-medium"
                      placeholder="Enter full name"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-800 tracking-wide">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className={`relative rounded-2xl transition-all duration-300 ${
                    isFocused.email 
                      ? 'ring-2 ring-[#ffbe2a] shadow-lg shadow-[#ffbe2a]/20' 
                      : 'ring-1 ring-gray-200 hover:ring-gray-300'
                  }`}>
                  <div className="flex items-center px-5 py-4 bg-gray-50 rounded-2xl">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isFocused.email ? 'bg-[#ffbe2a] shadow-md' : 'bg-white'
                      }`}>
                      <Mail className={`w-5 h-5 ${isFocused.email ? 'text-black' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      onFocus={() => handleFocus('email', true)}
                      onBlur={() => handleFocus('email', false)}
                      className="flex-1 ml-4 bg-transparent text-gray-900 placeholder-gray-400 outline-none font-medium"
                      placeholder="Enter email address"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Number */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-800 tracking-wide">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <div className={`relative rounded-2xl transition-all duration-300 ${
                    isFocused.phoneNumber
                      ? 'ring-2 ring-[#ffbe2a] shadow-lg shadow-[#ffbe2a]/20' 
                      : 'ring-1 ring-gray-200 hover:ring-gray-300'
                  }`}>
                  <div className="flex items-center px-5 py-4 bg-gray-50 rounded-2xl">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isFocused.phoneNumber ? 'bg-[#ffbe2a] shadow-md' : 'bg-white'
                      }`}>
                      <Lock className={`w-5 h-5 ${isFocused.phoneNumber ? 'text-black' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="tel"
                      value={userData.phoneNumber}
                      onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                      onFocus={() => handleFocus('phoneNumber', true)}
                      onBlur={() => handleFocus('phoneNumber', false)}
                      className="flex-1 ml-4 bg-transparent text-gray-900 placeholder-gray-400 outline-none font-medium"
                      placeholder="Enter Phone Number"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Role */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-800 tracking-wide">
                  Role <span className="text-red-500">*</span>
                </label>
                <div className={`relative rounded-2xl transition-all duration-300 ${
                    isFocused.role 
                      ? 'ring-2 ring-[#ffbe2a] shadow-lg shadow-[#ffbe2a]/20' 
                      : 'ring-1 ring-gray-200 hover:ring-gray-300'
                  }`}>
                  <div className="flex items-center px-5 py-4 bg-gray-50 rounded-2xl">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isFocused.role ? 'bg-[#ffbe2a] shadow-md' : 'bg-white'
                      }`}>
                      <UserCog className={`w-5 h-5 ${isFocused.role ? 'text-black' : 'text-gray-400'}`} />
                    </div>
                    <select
                      value={userData.role}
                      onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                      onFocus={() => handleFocus('role', true)}
                      onBlur={() => handleFocus('role', false)}
                      className="flex-1 ml-4 bg-transparent text-gray-900 outline-none font-medium cursor-pointer"
                      disabled={loading}
                    >
                      <option value="">Select role</option>
                      {roles.map((role) => (
                        <option key={role} value={role}>{role.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Company Name */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-800 tracking-wide">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <div className={`relative rounded-2xl transition-all duration-300 ${
                    isFocused.companyName 
                      ? 'ring-2 ring-[#ffbe2a] shadow-lg shadow-[#ffbe2a]/20' 
                      : 'ring-1 ring-gray-200 hover:ring-gray-300'
                  }`}>
                  <div className="flex items-center px-5 py-4 bg-gray-50 rounded-2xl">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isFocused.companyName ? 'bg-[#ffbe2a] shadow-md' : 'bg-white'
                      }`}>
                      <Building className={`w-5 h-5 ${isFocused.companyName ? 'text-black' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="text"
                      value={userData.companyName}
                      onChange={(e) => setUserData({ ...userData, companyName: e.target.value })}
                      onFocus={() => handleFocus('companyName', true)}
                      onBlur={() => handleFocus('companyName', false)}
                      className="flex-1 ml-4 bg-transparent text-gray-900 placeholder-gray-400 outline-none font-medium"
                      placeholder="Enter company name"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* City */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-800 tracking-wide">
                  City <span className="text-red-500">*</span>
                </label>
                <div className={`relative rounded-2xl transition-all duration-300 ${
                    isFocused.city 
                      ? 'ring-2 ring-[#ffbe2a] shadow-lg shadow-[#ffbe2a]/20' 
                      : 'ring-1 ring-gray-200 hover:ring-gray-300'
                  }`}>
                  <div className="flex items-center px-5 py-4 bg-gray-50 rounded-2xl">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isFocused.city ? 'bg-[#ffbe2a] shadow-md' : 'bg-white'
                      }`}>
                      <User className={`w-5 h-5 ${isFocused.city ? 'text-black' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="text"
                      value={userData.city}
                      onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                      onFocus={() => handleFocus('city', true)}
                      onBlur={() => handleFocus('city', false)}
                      className="flex-1 ml-4 bg-transparent text-gray-900 placeholder-gray-400 outline-none font-medium"
                      placeholder="Enter city name"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-800 tracking-wide">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className={`relative rounded-2xl transition-all duration-300 ${
                    isFocused.password 
                      ? 'ring-2 ring-[#ffbe2a] shadow-lg shadow-[#ffbe2a]/20' 
                      : 'ring-1 ring-gray-200 hover:ring-gray-300'
                  }`}>
                  <div className="flex items-center px-5 py-4 bg-gray-50 rounded-2xl">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isFocused.password ? 'bg-[#ffbe2a] shadow-md' : 'bg-white'
                      }`}>
                      <Lock className={`w-5 h-5 ${isFocused.password ? 'text-black' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={userData.password}
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      onFocus={() => handleFocus('password', true)}
                      onBlur={() => handleFocus('password', false)}
                      className="flex-1 ml-4 bg-transparent text-gray-900 placeholder-gray-400 outline-none font-medium"
                      placeholder="Min 6 characters"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="ml-2 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-800 tracking-wide">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className={`relative rounded-2xl transition-all duration-300 ${
                    isFocused.confirmPassword 
                      ? 'ring-2 ring-[#ffbe2a] shadow-lg shadow-[#ffbe2a]/20' 
                      : 'ring-1 ring-gray-200 hover:ring-gray-300'
                  }`}>
                  <div className="flex items-center px-5 py-4 bg-gray-50 rounded-2xl">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isFocused.confirmPassword ? 'bg-[#ffbe2a] shadow-md' : 'bg-white'
                      }`}>
                      <Lock className={`w-5 h-5 ${isFocused.confirmPassword ? 'text-black' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={userData.confirmPassword}
                      onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                      onFocus={() => handleFocus('confirmPassword', true)}
                      onBlur={() => handleFocus('confirmPassword', false)}
                      className="flex-1 ml-4 bg-transparent text-gray-900 placeholder-gray-400 outline-none font-medium"
                      placeholder="Re-enter password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="ml-2 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-3 md:col-span-2">
                <label className="block text-sm font-bold text-gray-800 tracking-wide">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className={`relative rounded-2xl transition-all duration-300 ${
                    isFocused.address 
                      ? 'ring-2 ring-[#ffbe2a] shadow-lg shadow-[#ffbe2a]/20' 
                      : 'ring-1 ring-gray-200 hover:ring-gray-300'
                  }`}>
                  <div className="flex items-center px-6 py-4 bg-gray-50 rounded-2xl">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                        isFocused.address ? 'bg-[#ffbe2a] shadow-md' : 'bg-white'
                      }`}>
                      <User className={`w-5 h-5 ${isFocused.address ? 'text-black' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="text"
                      value={userData.address}
                      onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                      onFocus={() => handleFocus('address', true)}
                      onBlur={() => handleFocus('address', false)}
                      className="flex-1 ml-4 bg-transparent text-gray-900 placeholder-gray-400 outline-none font-medium"
                      placeholder="Enter Address"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className='flex flex-col'>
              {/* Action Buttons */}
              <div className="flex gap-5 mt-10">
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="flex-1 bg-white border-2 border-gray-200 text-gray-700 font-bold py-4 rounded-2xl transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-[#ffbe2a] text-black font-bold py-4 rounded-2xl transition-all duration-200 hover:shadow-2xl shadow-[#ffbe2a]/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating User...
                    </span>
                  ) : (
                    'Create User'
                  )}
                </button>
              </div>

              {/* Table Section */}
              <div className="bg-white rounded-lg shadow-md mt-8">
                <div className="overflow-x-auto">
                  <table className="border w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border-2 border-[#ffbe2a] p-3 text-left font-semibold text-gray-700">Name</th>
                        <th className="border-2 border-[#ffbe2a] p-3 text-left font-semibold text-gray-700">Email</th>
                        <th className="border-2 border-[#ffbe2a] p-3 text-left font-semibold text-gray-700">Phone</th>
                        <th className="border-2 border-[#ffbe2a] p-3 text-left font-semibold text-gray-700">Role</th>
                        <th className="border-2 border-[#ffbe2a] p-3 text-left font-semibold text-gray-700">Company</th>
                        <th className="border-2 border-[#ffbe2a] p-3 text-left font-semibold text-gray-700">City</th>
                        <th className="border-2 border-[#ffbe2a] p-3 text-left font-semibold text-gray-700">Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-2 border-[#ffbe2a] p-3">Sample Name</td>
                        <td className="border-2 border-[#ffbe2a] p-3">sample@email.com</td>
                        <td className="border-2 border-[#ffbe2a] p-3">123-456-7890</td>
                        <td className="border-2 border-[#ffbe2a] p-3">Admin</td>
                        <td className="border-2 border-[#ffbe2a] p-3">ABC Corp</td>
                        <td className="border-2 border-[#ffbe2a] p-3">New York</td>
                        <td className="border-2 border-[#ffbe2a] p-3">123 Main St</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;