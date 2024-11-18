"use client";
import React, { useState } from "react";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isSentByMe: boolean;
}

const PublicChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "John",
      content: "Hey there!",
      timestamp: "10:30 AM",
      isSentByMe: false,
    },
    {
      id: 2,
      sender: "Me",
      content: "Hi! How are you?",
      timestamp: "10:31 AM",
      isSentByMe: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "Me",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isSentByMe: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-[500px] bg-gray-100">
      <div className="w-[350px] bg-white border-gray-200 flex flex-col md:block hidden">
        <div className="p-3 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full p-2 rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="flex items-center p-3 hover:bg-gray-100 cursor-pointer">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white">
              J
            </div>
            <div className="ml-3">
              <h4 className="text-gray-900 font-medium">John Doe</h4>
              <p className="text-gray-600 text-sm">Last message...</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center p-3 bg-white border-b border-gray-200">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
            J
          </div>
          <div className="ml-3">
            <h3 className="text-gray-900 font-medium">John Doe</h3>
            <p className="text-gray-600 text-sm">Online</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#efeae2] p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                message.isSentByMe ? "justify-end" : "justify-start"
              }`}>
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.isSentByMe ? "bg-[#dcf8c6]" : "bg-white"
                }`}>
                <p className="text-gray-800">{message.content}</p>
                <span className="text-xs text-gray-500 mt-1 block">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="p-3 bg-white flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:border-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default PublicChat;
