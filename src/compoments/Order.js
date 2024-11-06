import React from 'react';
import { CreditCard, MapPin, Truck, Package, ArrowLeft, ShoppingBag } from 'lucide-react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {
  const navigate = useNavigate();
 
  const handlePlaceOrder = () => {
    navigate('/payment'); // Điều hướng đến trang thanh toán
  };
 
  const orderItems = [
    {
      id: 1,
      name: "Summer Floral Dress",
      price: 89.99,
      quantity: 1,
      size: "M",
      image: "/api/placeholder/150/150",
    },
    {
      id: 2,
      name: "Classic Denim Jacket",
      price: 129.99,
      quantity: 1,
      size: "L",
      image: "/api/placeholder/150/150",
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar - Reused from HomePage */}
      <div className="bg-gray-900 text-white px-4 py-2 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p>Free shipping on orders over $100</p>
          <div className="flex gap-4">
            <button className="hover:text-gray-300">Track Order</button>
            <button className="hover:text-gray-300">Help</button>
          </div>
        </div>
      </div>

      <Header />

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <button className="flex items-center text-gray-600 mb-6 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shopping
          </button>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Order Details */}
            <div className="lg:w-2/3 space-y-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    Shipping Address
                  </h2>
                  <button className="text-blue-600 hover:text-blue-700">Change</button>
                </div>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <p className="font-medium">John Doe</p>
                  <p className="text-gray-600">123 Fashion Street</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold flex items-center mb-4">
                  <Truck className="h-5 w-5 mr-2 text-blue-600" />
                  Delivery Method
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 bg-gray-50 cursor-pointer hover:border-blue-600">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Standard Delivery</p>
                        <p className="text-gray-600 text-sm">2-4 Business Days</p>
                      </div>
                      <p className="font-medium">Free</p>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 cursor-pointer hover:border-blue-600">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Express Delivery</p>
                        <p className="text-gray-600 text-sm">1-2 Business Days</p>
                      </div>
                      <p className="font-medium">$14.99</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold flex items-center mb-4">
                  <Package className="h-5 w-5 mr-2 text-blue-600" />
                  Order Items
                </h2>
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center border-b pb-4 last:border-0 last:pb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="font-medium">${item.price}</p>
                        </div>
                        <p className="text-gray-600">Size: {item.size}</p>
                        <div className="flex items-center mt-2">
                          <select className="border rounded-lg px-2 py-1 text-sm">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                          <button className="ml-4 text-red-600 text-sm hover:text-red-700">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Payment Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-6">
                <h2 className="text-xl font-bold flex items-center mb-6">
                  <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                  Payment Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-medium">$219.98</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Shipping</p>
                    <p className="font-medium">Free</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Tax</p>
                    <p className="font-medium">$21.99</p>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-4">
                      <p className="font-bold">Total</p>
                      <p className="font-bold text-xl">$241.97</p>
                    </div>
                    <button
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center"
                      onClick={handlePlaceOrder} // Gọi hàm khi nút được nhấn
                    >
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Place Order
                    </button>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mt-6">
                  <p className="font-medium mb-2">Promo Code</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 border rounded-lg px-3 py-2"
                    />
                    <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Reused from HomePage */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-gray-400">Your trusted fashion destination for unique and stylish clothing.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Contact Us</li>
              <li>Shipping Policy</li>
              <li>Returns & Exchanges</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>New Arrivals</li>
              <li>Best Sellers</li>
              <li>Sale</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to get special offers and updates.</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-white mb-2"
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-8 mt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Fashion Shop. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default OrderPage;