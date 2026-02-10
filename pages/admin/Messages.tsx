import React from 'react';
import { useData } from '../../context/DataContext';
import { Mail, CheckCircle, Clock } from 'lucide-react';

const Messages: React.FC = () => {
  const { messages, markMessageRead } = useData();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Client Inquiries</h1>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Mail className="mx-auto mb-4 text-gray-300" size={48} />
            <p>No messages received yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-medium w-32">Status</th>
                  <th className="px-6 py-4 font-medium w-48">Client</th>
                  <th className="px-6 py-4 font-medium">Message Details</th>
                  <th className="px-6 py-4 font-medium w-32 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {messages.map(msg => (
                  <tr key={msg.id} className={`hover:bg-gray-50/50 transition-colors ${!msg.read ? 'bg-blue-50/30' : ''}`}>
                    <td className="px-6 py-4 align-top">
                      {msg.read ? (
                        <span className="text-gray-400 flex items-center gap-1"><CheckCircle size={14} /> Read</span>
                      ) : (
                        <span className="text-blue-600 flex items-center gap-1 font-medium"><Clock size={14} /> New</span>
                      )}
                      <div className="mt-2 text-xs text-gray-400">{formatDate(msg.date)}</div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="font-bold text-gray-900 mb-1">{msg.name}</div>
                      <div className="text-gray-500 text-xs break-all">{msg.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      {/* Use whitespace-pre-wrap to preserve the formatting from the modal */}
                      <div className="text-gray-700 font-mono text-xs bg-gray-50 p-4 rounded border border-gray-200 whitespace-pre-wrap leading-relaxed">
                        {msg.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right align-top">
                      {!msg.read && (
                        <button
                          onClick={() => markMessageRead(msg.id)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-xs uppercase tracking-wide bg-white border border-blue-200 px-3 py-1 rounded hover:bg-blue-50"
                        >
                          Mark Read
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;