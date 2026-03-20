interface LoggedUsersProps {
  users: any[];
  onSelectUser: (id: string) => void;
  selectedUserId: string | null;
  unreadCounts: Record<string, number>;
  setUnreadCounts: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

export default function LoggedUsers({ users, onSelectUser, selectedUserId, unreadCounts, setUnreadCounts }: LoggedUsersProps) {
  return (
    <div className="overflow-y-auto flex-1 p-2 space-y-1 custom-scrollbar">
      {users.map(user => {
        const unread = unreadCounts[user.id] || 0; // This variable is not used in the current code, but kept for context if needed later.

        const isActive = user.id === selectedUserId;
        return (
          <div
            key={user.id}
            onClick={() => {
              onSelectUser(String(user.id));
              // 🔄 al abrir el chat, limpiamos contador
              setUnreadCounts((prev) => ({ ...prev, [user.id]: 0 }));
            }}
            className={`flex items-center gap-3 p-3 cursor-pointer rounded-xl transition duration-200 shadow-sm
              ${isActive
                ? 'bg-indigo-600  shadow-indigo-400/50 scale-[1.02]'
                : ' hover:bg-gray-100'
              }`}
          >
            {/* Avatar mejorado */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0
              ${isActive ? 'bg-white text-indigo-600' : 'bg-gray-200 text-gray-700'}`}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="truncate">
              {/* Nombre y Apellido */}
              <div className={`font-semibold truncate ${isActive ? 'text-white' : 'text-gray-800'}`}>
                {user.name} {user.apellidos}
              </div>
              {/* ID con estilo sutil */}
              <div className={`text-xs ${isActive ? 'text-indigo-200' : 'text-gray-500'}`}>
                ID: {user.id}
              </div>

              {unread > 0 && (
                <span className="ml-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                  {unread}
                </span>
              )}
              
            </div>
          </div>
        );
      })}
    </div>
  );
}
