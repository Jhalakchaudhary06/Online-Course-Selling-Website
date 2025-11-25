import { X, Trash2, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Cart({ items, onClose, onRemove, onCheckout }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const originalTotal = items.reduce((sum, item) => sum + (item.originalPrice || item.price), 0);
  const savings = originalTotal - total;

  const handleCheckout = () => {
    onCheckout();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end">
      <div 
        className="absolute inset-0"
        onClick={onClose}
      />
      
      <div className="relative bg-white h-full w-full max-w-md shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="flex items-center gap-2">
            <ShoppingBag size={24} />
            Shopping Cart ({items.length})
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingBag size={64} className="mb-4" />
              <p>Your cart is empty</p>
              <p className="text-sm">Add courses to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 pb-4 border-b">
                  <div className="w-24 h-16 rounded overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm mb-1 line-clamp-2">{item.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{item.instructor}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-600">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-2 h-fit hover:bg-red-50 rounded-lg transition text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${originalTotal.toFixed(2)}</span>
              </div>
              {savings > 0 && (
                <div className="flex items-center justify-between text-green-600">
                  <span>Savings:</span>
                  <span>-${savings.toFixed(2)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-xl border-t pt-2">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-600 text-white rounded-lg hover:opacity-90 transition"
            >
              Proceed to Checkout
            </button>
            
            <button 
              onClick={onClose}
              className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
