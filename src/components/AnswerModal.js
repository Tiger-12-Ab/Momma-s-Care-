import React, { useState } from 'react';
import axios from 'axios';

const AnswerModal = ({ isOpen, onClose, onSuccess, questionId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://momma-s-care.onrender.com/api/questions/${questionId}/answers`, { content }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setContent('');
      onSuccess(); 
      onClose();   
    } catch (err) {
      console.error('Failed to submit answer', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-pink">Your Answer</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            className="w-full border p-2 rounded"
            placeholder="Write your answer..."
            required
          />
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} type="button" className="text-gray-500">Cancel</button>
            <button type="submit" className="bg-pink hover;bg-darkpink text-white px-4 py-2 rounded">Post Answer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnswerModal;
