import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 scale-110 rounded-full relative">
              <img src={selectedUser.profilePic || "https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonscout.com%2Ficons%2Favatar&psig=AOvVaw32Y1poZeburjuoMX6ztm2y&ust=1740493546034000&source=images&cd=vfe&opi=89978449&ved=0CBYQjRxqFwoTCLD51_PB3IsDFQAAAAAdAAAAABAE"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
