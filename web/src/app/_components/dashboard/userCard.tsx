'use client'
import useAuthStore from '@/shared/stores/authStore';

function UserCard() {
  const { user } = useAuthStore(); 

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-between text-white p-4 rounded-lg mb-5">
      {/* Circle Avatar */}
      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
        <span className="text-lg font-bold">{user.userName.charAt(0)}</span>
      </div>
      <p className="mt-2 text-xs">{user.email}</p>
    </div>
  );
};

export default UserCard;
