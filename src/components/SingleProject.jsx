import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import Toaster from '../toaster/Toaster';

export const SingleProject = () => {
  const { fetchProjectById, markProjectAsComplete, deleteProject } = useAuth();
   const Navigate = useNavigate();
  const { id } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: SingleProject, isLoading, isError } = useQuery({
    queryKey: ['singleProject', id],
    queryFn: () => fetchProjectById(id),
  });

  const handleMarkAsComplete = async () => {
   const response=  await markProjectAsComplete(id);
// console.log("response", response);
 if (response.status === 200) {
        Toaster(response.data?.message, "success");
        // make some delay
        setTimeout(() => { window.location.reload(); },1000);
      }else {
        Toaster(response.data?.message, "failure");
      }
  };

  const handleDelete = async () => {
      const response = await deleteProject(id);
      console.log("delete response", response);
       if (response.status === 200) {
        Toaster(response.data?.message, "success");
        // make some delay
        setTimeout(() => {   Navigate(`/project`); },1000);
      }else {
        Toaster(response.data?.message, "failure");
      }
  };

  if (isLoading) return <p>Loading project...</p>;
  if (isError) return <p>Something went wrong while fetching the project.</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{SingleProject.data?.title}</h2>
        {/* Dropdown */}
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Action ⌄
            </button>
          </div>

          {menuOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white border z-50">
              <div className="py-1">
                <button
                  onClick={handleMarkAsComplete}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  ✅ Mark as Complete
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="text-gray-700">{SingleProject.data?.description}</p>
      <p className="text-sm text-gray-500 mt-2">
        Status: <span className="capitalize">{SingleProject.data?.status}</span>
      </p>
      <p className="text-sm text-gray-500">
        Created: {formatDistanceToNow(new Date(SingleProject.data?.createdAt), { addSuffix: true })}
      </p>
    </div>
  );
};

















// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { useAuth } from '../context/AuthContext';
// import { formatDistanceToNow } from 'date-fns';

// export const SingleProject = () => {
//   const { fetchProjectById } = useAuth();
//  const { id } = useParams();

//  const { data: SingleProject, isLoading, isError } = useQuery({
//   queryKey: ['singleProject', id],
//   queryFn: () => fetchProjectById(id),
// });


// console.log('Single Project:', SingleProject);

//   if (isLoading) return <p>Loading project...</p>;
//   if (isError) return <p>Something went wrong while fetching the project.</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">{SingleProject.data?.title}</h2>
//       <p className="text-gray-700">{SingleProject.data?.description}</p>
//       <p className="text-sm text-gray-500 mt-2">
//         Status: <span className="capitalize">{SingleProject.data?.status}</span>
//       </p>
//       <p className="text-sm text-gray-500">
//         Created: {formatDistanceToNow(new Date(SingleProject.data?.createdAt), { addSuffix: true })}
//       </p>
//     </div>  
//   );
// };
