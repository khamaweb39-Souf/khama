'use client';
import { useState, useEffect } from 'react';
import ChatWindow from '../../components/chat/ChatWindow';

export default function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // محاكاة مستخدم مسجل حالياً (في الحقيقة سنستخدم Auth Context)
    setCurrentUser({ id: 'user_123', fullName: 'أحمد علي' });

    const token = localStorage.getItem('token');
    fetch('http://localhost:3005/api/v1/chat/conversations', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      setConversations(data);
      if (data.length > 0) setActiveId(data[0].id);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto h-[85vh] p-4 flex gap-4">
      {/* Sidebar - Conversations List */}
      <aside className="w-full md:w-80 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-black text-gray-900">المحادثات</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => setActiveId(conv.id)}
              className={`w-full p-4 flex items-center gap-3 transition-all hover:bg-gray-50 border-r-4
                ${activeId === conv.id ? 'border-burgundy bg-burgundy/5' : 'border-transparent'}`}
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
              <div className="text-right overflow-hidden">
                <p className="font-bold text-gray-800 truncate">
                  {conv.participants[0]?.fullName || 'مستخدم خامة'}
                </p>
                <p className="text-xs text-gray-400 truncate">{conv.lastMessage || 'ابدأ المحادثة الآن'}</p>
              </div>
            </button>
          ))}
          {conversations.length === 0 && (
            <p className="text-center text-gray-400 mt-20 text-sm">لا توجد محادثات نشطة</p>
          )}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="hidden md:flex flex-1 h-full">
        {activeId && currentUser ? (
          <ChatWindow conversationId={activeId} currentUser={currentUser} />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
            <p className="text-gray-400">اختر محادثة للبدء</p>
          </div>
        )}
      </main>
    </div>
  );
}
