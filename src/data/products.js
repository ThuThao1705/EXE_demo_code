const products = [
  {
      id: 1,
      name: "Áo yếm nhỏ mùa hè dành cho nữ có đệm ngực Áo khoác ngoài không tay Áo ngắn",
      description: "A stylish t-shirt made from high-quality materials, perfect for any occasion.",
      price: 25.99,
      originalPrice: 35.99,
      sold: 150,
      rating: 4.8,
      reviews: 124,
      imageUrl: require('../image/mau15.jpg'), // Đường dẫn đến ảnh sản phẩm
      colors: ["Red", "Blue", "Green"],
      sizes: ["S", "M", "L", "XL"],
      brand: "FashionBrand",
      features: [
          "100% Premium Cotton",
          "Breathable fabric",
          "Machine washable",
          "Comfortable fit"
      ]
  },
  {
      id: 2,
      name: 'Áo thun cổ tròn cotton',
      description: 'High-quality cotton t-shirt for everyday wear',
      price: 29.99,
      originalPrice: 39.99,
      sold: 50,
      rating: 4.8,
      reviews: 98,
      imageUrl: require('../image/mau16.jpg'),
      colors: ["Black", "White", "Gray"],
      sizes: ["S", "M", "L", "XL"],
      brand: "CottonCo",
      features: [
          "Soft and comfortable",
          "Durable stitching",
          "Lightweight",
          "Perfect for layering"
      ]
  },
  {
      id: 3,
      name: 'Quần jean thời trang',
      description: 'Classic denim jeans with a modern fit',
      price: 49.99,
      originalPrice: 59.99,
      sold: 30,
      rating: 4.2,
      reviews: 45,
      imageUrl: require('../image/mau10.jpg'),
      colors: ["Blue", "Dark Blue", "Black"],
      sizes: ["28", "30", "32", "34"],
      brand: "DenimBrand",
      features: [
          "Comfort stretch denim",
          "Classic 5-pocket styling",
          "Machine washable",
          "Timeless design"
      ]
  },
  // Add more products as needed
];

export default products;
