import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { OrderStatus } from '../../types';
import { Filter, Check, MoreVertical } from 'lucide-react';

const Orders: React.FC = () => {
  const { orders, updateOrderStatus } = useData();
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'All'>('All');

  const filteredOrders = filterStatus === 'All' 
    ? orders 
    : orders.filter(o => o.status === filterStatus);

  const statusColors = {
    'Pending': 'bg-orange-100 text-orange-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    'Completed': 'bg-green-100 text-green-700',
    'Cancelled': 'bg-red-100 text-red-700',
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
        
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
          <Filter size={16} className="text-gray-400" />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as OrderStatus | 'All')}
            className="text-sm text-gray-700 focus:outline-none bg-transparent font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Service</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">#{order.id.slice(-6)}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{order.clientName}</td>
                  <td className="px-6 py-4 text-gray-600">{order.serviceType}</td>
                  <td className="px-6 py-4 font-mono text-gray-900 font-medium">${order.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 text-xs rounded-full font-bold uppercase tracking-wide ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="text-xs border border-gray-200 rounded p-1 text-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredOrders.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;