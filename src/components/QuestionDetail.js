import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AnswerModal from "./AnswerModal";

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  // Modal state
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);

  const fetchQuestion = async () => {
    try {
      const res = await axios.get(`https://momma-s-care.onrender.com/api/questions/${id}`);
      setQuestion(res.data.question);
      setAnswers(res.data.answers);
    } catch (error) {
      console.error("Failed to load question", error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  // Handle upvote
  const handleUpvote = async (answerId) => {
    try {
      await axios.post(
        `https://momma-s-care.onrender.com/api/questions/answers/${answerId}/upvote`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchQuestion();
    } catch (error) {
      console.error("Failed to upvote", error);
    }
  };

  if (!question) return <p className="bg-ivory min-h-screen">Loading...</p>;

  return (
    <section className="bg-ivory">
      <div className="max-w-3xl mx-auto p-4 pt-8">
        <h1 className="text-3xl font-bold mb-2 text-pink">{question.title}</h1>
        <p className="mb-4 whitespace-pre-wrap">{question.content}</p>
        <div className="mb-6 text-sm text-gray-600">
          Tags: {question.tags?.join(", ") || "None"}
        </div>

        <h2 className="text-2xl mb-4 text-pink">Answers</h2>
        {answers.length === 0 && <p>No answers yet.</p>}

        <ul>
          {answers.map((answer) => (
            <li key={answer._id} className="border p-3">
              <p className="whitespace-pre-wrap">{answer.content}</p>
              <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                <span>By: {answer.authorId.name || "Unknown"}</span>
                <span>Votes: {answer.votes}</span>
                <button
                  onClick={() => handleUpvote(answer._id)}
                  className="text-pink hover:underline"
                >
                  Upvote
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Button to open Answer Modal */}
        <button
          onClick={() => setIsAnswerModalOpen(true)}
          className="mt-6 bg-pink hover:bg-darkpink text-ivory px-4 py-2 rounded"
        >
          Add Your Answer
        </button>

        {/* Answer Modal */}
        <AnswerModal
          isOpen={isAnswerModalOpen}
          onClose={() => setIsAnswerModalOpen(false)}
          onSuccess={() => {
            fetchQuestion();
            setIsAnswerModalOpen(false);
          }}
          questionId={id}
        />
      </div>
    </section>
  );
};

export default QuestionDetail;
