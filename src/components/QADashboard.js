import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import QuestionModal from "./QuestionModal";

const QADashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const limit = 10;

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("https://momma-s-care.onrender.com/api/questions", {
        params: { search, page, limit },
      });
      setQuestions(res.data.questions);
      setTotal(res.data.total);
    } catch (error) {
      console.error("Failed to fetch questions", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [search, page]);

  return (
    <section className="bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto p-4">
        {/* Heading and Tagline */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-pink">Momma’s Community Q&A</h1>
          <p className="text-gray-600 mt-1">
            Ask your questions, share your wisdom, and support other moms on their journey.
          </p>
        </div>

        {/* Search and Ask Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <div className="relative w-full sm:w-3/4">
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded px-10 py-2"
            />
            <Search className="absolute top-2.5 left-3 w-5 h-5 text-pink" />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-pink text-ivory px-4 py-2 rounded hover:bg-darkpink"
          >
            Ask a Question
          </button>
        </div>

        {/* Questions List */}
        {questions.length === 0 ? (
          <p>No questions found.</p>
        ) : (
          <ul>
            {questions.map((q) => (
              <li key={q._id} className="border-b py-3">
                <Link
                  to={`/questions/${q._id}`}
                  className="text-lg font-semibold text-pink hover:text-darkpink"
                >
                  {q.title}
                </Link>
                <p className="text-sm text-gray-600 truncate">{q.content}</p>
                <div className="text-xs text-gray-500">
                  Tags: {q.tags?.join(", ") || "None"}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination */}
        <div className="mt-4 flex justify-center space-x-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded bg-pink hover:bg-darkpink"
          >
            Prev
          </button>
          <span>
            Page {page} of {Math.ceil(total / limit)}
          </span>
          <button
            disabled={page >= Math.ceil(total / limit)}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded bg-pink hover:bg-darkpink"
          >
            Next
          </button>
        </div>

        {/* Question Modal */}
        <QuestionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            fetchQuestions();
            setShowModal(false);
          }}
        />
      </div>
    </section>
  );
};

export default QADashboard;
