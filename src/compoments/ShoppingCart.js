import React, { useState } from 'react';
import { Heart, Trash2, Search, Plus, Minus, Percent } from 'lucide-react';
import { AlertDescription, Alert } from '@chakra-ui/react';
import img4 from '../image/mau12.jpg';
import img5 from '../image/mau11.jpg';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Set bộ lẻ áo croptop trễ vai và chân váy ngắn có dây rút nữ.',
      image: img4,
      price: 850000,
      originalPrice: 1000000,
      quantity: 1,
      size: 'M',
      color: 'Đen',
      isLiked: false,
      description: 'Chất liệu vải cao cấp, phom dáng rộng thời trang'
    },
    {
      id: 2,
      name: 'Áo thun nữ kiểu chéo vai ôm body phối hoa chất liệu thun tăm mềm mịn thoáng mát.',
      image: img5,
      price: 650000,
      originalPrice: 800000,
      quantity: 1,
      size: 'L',
      color: 'Xanh đậm',
      isLiked: true,
      description: 'Vải jean co giãn, form ống đứng cá tính'
    },
  ]);

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleUpdateSize = (id, newSize) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, size: newSize } : item
    ));
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.id));
    }
  };

  const handleIncreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    setSelectedItems(selectedItems.filter(itemId => itemId !== id));
  };

  const handleToggleLike = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, isLiked: !item.isLiked } : item
    ));
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'sale20') {
      setPromoApplied(true);
    }
  };

  const calculateSubtotal = () => {
    return selectedItems.reduce((total, id) => {
      const item = cartItems.find(item => item.id === id);
      return total + (item.price * item.quantity);
    }, 0);
  };

  const calculateDiscount = () => {
    return promoApplied ? calculateSubtotal() * 0.2 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const filteredItems = cartItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <Header/>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Giỏ hàng của bạn</h1>
          <p className="mt-2 text-gray-500">{cartItems.length} sản phẩm</p>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedItems.length === cartItems.length}
              onChange={handleSelectAll}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">Chọn tất cả</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm trong giỏ hàng..."
              className="w-full pl-12 pr-4 py-3 rounded-full border-none bg-gray-100 focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <p className="text-gray-500">Không tìm thấy sản phẩm nào trong giỏ hàng</p>
            </div>
          ) : (
            filteredItems.map(item => (
              <div key={item.id}
                className="bg-white rounded-2xl p-6 transition-all duration-300 hover:shadow-lg border border-gray-100">
                <div className="flex gap-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="relative flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-40 h-40 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => handleToggleLike(item.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md ${item.isLiked
                          ? 'bg-red-50/80 text-red-500'
                          : 'bg-white/80 text-gray-400'
                        } transition-all duration-300 hover:scale-110`}
                    >
                      <Heart
                        className="w-4 h-4"
                        fill={item.isLiked ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                        <p className="text-gray-500 mt-1">
                          Màu: {item.color} · Size: {item.size}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">{item.description}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <select
                          value={item.size}
                          onChange={(e) => handleUpdateSize(item.id, e.target.value)}
                          className="p-2 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-blue-500"
                        >
                          {['S', 'M', 'L', 'XL'].map(size => (
                            <option key={size} value={size}>Size {size}</option>
                          ))}
                        </select>

                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => handleDecreaseQuantity(item.id)}
                            className="p-2 hover:bg-white rounded-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncreaseQuantity(item.id)}
                            className="p-2 hover:bg-white rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold text-blue-600">
                          {(item.price * item.quantity).toLocaleString()}₫
                        </p>
                        <p className="text-sm text-gray-500 line-through">
                          {(item.originalPrice * item.quantity).toLocaleString()}₫
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-6">
            <h3 className="text-lg font-semibold mb-6">Tổng đơn hàng</h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính</span>
                <span className="font-medium">{calculateSubtotal().toLocaleString()}₫</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Giảm giá</span>
                <span>-{calculateDiscount().toLocaleString()}₫</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Tổng cộng</span>
                <span>{calculateTotal().toLocaleString()}₫</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  className="flex-1 p-3 rounded-lg border-none bg-gray-100 focus:ring-2 focus:ring-blue-500"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Percent className="w-5 h-5" />
                </button>
              </div>

              {promoApplied && (
                <Alert className="bg-green-50 text-green-700 border-green-200">
                  <AlertDescription>
                    Mã giảm giá đã được áp dụng thành công!
                  </AlertDescription>
                </Alert>
              )}

              <button
                onClick={() => navigate('/payment')} // Add onClick handler
                className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={selectedItems.length === 0}
              >
                Tiến hành thanh toán
              </button>

              <p className="text-sm text-gray-500 text-center">
                Miễn phí vận chuyển cho đơn hàng trên 499.000₫
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;