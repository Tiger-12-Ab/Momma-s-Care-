import React, { useState } from "react";
import axios from "axios";

const QuestionModal = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://momma-s-care.onrender.com/api/questions",
        {
          title,
          content,
          tags: tags.split(",").map((tag) => tag.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Reset form fields
      setTitle("");
      setContent("");
      setTags("");

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error posting question:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-pink">Ask a New Question</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Describe your question"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="text-gray-500">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-pink text-ivory px-4 py-2 rounded hover:bg-darkpink"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionModal;
