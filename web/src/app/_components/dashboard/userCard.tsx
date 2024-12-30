'use client'
import useAuthStore from '@/shared/stores/authStore'; // Adjust the import path if needed

function UserCard() {
  // Get user data from the auth store
  const { user } = useAuthStore();

  if (!user) {
    return null; // Return nothing if there's no user data
  }

  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 rounded-lg shadow-lg mb-5">
      {/* Circle Avatar */}
      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
        {/* Optionally, you can add the user's initials here */}
        <span className="text-lg font-bold">{user.userName.charAt(0)}</span>
      </div>
      
      {/* User's Email */}
      <p className="ml-4 text-xs">{user.email}</p>
    </div>
  );
};

export default UserCard;