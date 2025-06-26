import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

const PersonalLogs = () => {
  const [logs, setLogs] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editLog, setEditLog] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [logToDelete, setLogToDelete] = useState(null);
  const [form, setForm] = useState({
    week: "",
    mood: "",
    symptoms: "",
    note: "",
  });

  const fetchLogs = async () => {
    try {
      const res = await axios.get("https://momma-s-care.onrender.com/api/pregnancy", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLogs(res.data.logs || []);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://momma-s-care.onrender.com/api/pregnancy/log",
        {
          week: Number(form.week),
          mood: form.mood,
          symptoms: form.symptoms,
          note: form.note,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchLogs();
      setShowFormModal(false);
      setForm({ week: "", mood: "", symptoms: "", note: "" });
    } catch (err) {
      console.error("Failed to save log:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://momma-s-care.onrender.com/api/pregnancy/log/${logToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchLogs();
      setShowDeleteModal(false);
      setLogToDelete(null);
    } catch (err) {
      console.error("Failed to delete log:", err);
    }
  };

  return (
    <section className="bg-ivory">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-pink">Personal Logs</h2>
          <button
            className="bg-pink hover:bg-darkpink text-ivory px-4 py-2 rounded"
            onClick={() => {
              setEditLog(null);
              setForm({ week: "", mood: "", symptoms: "", note: "" });
              setShowFormModal(true);
            }}
          >
            Add New Log
          </button>
        </div>

        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log._id}
              className="bg-ivory shadow rounded p-4 flex flex-col md:flex-row md:justify-between md:items-center"
            >
              <div>
                <p className="font-semibold">Week {log.week}</p>
                <p className="text-sm">Mood: {log.mood}</p>
                <p className="text-sm">Symptoms: {log.symptoms}</p>
                <p className="text-sm text-gray-600">
                  Notes:{" "}
                  {log.note.length > 100
                    ? log.note.slice(0, 100) + "..."
                    : log.note}
                </p>
              </div>
              <div className="mt-2 md:mt-0">
                <button
                  onClick={() => {
                    setLogToDelete(log);
                    setShowDeleteModal(true);
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {showFormModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-pink">
                Add New Log
              </h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <select
                name="week"
                className="w-full border rounded p-2"
                value={form.week}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Week</option>
                {[...Array(40)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Week {i + 1}
                  </option>
                ))}
              </select>
                <input
                  type="text"
                  name="mood"
                  placeholder="Mood"
                  className="w-full border rounded p-2"
                  value={form.mood}
                  onChange={handleInputChange}
                />
                <textarea
                  name="symptoms"
                  placeholder="Symptoms"
                  className="w-full border rounded p-2"
                  value={form.symptoms}
                  onChange={handleInputChange}
                ></textarea>
                <textarea
                  name="note"
                  placeholder="Notes"
                  className="w-full border rounded p-2"
                  value={form.note}
                  onChange={handleInputChange}
                ></textarea>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pink text-white hover:bg-darkpink rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
              <h3 className="text-lg font-semibold mb-4">Delete this log?</h3>
              <p className="text-gray-600 mb-6">
                This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PersonalLogs;
