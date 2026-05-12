'use client';
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { Send, Image as ImageIcon, Paperclip } from 'lucide-react';

export default function ChatWindow({ conversationId, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    // الاتصال بالـ Socket
    socketRef.current = io('http://localhost:3005');

    // الانضمام للمحادثة
    socketRef.current.emit('join_conversation', conversationId);

    // استقبال الرسائل الجديدة
    socketRef.current.on('new_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // جلب الرسائل القديمة
    fetch(`http://localhost:3005/api/v1/chat/conversations/${conversationId}/messages`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(data => setMessages(data));

    return () => socketRef.current.disconnect();
  }, [conversationId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      conversationId,
      senderId: currentUser.id,
      text: newMessage,
    };

    socketRef.current.emit('send_message', messageData);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy font-bold">
               ج
            </div>
            <p className="font-bold text-gray-800">محادثة مباشرة</p>
         </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] p-4 rounded-2xl text-sm shadow-sm
                ${msg.senderId === currentUser.id 
                  ? 'bg-burgundy text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border rounded-bl-none'}`}
            >
              <p>{msg.text}</p>
              <span className={`text-[10px] mt-1 block opacity-50`}>
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex items-center gap-2">
        <button type="button" className="p-2 text-gray-400 hover:text-gold transition-colors">
          <ImageIcon className="w-6 h-6" />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="اكتب رسالتك هنا..."
          className="flex-1 p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-gold/20"
        />
        <button
          type="submit"
          className="p-3 bg-gold text-white rounded-xl shadow-lg hover:bg-gold-dark transition-all transform active:scale-90"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
