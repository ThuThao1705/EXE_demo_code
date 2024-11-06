
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload } from 'lucide-react';

const ThreeDModel = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Xử lý khi người dùng tải ảnh lên
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setShowOverlay(true);
    }
  };

  const handleClose = () => {
    setShowOverlay(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Video nền */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/cd83bf9e-ac7b-4274-b12d-9b3cf6df54ad.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Lớp phủ để làm tối video nền */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 -z-10"></div>

      {/* Logo và Menu (Giữ lại phần điều hướng chính) */}
      <div className="flex justify-between items-center px-8 py-4 border-b bg-[#ECA6CA] bg-opacity-80 backdrop-blur-sm relative z-10">
  <Link 
    to="/home" 
    className="text-3xl font-bold text-orange-500 transition-transform duration-200 hover:scale-110"
  >
    CHICIFY
  </Link>
</div>

      {/* Phần Banner và chức năng tải ảnh */}
      <section className="relative flex items-center justify-center py-10">
  {/* Bảng nhập thông tin chiều cao, cân nặng, số đo 3 vòng */}
  <div className="absolute left-0 w-64 p-6 bg-white bg-opacity-80 backdrop-blur-lg shadow-lg rounded-lg z-10 mr-6">
    <h3 className="text-xl font-bold mb-4 text-gray-700">Nhập thông tin</h3>
    
    {/* Nhập Chiều Cao */}
    <label className="block font-medium text-gray-700 mb-2">Chiều Cao (cm)</label>
    <input
      type="number"
      placeholder="Nhập chiều cao"
      className="w-full border rounded-lg p-2 mb-4 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />

    {/* Nhập Cân Nặng */}
    <label className="block font-medium text-gray-700 mb-2">Cân Nặng (kg)</label>
    <input
      type="number"
      placeholder="Nhập cân nặng"
      className="w-full border rounded-lg p-2 mb-4 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />

    {/* Nhập Số Đo 3 Vòng */}
    <label className="block font-medium text-gray-700 mb-2">Số Đo 3 Vòng (cm)</label>
    <div className="flex gap-2 mb-4">
      <input
        type="number"
        placeholder="Vòng 1"
        className="w-full border rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="number"
        placeholder="Vòng 2"
        className="w-full border rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="number"
        placeholder="Vòng 3"
        className="w-full border rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* Chọn Giới Tính */}
    <label className="block font-medium text-gray-700 mb-2">Giới Tính</label>
    <div className="flex gap-4 mb-4">
      <label className="flex items-center">
        <input
          type="radio"
          name="gender"
          value="Nam"
          className="mr-2"
        />
        Nam
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          name="gender"
          value="Nữ"
          className="mr-2"
        />
        Nữ
      </label>
    </div>
  </div>

  {/* Phần chính của trang */}
  <div className="w-full max-w-3xl p-6 bg-[#EEDCCE] bg-opacity-80 backdrop-blur-lg shadow-lg rounded-lg relative z-10 ml-64">
    <div className="text-center mb-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Explore 3D Model</h2>
      <p className="text-gray-600">Upload your own image or view the default model</p>
    </div>

    {/* Video mặc định và tải ảnh */}
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-64 h-64 rounded-lg shadow-lg overflow-hidden">
        {uploadedImage ? (
          <img
            src={uploadedImage}
            alt="3D Model"
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-lg shadow-lg"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src={`${process.env.PUBLIC_URL}/assets/videos/video.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-25 transition-opacity"></div>
      </div>

      {/* Nút tải ảnh mới */}
      <button
        onClick={() => document.getElementById('fileInput').click()}
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg"
      >
        <Upload className="h-5 w-5" />
        <span>Upload New Image</span>
      </button>

      {/* Input file ẩn để người dùng chọn ảnh */}
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  </div>
</section>



      {/* Overlay hiển thị ảnh lớn */}
      {showOverlay && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-20">
          <div className="relative">
            <img
              src={uploadedImage}
              alt="3D Model"
              className="w-96 h-auto rounded-lg shadow-xl"
            />
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeDModel;