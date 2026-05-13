'use client';

import React, { useState } from 'react';
import { 
  Search, Send, Paperclip, MoreVertical, 
  Phone, Video, Globe, CheckCheck, 
  Image as ImageIcon, File, Smile, Plus
} from 'lucide-react';

const CHATS = [
  { id: 1, name: 'سفيان - نسيج تلمسان', lastMsg: 'نعم، يمكننا توفير الكتان باللون المطلوب.', time: '10:45 AM', unread: 2, online: true },
  { id: 2, name: 'ليلى - كشمير بريميوم', lastMsg: 'تم إرسال العينات اليوم عبر البريد السريع.', time: 'Hier', unread: 0, online: false },
  { id: 3, name: 'مصنع خيوط الشرق', lastMsg: 'هل لديكم مواصفات فنية للطلب الجديد؟', time: 'Mardi', unread: 0, online: true },
];

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(CHATS[0]);
  const [message, setMessage] = useState('');

  return (
    <div className="h-[calc(100vh-12rem)] flex bg-white rounded-[40px] border border-border shadow-xl overflow-hidden">
      
      {/* Sidebar - Contacts */}
      <div className="w-80 border-l border-border flex flex-col">
         <div className="p-6 border-b border-border space-y-4">
            <h3 className="text-xl font-black text-charcoal">الرسائل</h3>
            <div className="relative">
               <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
               <input 
                 type="text" 
                 placeholder="بحث في المحادثات..."
                 className="w-full pr-10 pl-4 py-2 bg-gray-50 border border-border rounded-xl outline-none focus:border-accent text-xs"
               />
            </div>
         </div>
         <div className="flex-1 overflow-y-auto">
            {CHATS.map((chat) => (
              <div 
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={`p-4 flex gap-4 cursor-pointer transition-all hover:bg-gray-50 border-b border-gray-50 ${activeChat.id === chat.id ? 'bg-gold/5 border-r-4 border-r-gold' : ''}`}
              >
                 <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full bg-ecru overflow-hidden border-2 border-white shadow-sm">
                       <img src={`https://ui-avatars.com/api/?name=${chat.name}&background=E5E1DA&color=1A1A1A`} alt={chat.name} />
                    </div>
                    {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                       <h4 className="font-bold text-sm text-charcoal truncate">{chat.name}</h4>
                       <span className="text-[9px] text-muted">{chat.time}</span>
                    </div>
                    <p className="text-xs text-muted truncate mt-1">{chat.lastMsg}</p>
                 </div>
                 {chat.unread > 0 && (
                   <div className="w-5 h-5 bg-gold rounded-full flex items-center justify-center text-[10px] font-bold text-charcoal">
                      {chat.unread}
                   </div>
                 )}
              </div>
            ))}
         </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50/30">
         
         {/* Chat Header */}
         <div className="h-20 bg-white border-b border-border flex items-center justify-between px-8">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-ecru overflow-hidden">
                  <img src={`https://ui-avatars.com/api/?name=${activeChat.name}&background=E5E1DA&color=1A1A1A`} alt={activeChat.name} />
               </div>
               <div>
                  <h4 className="font-bold text-sm text-charcoal">{activeChat.name}</h4>
                  <p className="text-[10px] text-green-500 font-bold">{activeChat.online ? 'متصل الآن' : 'غير متصل'}</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold border border-blue-100">
                  <Globe className="w-3 h-3" /> ترجمة فورية نشطة
               </div>
               <button className="p-2 text-muted hover:text-accent"><Phone className="w-5 h-5" /></button>
               <button className="p-2 text-muted hover:text-accent"><Video className="w-5 h-5" /></button>
               <button className="p-2 text-muted hover:text-accent"><MoreVertical className="w-5 h-5" /></button>
            </div>
         </div>

         {/* Messages Section */}
         <div className="flex-1 overflow-y-auto p-8 space-y-6">
            
            {/* Outgoing Message */}
            <div className="flex flex-row-reverse gap-4">
               <div className="max-w-[70%] space-y-1">
                  <div className="bg-charcoal text-white p-4 rounded-2xl rounded-tr-none shadow-sm text-sm leading-relaxed">
                     مرحباً سفيان، هل يمكنك إرسال المواصفات الفنية لنسيج الكتان العضوي 180 GSM؟
                  </div>
                  <div className="flex justify-end items-center gap-1 text-[9px] text-muted">
                     <span>10:30 AM</span>
                     <CheckCheck className="w-3 h-3 text-blue-500" />
                  </div>
               </div>
            </div>

            {/* Incoming Message */}
            <div className="flex gap-4">
               <div className="max-w-[70%] space-y-1">
                  <div className="bg-white text-charcoal p-4 rounded-2xl rounded-tl-none border border-border shadow-sm text-sm leading-relaxed">
                     أهلاً أحمد، بالطبع. سأقوم بإرفاق الملف التقني الآن. نعم، يمكننا توفير الكتان باللون المطلوب (الأبيض الثلجي) والكمية متوفرة في المخزن.
                  </div>
                  <div className="text-[9px] text-muted">10:45 AM</div>
               </div>
            </div>

            {/* File Attachment */}
            <div className="flex gap-4">
               <div className="max-w-[70%] bg-white p-3 rounded-2xl border border-border shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
                     <File className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                     <p className="text-xs font-bold text-charcoal truncate">Fiche_Technique_Lin.pdf</p>
                     <p className="text-[9px] text-muted">1.2 MB</p>
                  </div>
                  <button className="text-accent text-[10px] font-bold hover:underline">تحميل</button>
            </div>
            </div>
         </div>

         {/* Input Area */}
         <div className="p-6 bg-white border-t border-border">
            <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-border">
               <button className="p-2 text-muted hover:text-accent"><Plus className="w-6 h-6" /></button>
               <input 
                 type="text" 
                 placeholder="اكتب رسالتك هنا..."
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                 className="flex-1 bg-transparent outline-none text-sm p-2"
               />
               <div className="flex items-center gap-2 px-2 border-r border-border">
                  <button className="p-2 text-muted hover:text-accent"><ImageIcon className="w-5 h-5" /></button>
                  <button className="p-2 text-muted hover:text-accent"><Smile className="w-5 h-5" /></button>
               </div>
               <button className="p-3 bg-accent text-white rounded-xl shadow-lg shadow-accent/20 hover:scale-105 transition-all">
                  <Send className="w-5 h-5" />
               </button>
            </div>
         </div>

      </div>

    </div>
  );
}
