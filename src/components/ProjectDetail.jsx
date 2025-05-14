import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import Toaster from '../toaster/Toaster';

export const ProjectDetail = () => {
  const { fetchProject, createProject } = useAuth();
  const Navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });

  const {
    data: AllProject,
    isLoading: ProjectLoading,
    isError: projectError,
    refetch,
  } = useQuery({
    queryKey: ['allProject'],
    queryFn: fetchProject,
  });

  const handleNavigator = (id) => {
    Navigate(`/project/${id}`);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
  const response= await createProject(form);
  console.log("response", response);
 if (response.status === 201) {
        Toaster("Project Created successfully", "success");
        // make some delay
        setTimeout(() => {  setForm({ title: '', description: '' });
    setIsModalOpen(false);
    refetch();  },1000);
      }else {
        Toaster("An unexpected error occurred while creating project", "failure");
      }
  };

  if (ProjectLoading) return <p>Loading project...</p>;
  if (projectError) return <p>Something went wrong while fetching the project.</p>;

  return (
    <>
      {/* Add Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Project
        </button>
      </div>

      {/* Mobile View */}
      <div className="space-y-4 lg:hidden">
        {AllProject.data?.map((project) => (
          <div key={project._id} className="p-4 border rounded-md shadow-sm bg-white">
            <h3 className="text-lg font-medium truncate" title={project.title}>
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 truncate" title={project.description}>
              {project.description}
            </p>
            <div className="text-sm mt-2 flex justify-between">
              <span className="capitalize text-gray-700">{project.status}</span>
              <span className="text-gray-500">
                {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border-b">Title</th>
              <th className="text-left px-4 py-2 border-b">Description</th>
              <th className="text-left px-4 py-2 border-b">Status</th>
              <th className="text-left px-4 py-2 border-b">Created</th>
            </tr>
          </thead>
          <tbody>
            {AllProject.data?.map((project) => (
              <tr
                key={project._id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleNavigator(project._id)}
              >
                <td className="px-4 py-2 border-b max-w-xs truncate" title={project.title}>
                  {project.title}
                </td>
                <td className="px-4 py-2 border-b max-w-xs truncate" title={project.description}>
                  {project.description}
                </td>
                <td className="px-4 py-2 border-b capitalize">{project.status}</td>
                <td className="px-4 py-2 border-b">
                  {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Project</h3>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded mt-1"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-md text-gray-700"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};






// import { useNavigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { useAuth } from '../context/AuthContext';
// import { formatDistanceToNow } from 'date-fns';

// export const ProjectDetail = () => {
//   const { fetchProject } = useAuth();
//   const Navigate = useNavigate();

//   const {
//     data: AllProject,
//     isLoading: ProjectLoading,
//     isError: projectError,
//   } = useQuery({
//     queryKey: ['allProject'],
//     queryFn: fetchProject,
//   });

//   const handleNavigator = (id) => {
//     Navigate(`/project/${id}`);
//   }

//   if (ProjectLoading) return <p>Loading project...</p>;
//   if (projectError) return <p>Something went wrong while fetching the project.</p>;

//   return (
//     <>
//       <div className="space-y-4 lg:hidden">
//         {AllProject.data?.map((project) => (
//           <div key={project._id} className="p-4 border rounded-md shadow-sm bg-white">
//             <h3 className="text-lg font-medium truncate" title={project.title}>
//               {project.title}
//             </h3>
//             <p className="text-sm text-gray-600 truncate" title={project.description}>
//               {project.description}
//             </p>
//             <div className="text-sm mt-2 flex justify-between">
//               <span className="capitalize text-gray-700">{project.status}</span>
//               <span className="text-gray-500">
//                 {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="hidden lg:block overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="text-left px-4 py-2 border-b">Title</th>
//               <th className="text-left px-4 py-2 border-b">Description</th>
//               <th className="text-left px-4 py-2 border-b">Status</th>
//               <th className="text-left px-4 py-2 border-b">Created</th>
//             </tr>
//           </thead>
//           <tbody>
//             {AllProject.data?.map((project) => (
//               <tr key={project._id}
//                 className="hover:bg-gray-50 cursor-pointer"
//                 onClick={() => handleNavigator(project._id)}>
//                 <td className="px-4 py-2 border-b max-w-xs truncate" title={project.title}>
//                   {project.title}
//                 </td>
//                 <td className="px-4 py-2 border-b max-w-xs truncate" title={project.description}>
//                   {project.description}
//                 </td>
//                 <td className="px-4 py-2 border-b capitalize">{project.status}</td>
//                 <td className="px-4 py-2 border-b">
//                   {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };



// // <div className="p-4">
// //   <h2 className="text-xl font-semibold mb-4">All Projects</h2>
// //   <div className="grid grid-cols-1 lg:grid-cols-4 bg-gray-100 font-medium text-gray-700 rounded-t-md overflow-hidden hidden lg:grid">
// //     <div className="px-4 py-2 border-b">Title</div>
// //     <div className="px-4 py-2 border-b">Description</div>
// //     <div className="px-4 py-2 border-b">Status</div>
// //     <div className="px-4 py-2 border-b">Created</div>
// //   </div>

// //   <div className="divide-y">
// //     {AllProject.data?.map((project) => (
// //       <div
// //         key={project._id}
// //         className="grid grid-cols-1 lg:grid-cols-4 bg-white p-4 gap-y-2 lg:gap-y-0 lg:p-0 hover:bg-gray-50 transition-all duration-150"
// //       >
// //         <div className="lg:px-4 lg:py-2 truncate" title={project.title}>
// //           <span className="lg:hidden font-semibold">Title: </span>
// //           {project.title}
// //         </div>
// //         <div className="lg:px-4 lg:py-2 truncate" title={project.description}>
// //           <span className="lg:hidden font-semibold">Description: </span>
// //           {project.description}
// //         </div>
// //         <div className="lg:px-4 lg:py-2 capitalize">
// //           <span className="lg:hidden font-semibold">Status: </span>
// //           {project.status}
// //         </div>
// //         <div className="lg:px-4 lg:py-2 text-gray-500">
// //           <span className="lg:hidden font-semibold">Created: </span>
// //           {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
// //         </div>
// //       </div>
// //     ))}
// //   </div>
// // </div>