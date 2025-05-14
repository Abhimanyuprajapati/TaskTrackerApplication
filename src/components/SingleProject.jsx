import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import Toaster from '../toaster/Toaster';

export const SingleProject = () => {
  const { fetchProjectById, markProjectAsComplete, deleteProject, editProject } = useAuth();
  const Navigate = useNavigate();
  const { id } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });

const { data: SingleProject, isLoading, isError, refetch } = useQuery({
  queryKey: ['singleProject', id],
  queryFn: () => fetchProjectById(id),
onSuccess: (data) => {
  setForm({
    title: data.title || '',
    description: data.description || '',
  });
}
});



  console.log("form", form);


  const handleMarkAsComplete = async () => {
    const response = await markProjectAsComplete(id);
    if (response.status === 200) {
      Toaster(response.data?.message, "success");
      setTimeout(() => window.location.reload(), 1000);
    } else {
      Toaster(response.data?.message, "failure");
    }
  };

  const handleDelete = async () => {
    const response = await deleteProject(id);
    if (response.status === 200) {
      Toaster(response.data?.message, "success");
      setTimeout(() => Navigate(`/project`), 1000);
    } else {
      Toaster(response.data?.message, "failure");
    }
  };

const handleEdit = () => {
  setForm({
    title: SingleProject?.data?.title || '',
    description: SingleProject?.data?.description || '',
  });
  setEditOpen(true);
  setMenuOpen(false);
};


  const handleInputChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const response = await editProject(id, form);
    console.log("response", response);
    if (response.status === 200) {
      Toaster("Successfully updated the project.", "success");
      setEditOpen(false);
      refetch();
    } else {
      Toaster("Failed to update project.", "failure");
    }
  };

  if (isLoading) return <p>Loading project...</p>;
  if (isError) return <p>Something went wrong while fetching the project.</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{SingleProject.data?.title}</h2>
        <div className="relative inline-block text-left">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Action ⌄
          </button>
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
                <button
                  onClick={handleEdit}
                  className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                >
                  🖋️ Edit
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

      {/* Edit Modal */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Project</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
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
                  onClick={() => setEditOpen(false)}
                  className="px-4 py-2 border rounded-md text-gray-700"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
