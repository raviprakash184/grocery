import React from 'react';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { mockOrders } from '../data/mockData';

export function OrdersPage() {
  const location = useLocation();
  const orderPlaced = location.state?.orderPlaced;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'confirmed':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'confirmed':
        return 'text-blue-600 bg-blue-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {orderPlaced && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-green-800 font-medium">Order placed successfully!</span>
            </div>
            <p className="text-green-700 text-sm mt-1">
              Your order will be delivered within 10-15 minutes.
            </p>
          </div>
        )}

        <div className="space-y-6">
          {mockOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Order #{order.id}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(order.orderDate).toLocaleDateString()} at {order.deliveryTime}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-900">₹{order.total}</div>
                  <div className="text-sm text-gray-600">{order.items.length} items</div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">Items</h4>
                    <div className="space-y-2">
                      {order.items.slice(0, 2).map((item) => (
                        <div key={item.id} className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-600">{item.unit}</div>
                          </div>
                          <div className="text-sm text-gray-900">₹{item.price}</div>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="text-sm text-gray-600">
                          +{order.items.length - 2} more items
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
                    <p className="text-sm text-gray-600 max-w-xs">
                      {order.deliveryAddress.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between">
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    View Details
                  </button>
                  {order.status === 'delivered' && (
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {mockOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
          </div>
        )}
      </div>
    </div>
  );
}