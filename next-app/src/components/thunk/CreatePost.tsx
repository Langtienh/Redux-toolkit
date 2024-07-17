"use client";
import {
  addPostThunk,
  backupPostThunk,
  cancelEditPostThunk,
  updatePostThunk,
} from "@/redux/thunk/slice";
import { RootState, useAppDispatch } from "@/redux/store";
import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { editingPost } from "@/redux/builder/blog.reducer";
const initialState: Post = {
  description: "",
  featuredImage: "",
  id: "",
  publishDate: "",
  published: false,
  title: "",
};
export default function CreatePost() {
  const [formData, setFormData] = useState<Post>(initialState);
  const dispatch = useAppDispatch();
  const postEdit = useSelector(
    (state: RootState) => state.blogThunk.editingPost
  );
  useEffect(() => {
    if (postEdit) setFormData(postEdit);
    else setFormData(initialState);
  }, [postEdit]);
  const onSubmit = (even: FormEvent<HTMLFormElement>) => {
    even.preventDefault();
    if (postEdit)
      dispatch(updatePostThunk({ post: formData, postId: postEdit.id }));
    else dispatch(addPostThunk(formData));
    setFormData(initialState);
  };
  const handleCancelEdit = () => {
    dispatch(cancelEditPostThunk());
  };
  const handleBackup = () => {
    dispatch(backupPostThunk());
  };
  return (
    <form onSubmit={onSubmit} onReset={handleCancelEdit}>
      <div className="mb-6">
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          placeholder="Title"
          required
          value={formData.title}
          onChange={(e) =>
            setFormData((pre) => ({ ...pre, title: e.target.value }))
          }
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="featuredImage"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Featured Image
        </label>
        <input
          type="text"
          id="featuredImage"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          placeholder="Url image"
          required
          value={formData.featuredImage}
          onChange={(e) =>
            setFormData((pre) => ({ ...pre, featuredImage: e.target.value }))
          }
        />
      </div>
      <div className="mb-6">
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="Your description..."
            required
            value={formData.description}
            onChange={(e) =>
              setFormData((pre) => ({ ...pre, description: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="publishDate"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Publish Date
        </label>
        <input
          type="datetime-local"
          id="publishDate"
          className="block w-56 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          placeholder="Title"
          required
          value={formData.publishDate}
          onChange={(e) =>
            setFormData((pre) => ({ ...pre, publishDate: e.target.value }))
          }
        />
      </div>
      <div className="mb-6 flex items-center">
        <input
          id="publish"
          type="checkbox"
          className="h-4 w-4 focus:ring-2 focus:ring-blue-500"
          checked={formData.published}
          onChange={(e) =>
            setFormData((pre) => ({ ...pre, published: e.target.checked }))
          }
        />
        <label
          htmlFor="publish"
          className="ml-2 text-sm font-medium text-gray-900"
        >
          Publish
        </label>
      </div>
      <div>
        {!postEdit && (
          <button
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800 mr-3"
            type="submit"
          >
            <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
              Publish Post
            </span>
          </button>
        )}

        {!!postEdit && (
          <button
            type="submit"
            className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 dark:focus:ring-lime-800"
          >
            <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
              Update Post
            </span>
          </button>
        )}
        <button
          type="reset"
          className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400"
        >
          <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
            Cancel
          </span>
        </button>
        <button
          onClick={handleBackup}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800 mr-3"
          type="button"
        >
          <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
            Backup
          </span>
        </button>
      </div>
    </form>
  );
}
