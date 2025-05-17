import React, { useEffect, useRef } from 'react';
import { UserCircle, Pencil } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import Toaster from '../toaster/Toaster';

export const Setting = () => {
  const { getProfile, setProfilePic, updateProfile } = useAuth();
  const fileInputRef = useRef(null);

  const {
    data: getProfileData,
    isLoading: getProfileLoading,
    isError: getProfileError,
    refetch,
  } = useQuery({
    queryKey: ['getProfile'],
    queryFn: getProfile,
  });

    const { name, email, country, profilePic } = getProfileData?.data.user || {};

   const handleIconClick = () => {
    fileInputRef.current?.click();
  };

 const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

const handleFileChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('profilePic', file);

  try {
    const response = await updateProfile(formData); 
    if (response.status === 200) {
      const base64 = await toBase64(file);
      setProfilePic(base64); // Show new image immediately
      refetch(); // Optionally re-fetch from server
      Toaster("Profile picture updated successfully", "success");
    } else {
      Toaster(response.data?.message || "Update failed", "failure");
    }
  } catch (error) {
    Toaster("An error occurred while uploading", "failure");
  }
};

    useEffect(() => {
    if (getProfileData?.data?.user?.profilePic) {
      setProfilePic(getProfileData.data.user.profilePic);
    }
  }, [getProfileData, setProfilePic]);

  if (getProfileLoading) return <p className="text-center mt-10">Loading profile...</p>;
  if (getProfileError) return <p className="text-center mt-10 text-red-500">Something went wrong while fetching the profile.</p>;
 
  return (
    <div className="flex-1 overflow-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Account Settings</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700">Profile Information</h2>

        {/* Profile Picture Section with Pencil Icon */}
        <div className="relative w-20 h-20">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="w-20 h-20 rounded-full border border-gray-300 object-cover shadow-sm"
            />
          ) : (
            <UserCircle className="w-20 h-20 text-gray-400" />
          )}
          <button
    onClick={handleIconClick}
    className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow hover:bg-gray-100"
    title="Change profile picture"
  >
    <Pencil className="w-4 h-4 text-gray-600" />
  </button>
         <input
    type="file"
    accept="image/*"
    ref={fileInputRef}
    onChange={handleFileChange}
    className="hidden"
  />
        </div>

        {/* Info Fields (Disabled) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={name || ''}
              disabled
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed text-gray-600"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email || ''}
              disabled
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed text-gray-600"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Country</label>
            <input
              type="text"
              value={country || ''}
              disabled
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed text-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};
