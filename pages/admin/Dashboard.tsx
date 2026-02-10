import React from 'react';
import { useData } from '../../context/DataContext';
import { FolderOpen, ShoppingCart, MessageSquare, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { projects, orders, messages } = useData();

  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const unreadMessages = messages.filter(m => !m.read).length;
  const totalRevenue = orders
    .filter(o => o.status === 'Completed')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const stats = [
    { title: 'Total Projects', value: projects.length, icon: FolderOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: ShoppingCart, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Pending Orders', value: pendingOrders, icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Unread Messages', value: unreadMessages, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <Icon className={stat.color} size={20} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Orders</h2>
          {orders.length === 0 ? (
             <p className="text-gray-500 text-sm">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">Client</th>
                    <th className="px-4 py-3 font-medium">Service</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.slice(0, 5).map(order => (
                    <tr key={order.id}>
                      <td className="px-4 py-3 text-gray-900 font-medium">{order.clientName}</td>
                      <td className="px-4 py-3 text-gray-500">{order.serviceType}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full font-medium
                          ${order.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 
                            order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-blue-100 text-blue-700'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Messages */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Inquiries</h2>
          {messages.length === 0 ? (
            <p className="text-gray-500 text-sm">No messages yet.</p>
          ) : (
            <div className="space-y-4">
              {messages.slice(0, 4).map(msg => (
                <div key={msg.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${msg.read ? 'bg-gray-300' : 'bg-blue-500'}`} />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{msg.name}</h4>
                    <p className="text-xs text-gray-500 mb-1">{msg.date}</p>
                    <p className="text-sm text-gray-600 line-clamp-1">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;