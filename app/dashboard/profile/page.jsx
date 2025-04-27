// components/dashboard/profile.jsx
"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'Student',
    bio: 'A passionate learner in the field of software development.',
  });

  const handleEditProfile = () => {
    alert('Edit profile functionality here');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-3xl">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://ui-avatars.com/api/?name=John+Doe&background=random"
            alt="User Avatar"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h1 className="text-3xl font-bold">{userData.name}</h1>
          <p className="text-gray-500">{userData.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-5 rounded-xl">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Role</h2>
            <p className="text-gray-600">{userData.role}</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-xl">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Bio</h2>
            <p className="text-gray-600">{userData.bio}</p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-6 rounded-full transition"
            onClick={handleEditProfile}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
