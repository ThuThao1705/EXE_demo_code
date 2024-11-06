import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Heart, } from 'lucide-react';
import products from '../data/products'; // Import your products data
import Header from './Header'; // Assuming you have a Header component
import { useNavigate } from "react-router-dom";



  

  
const ProductDetail = () => {

  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Red');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const handleAddToCart = () => {
    // Bạn có thể thêm logic xử lý giỏ hàng ở đây
    navigate("/cart"); // Chuyển đến trang giỏ hàng
  };
  useEffect(() => {
    const productData = products.find((prod) => prod.id === parseInt(productId));
    setProduct(productData);
  }, [productId]);

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white min-h-screen">
      <Header />

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <span>Home</span>
        <span>/</span>
        <span>Clothing</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Image Section */}
        <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
            <Heart className="h-5 w-5" />
          </button>
        </div>

        {/* Right: Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                {/* Add your Share Icon here */}
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} filled={i < Math.floor(product.rating)} />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
            <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-medium rounded">
              Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${selectedColor === color ? 'border-blue-500' : 'border-transparent'}`}
                  style={{ backgroundColor: color.toLowerCase(), color: color.toLowerCase() === 'white' ? 'black' : 'white' }}
                >
                  {selectedColor === color && '✓'}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 border rounded-lg text-sm font-medium ${selectedSize === size ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-900 hover:bg-gray-50'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
            <div className="flex items-center space-x-3">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">-</button>
              <span className="w-12 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">+</button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center space-x-2" onClick={handleAddToCart}>
              {/* Add Cart Icon here */}
              <span>Add to Cart</span>
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50">Buy Now</button>
          </div>
        </div>
      </div>

      {/* Custom Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            {['description', 'features', 'shipping'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-medium border-b-2 hover:text-gray-700 hover:border-gray-300 transition-colors ${activeTab === tab ? 'text-blue-600 border-blue-500' : 'text-gray-500 border-transparent'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          {activeTab === 'description' && <p className="text-gray-600 leading-relaxed">{product.description}</p>}
          {activeTab === 'features' && (
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
          {activeTab === 'shipping' && (
            <p className="text-gray-600 leading-relaxed">
              We offer free standard shipping on all orders over $50. Delivery typically takes 3-5 business days. Express shipping options are available at checkout.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
