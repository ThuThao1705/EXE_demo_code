import React, { useState } from 'react';
import { 
  CreditCard, 
  
  Lock,
  
  CheckCircle,
  
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep(2);
  };
  const navigate = useNavigate();
  const homepage = (itemId) => {
    navigate('/home');
  };
  const order = (itemId) => {
    navigate('/order');
  };

  const PaymentMethodCard = ({ id, icon: Icon, title, description, selected }) => (
    <div
      onClick={() => handlePaymentMethodChange(id)}
      className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
        selected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-full ${
          selected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
        }`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 ${
          selected
            ? 'border-blue-500 bg-blue-500'
            : 'border-gray-300'
        }`}>
          {selected && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step >= 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Thông tin</span>
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step >= 2 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Xác nhận</span>
            </div>
          </div>
        </div>

        {step === 1 ? (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-8 sm:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Thanh Toán</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Địa chỉ giao hàng
                    </label>
                    <input
                      type="text"
                      className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                      placeholder="Nhập địa chỉ giao hàng"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Phương thức thanh toán
                    </label>
                    <div className="space-y-3">
                      <PaymentMethodCard
                        id="credit-card"
                        icon={CreditCard}
                        title="Thẻ tín dụng"
                        description="Thanh toán an toàn với Visa, Mastercard"
                        selected={paymentMethod === 'credit-card'}
                      />
                      <PaymentMethodCard
                        id="paypal"
                        icon={CreditCard}
                        title="PayPal"
                        description="Thanh toán nhanh chóng qua PayPal"
                        selected={paymentMethod === 'paypal'}
                      />
                      <PaymentMethodCard
                        id="bank-transfer"
                        icon={CreditCard}
                        title="Chuyển khoản ngân hàng"
                        description="Chuyển khoản trực tiếp qua ngân hàng"
                        selected={paymentMethod === 'bank-transfer'}
                      />
                    </div>
                  </div>

                  {paymentMethod === 'credit-card' && (
                    <div className="mt-6 p-6 bg-gray-50 rounded-xl space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Số thẻ
                        </label>
                        <input
                          type="text"
                          className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ngày hết hạn
                          </label>
                          <input
                            type="text"
                            className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className={`w-full flex items-center justify-center px-6 py-4 rounded-xl text-white font-medium transition-all ${
                      isProcessing
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        Xác nhận thanh toán
                        <Lock className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Security Badge */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-center text-sm text-gray-500">
                <Lock className="h-4 w-4 mr-2" />
                Thanh toán được bảo mật với SSL
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h2>
            <p className="text-gray-600 mb-6">
              Cảm ơn bạn đã mua hàng. Chúng tôi sẽ gửi email xác nhận đơn hàng cho bạn.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"onClick={order}>
                Xem đơn hàng
              </button>
              <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors" onClick={homepage}>
                Tiếp tục mua sắm
              </button>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Tạm tính</span>
              <span>2,000,000₫</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Phí vận chuyển</span>
              <span>30,000₫</span>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between font-semibold text-lg">
                <span>Tổng cộng</span>
                <span className="text-blue-600">2,030,000₫</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;