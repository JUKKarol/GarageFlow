'use client'
import useAuthStore from '@/shared/stores/authStore';

function UserCard() {
  const { user, logout } = useAuthStore(); 

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-between bg-gray-800 text-white p-4 rounded-lg shadow-lg mb-5">
      {/* Circle Avatar */}
      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
        <span className="text-lg font-bold">{user.userName.charAt(0)}</span>
      </div>
      <p className="mt-2 text-xs">{user.email}</p>
      <button
        onClick={logout} 
        className="mt-4 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>
  );
};

export default UserCard;
