"use client";
import { usersInfo } from "@/components/dashboard/constant";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import animal from "../../../assets/animal.jpg";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const page = () => {
  const [showMembers, setShowMembers] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: usersInfo[0].name,
      content: "Message content goes here",
      image: animal
    },
    {
      id: 2,
      sender: "John Doe",
      content: "This is a received message",
      image: animal
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const isCurrentUser = (sender: string) => {
    return sender === usersInfo[0].name; 
  };

  const handleShowMembers = () => {
    setShowMembers(!showMembers);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: usersInfo[0].name,
          content: newMessage,
          image: animal
        }
      ]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="md:p-20 md:max-w-[90vw] h-screen w-full mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-semibold py-3">Project Details</h1>
      <div className="flex lg:flex-row flex-col gap-4">
        <div className="flex-1  p-2 bg-gray-00">
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium bg-gray-200 p-2 rounded-t-lg text-blue-800">
                Project Details
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3 bg-gray-100 p-3 rounded-b-lg">
                <p className="text-sm text-gray-900">
                  Name: <span className="font-medium">Managing Animal</span>
                </p>
                <p className="text-sm text-gray-900">
                  Location: <span className="font-medium">Kigali, Rwanda</span>
                </p>
                <p className="text-sm text-gray-900">
                  Description:{" "}
                  <span className="font-medium">
                    This is a project that manages animals
                  </span>
                </p>
                <p className="text-sm text-gray-900">
                  Date: <span className="font-medium">12/12/2024</span>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="md:w-96 p-2 ">
          <div className="w-full md:max-w-[90vw] mx-auto flex flex-col gap-4">
            <button onClick={handleShowMembers} className="flex items-center justify-between bg-gray-200 p-2 rounded-t-lg text-blue-800">
              <span className="text-lg font-medium">Public Chat
                {/* <span className="text-sm text-gray-500"> </span> */}
              </span>
            </button>
            {/* <div className="w-full flex flex-col lg:flex-row gap-4 bg-gray-100 rounded-lg shadow">
              {showMembers && (
                <div className="w-full flex md:w-96 flex-col gap-4 flex-initial p-4 bg-gray-100 rounded-lg overflow-y-scroll h-[600px]">
                  <div className="flex flex-col gap-2 py-2">
                    <input
                      type="text"
                      placeholder="Search Members"
                      className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {usersInfo.map((item, index) => (
                    <div
                      key={index}
                      className="space-y-2 border-b border-gray-300 cursor-pointer">
                      <div className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-t-lg">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div className="w-full flex items-center justify-between ">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">
                              Hey how are you?
                            </p>
                          </div>
                          <p
                            className={`text-sm ${
                              item.status === "Online"
                                ? "text-green-700"
                                : "text-red-700"
                            }`}>
                            {item.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div> */}
              {/* )} */}
              <div className="flex-1 p-4 bg-gray-100 rounded-lg shadow">
                <h2 className="text-lg font-medium mb-4">Messages</h2>
                <div className="flex flex-col h-[400px]">
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex gap-2 ${isCurrentUser(message.sender) ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        <div className="w-6 h-6 rounded-full bgs-blue-500 flex-shrink-0">
                          <Image
                            src={message.image}
                            alt={message.sender}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div className={`${
                          isCurrentUser(message.sender)
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-black'
                        } p-3 rounded-lg shadow-sm max-w-[70%]`}>
                          <p className="font-medium text-sm">{message.sender}</p>
                          <p className="text-xs">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default page;