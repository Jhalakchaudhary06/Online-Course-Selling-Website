import { X, CreditCard, Calendar, Lock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export function PaymentGateway({ items, onClose, onPaymentSuccess }) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price, 0);
  const originalTotal = items.reduce((sum, item) => sum + (item.originalPrice || item.price), 0);
  const savings = originalTotal - total;

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ').substr(0, 19);
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substr(0, 2) + '/' + cleaned.substr(2, 2);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substr(0, 4);
    setCvv(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // Close after showing success message
      setTimeout(() => {
        onPaymentSuccess();
        onClose();
      }, 2000);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="text-green-600" size={48} />
            </div>
          </div>
          <h2 className="mb-2">Payment Successful!</h2>
          <p className="text-gray-600">
            Your payment of ${total.toFixed(2)} has been processed successfully.
            You now have access to your courses!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg w-full max-w-2xl my-8">
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <div>
            <h2 className="mb-1">Payment Gateway</h2>
            <p className="text-sm text-gray-600">Complete your purchase securely</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Payment Form */}
            <div>
              <h3 className="mb-4 flex items-center gap-2">
                <CreditCard size={20} />
                Card Details
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Expiry Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">CVV</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        value={cvv}
                        onChange={handleCvvChange}
                        placeholder="123"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 flex items-start gap-2 text-sm">
                  <Lock className="text-cyan-600 flex-shrink-0 mt-0.5" size={16} />
                  <p className="text-cyan-800">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-3 rounded-lg transition ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-teal-600 hover:opacity-90'
                  } text-white`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    `Pay $${total.toFixed(2)}`
                  )}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="mb-4">Order Summary</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-60 overflow-y-auto">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1 pr-2">
                        <p className="line-clamp-2">{item.title}</p>
                        <p className="text-xs text-gray-600">{item.instructor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-cyan-600">${item.price}</p>
                        {item.originalPrice && (
                          <p className="text-xs text-gray-400 line-through">
                            ${item.originalPrice}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${originalTotal.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between text-lg">
                  <span>Total:</span>
                  <span className="text-cyan-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-lg border border-cyan-200">
                <p className="text-sm">
                  <span className="font-semibold text-cyan-600">
                    {items.length} {items.length === 1 ? 'Course' : 'Courses'}
                  </span>
                  <br />
                  Get lifetime access to all course materials
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
