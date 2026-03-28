"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import LoggedUsers from "./UserProfiles";

export default function ChatPage() {
  const { users, messages, sendMessage, user } = useChat();

  const [text, setText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

  console.log("👤 user:", user);
  console.log("👥 users:", users);

  // 🔽 scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔔 reset contador
  useEffect(() => {
    if (!selectedUserId) return;

    setUnreadCounts((prev) => ({
      ...prev,
      [selectedUserId]: 0,
    }));
  }, [selectedUserId]);

  // 👇 mensajes activos
  const activeMessages =
    selectedUserId && user
      ? messages.filter(
          (m: any) =>
            (m.sender_id == user.id && m.receiver_id == selectedUserId) ||
            (m.sender_id == selectedUserId && m.receiver_id == user.id)
        )
      : [];

  const selectedUser = users.find(
    (u: any) => String(u.id) === selectedUserId
  );

  const send = async () => {
    if (!text.trim() || !selectedUserId) return;

    await sendMessage(Number(selectedUserId), text);
    setText("");
  };

  return (
    <div className="flex h-screen p-6">
      <div className="flex w-full h-full rounded-3xl shadow-2xl overflow-hidden">

        {/* SIDEBAR */}
        <div className="w-80 border-r p-4 flex flex-col">
          <h2 className="font-bold text-xl mb-4">Chats</h2>

          <LoggedUsers
            users={users}
            onSelectUser={setSelectedUserId}
            selectedUserId={selectedUserId}
            unreadCounts={unreadCounts}
            setUnreadCounts={setUnreadCounts}
          />
        </div>

        {/* CHAT */}
        <div className="flex flex-col flex-1 p-4">

          {/* HEADER */}
          <div className="border-b pb-3 mb-3 font-semibold">
            {selectedUser
              ? `${selectedUser.name}`
              : "Selecciona un usuario"}
          </div>

          {/* MENSAJES */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {activeMessages.map((m: any, i: number) => {
              const isOwn = String(m.sender_id) === String(user?.id);

              return (
                <div
                  key={i}
                  className={`flex ${
                    isOwn ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl max-w-xs ${
                      isOwn
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="flex mt-3 gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              className="flex-1 border rounded-full px-4 py-2"
              placeholder="Escribe un mensaje..."
              disabled={!selectedUserId}
            />
            <button
              onClick={send}
              className="bg-indigo-600 text-white px-4 rounded-full"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}