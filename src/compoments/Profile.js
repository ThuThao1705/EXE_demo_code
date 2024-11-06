import React, { useState } from 'react';
import { 
  LogOut, Edit2, Camera, Mail, User, Key, Save,
  Package, Bell, Gift, MapPin, Phone, UserCircle,
   Calendar, 
} from 'lucide-react';
import '../styles/profile.css';
const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: 'johndoe123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+84 123 456 789',
    gender: 'male',
    birthdate: '1990-01-01',
    address: '123 Main St, District 1, Ho Chi Minh City',
    avatar: 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png'
  });

  const menuItems = [
    { id: 'profile', icon: <UserCircle size={20} />, label: 'Hồ sơ cá nhân' },
    { id: 'orders', icon: <Package size={20} />, label: 'Đơn hàng đã mua' },
    { id: 'notifications', icon: <Bell size={20} />, label: 'Thông báo', badge: 3 },
    { id: 'vouchers', icon: <Gift size={20} />, label: 'Voucher của tôi' },
  ];

  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc muốn đăng xuất?");
    if (confirmLogout) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Implement API call to save profile data
  };

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        {/* User Avatar Section */}
        <div className="p-6 border-b">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={profileData.avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-sm"
              />
              <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-lg hover:bg-gray-50">
                <Camera size={16} className="text-gray-600" />
              </button>
            </div>
            <h3 className="mt-4 font-semibold text-gray-800">{profileData.firstName} {profileData.lastName}</h3>
            <p className="text-sm text-gray-500">@{profileData.username}</p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {menuItems.find(item => item.id === activeTab)?.label}
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            >
              <LogOut size={20} />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Edit/Save Button */}
              <div className="p-6 border-b flex justify-end">
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  {isEditing ? (
                    <>
                      <Save size={20} />
                      <span>Lưu thay đổi</span>
                    </>
                  ) : (
                    <>
                      <Edit2 size={20} />
                      <span>Chỉnh sửa</span>
                    </>
                  )}
                </button>
              </div>

              {/* Form Fields */}
              <div className="p-6 grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Username Field */}
                  <div className="form-group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User size={18} />
                      <span>Tên đăng nhập</span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={profileData.username}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  {/* Gender Field */}
                  <div className="form-group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User size={18} />
                      <span>Giới tính</span>
                    </label>
                    <select
                      name="gender"
                      value={profileData.gender}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    >
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>

                  {/* First Name Field */}
                  <div className="form-group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User size={18} />
                      <span>Họ</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  {/* Last Name Field */}
                  <div className="form-group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User size={18} />
                      <span>Tên</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="form-group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Mail size={18} />
                      <span>Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="form-group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Phone size={18} />
                      <span>Số điện thoại</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  {/* Birthdate Field */}
                  <div className="form-group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Calendar size={18} />
                      <span>Ngày sinh</span>
                    </label>
                    <input
                      type="date"
                      name="birthdate"
                      value={profileData.birthdate}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                {/* Address Field - Full Width */}
                <div className="form-group col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={18} />
                    <span>Địa chỉ</span>
                  </label>
                  <textarea
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Password Change Section */}
                {isEditing && (
                  <div className="form-group col-span-2 border-t pt-6">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Key size={18} />
                      <span>Đổi mật khẩu</span>
                    </label>
                    <div className="grid grid-cols-2 gap-6">
                      <input
                        type="password"
                        placeholder="Mật khẩu cũ"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="password"
                        placeholder="Mật khẩu mới"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Đơn hàng của bạn</h2>
              {/* Add orders content here */}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Thông báo</h2>
              {/* Add notifications content here */}
            </div>
          )}

          {activeTab === 'vouchers' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Voucher của bạn</h2>
              {/* Add vouchers content here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;