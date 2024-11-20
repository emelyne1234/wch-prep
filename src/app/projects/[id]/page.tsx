"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGetMessages, useSendMessage } from "@/hooks/useMessage";
import {
  useGetProjectById,
  useAddProjectGoal,
  useAddProjectNeed,
} from "@/hooks/useProject";
import { ne } from "drizzle-orm";
import { ChevronDown, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ProjectDetails = () => {
  const { id } = useParams();
  const { data: projectDetails, refetch } = useGetProjectById(id as string);
  const { mutate: addProjectNeed } = useAddProjectNeed();
  const { mutate: addProjectGoal } = useAddProjectGoal();
  const { data: messages, refetch: refetchMessages } = useGetMessages(
    id as string
  );
  const { mutate: sendMessage } = useSendMessage();
  const [showMembers, setShowMembers] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [newNeed, setNewNeed] = useState({ need: "", roleType: "" });
  const [newGoal, setNewGoal] = useState({ goal: "", isAchieved: false });
  const { data: session } = useSession();

  const { project, members, goals, needs } = projectDetails?.data || {
    project: null,
    members: [],
    goals: [],
    needs: [],
  };

  const handleShowMembers = () => {
    setShowMembers(!showMembers);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(
        { projectId: id as string, messageText: newMessage },
        {
          onSuccess: () => {
            toast.success("Message sent successfully");
            refetchMessages();
          },
          onError: () => {
            toast.error("Failed to send message");
          },
        }
      );
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleAddNeed = () => {
    console.log("newNeed", newNeed);
    addProjectNeed(
      {
        need: newNeed.need,
        roleType: newNeed.roleType,
        projectId: id as string,
      },
      {
        onSuccess: () => {
          toast.success("Need added successfully");
          refetch();
        },
        onError: () => {
          toast.error("Failed to add need");
        },
      }
    );

    setNewNeed({ need: "", roleType: "" });
  };

  const handleAddGoal = () => {
    console.log("newGoal", newGoal);
    addProjectGoal(
      { goal: newGoal.goal, projectId: id as string },
      {
        onSuccess: () => {
          toast.success("Goal added successfully");
          refetch();
        },
        onError: () => {
          toast.error("Failed to add goal");
        },
      }
    );
    setNewGoal({ goal: "", isAchieved: false });
  };

  return (
    <div className="md:p-8 md:max-w-[90vw] min-h-screen w-full mx-auto flex flex-col gap-8 bg-gray-50 mt-20">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{project?.title}</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            {project?.image && (
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={300}
                className="rounded-lg object-cover w-full h-64"
              />
            )}
          </div>
          <div className="md:w-2/3">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-semibold bg-blue-50 p-3 rounded-t-lg text-blue-800">
                  Project Details
                </AccordionTrigger>
                <AccordionContent className="bg-white p-4 rounded-b-lg shadow-inner">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="text-sm">
                      <span className="font-semibold">Location:</span>{" "}
                      {project?.location}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Status:</span>{" "}
                      {project?.status}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Start Date:</span>{" "}
                      {project?.startDate
                        ? new Date(project.startDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">End Date:</span>{" "}
                      {project?.endDate
                        ? new Date(project.endDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Funding Status:</span>{" "}
                      {project?.fundingStatus}
                    </p>
                  </div>
                  <p className="text-sm mt-4">
                    <span className="font-semibold">Description:</span>{" "}
                    {project?.description}
                  </p>
                  <p className="text-sm mt-4">
                    <span className="font-semibold">Evaluation:</span>{" "}
                    {project?.evaluation}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Project Needs</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Need</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="need" className="text-right">
                        Need
                      </Label>
                      <Input
                        id="need"
                        value={newNeed.need}
                        onChange={(e) =>
                          setNewNeed({ ...newNeed, need: e.target.value })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="roleType" className="text-right">
                        Role Type
                      </Label>
                      <Input
                        id="roleType"
                        value={newNeed.roleType}
                        onChange={(e) =>
                          setNewNeed({ ...newNeed, roleType: e.target.value })
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddNeed}>Add Need</Button>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-2">
              {needs.map((need) => (
                <div
                  key={need.id}
                  className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                  <Checkbox id={`need-${need.id}`} />
                  <label
                    htmlFor={`need-${need.id}`}
                    className="text-sm font-medium">
                    {need.need} -{" "}
                    <span className="text-gray-600">{need.roleType}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Project Goals</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Goal</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="goal" className="text-right">
                        Goal
                      </Label>
                      <Textarea
                        id="goal"
                        value={newGoal.goal}
                        onChange={(e) =>
                          setNewGoal({ ...newGoal, goal: e.target.value })
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddGoal}>Add Goal</Button>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-2">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                  <Checkbox id={`goal-${goal.id}`} checked={goal.isAchieved} />
                  <label
                    htmlFor={`goal-${goal.id}`}
                    className="text-sm font-medium">
                    {goal.goal}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Project Members</h2>
          <Button variant="outline" onClick={handleShowMembers}>
            {showMembers ? "Hide Members" : "Show Members"}
            <ChevronDown
              className={`ml-2 h-4 w-4 transition-transform ${
                showMembers ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>
        {showMembers && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member) => (
              <div
                key={member.memberId}
                className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex-shrink-0">
                  <Image
                    src={member.userImage}
                    alt={member.userName}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="font-semibold">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.userName || "No name found"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Project Chat</h2>
        <div className="h-80 overflow-y-auto mb-4 bg-gray-50 p-4 rounded-lg">
          {messages &&
            messages
              .sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              )
              .map((message) => {
                const isCurrentUser = message.senderId === session?.user?.id;
                const messageDate = new Date(
                  message.createdAt
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 mb-3 ${
                      isCurrentUser ? "flex-row-reverse" : ""
                    }`}>
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0">
                      <Image
                        src={message.image}
                        alt={message.senderName}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                    <div
                      className={`p-3 pb-6 rounded-lg shadow-sm max-w-[70%] relative ${
                        isCurrentUser
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-900"
                      }`}>
                      <p
                        className={`font-semibold text-sm ${
                          isCurrentUser ? "text-gray-100" : ""
                        }`}>
                        {message.senderName}
                      </p>
                      <p className="text-sm mb-4">{message.messageText}</p>
                      <span
                        className={`text-xs absolute bottom-1.5 px-2 py-0.5 rounded-full border ${
                          isCurrentUser
                            ? "right-2 text-gray-100"
                            : "left-2 text-gray-500"
                        }`}>
                        {messageDate}
                      </span>
                    </div>
                  </div>
                );
              })}
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
