import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Clock, CreditCard, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function CheckoutPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(state.user?.addresses[0]?.id || '');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:00-11:00');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 500 ? 0 : 25;
  const total = subtotal + deliveryFee;

  const timeSlots = [
    '10:00-11:00 AM',
    '11:00-12:00 PM',
    '12:00-1:00 PM',
    '2:00-3:00 PM',
    '3:00-4:00 PM',
    '4:00-5:00 PM',
    '5:00-6:00 PM'
  ];

  const handlePlaceOrder = () => {
    // In a real app, this would make an API call
    dispatch({ type: 'CLEAR_CART' });
    navigate('/orders', { state: { orderPlaced: true } });
  };

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No items in cart</h2>
          <Link to="/" className="text-green-600 hover:text-green-700">
            Go back to shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <Link to="/cart" className="text-gray-600 hover:text-gray-700 mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                <MapPin className="h-5 w-5 mr-2 text-green-600" />
                Delivery Address
              </h3>
              <div className="space-y-3">
                {state.user?.addresses.map((address) => (
                  <label
                    key={address.id}
                    className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedAddress === address.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={selectedAddress === address.id}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-start space-x-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900 capitalize">{address.type}</span>
                          {address.isDefault && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{address.address}</p>
                        {address.landmark && (
                          <p className="text-gray-500 text-sm">Near {address.landmark}</p>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Delivery Time */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                <Clock className="h-5 w-5 mr-2 text-green-600" />
                Delivery Time
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <label
                    key={slot}
                    className={`block p-3 border-2 rounded-lg cursor-pointer text-center transition-colors ${
                      selectedTimeSlot === slot
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot}
                      checked={selectedTimeSlot === slot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">{slot}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                Payment Method
              </h3>
              <div className="space-y-3">
                <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  paymentMethod === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className="font-medium text-gray-900">Cash on Delivery</div>
                  <div className="text-sm text-gray-600">Pay when your order arrives</div>
                </label>
                <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  paymentMethod === 'online' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className="font-medium text-gray-900">Online Payment</div>
                  <div className="text-sm text-gray-600">UPI, Cards, Net Banking</div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-2 mb-4">
                {state.cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name} x {item.quantity}</span>
                    <span className="text-gray-900">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <hr className="mb-4" />
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery fee</span>
                  <span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}