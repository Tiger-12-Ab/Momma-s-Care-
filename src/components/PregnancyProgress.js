import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

const PregnancyProgress = () => {
  const [data, setData] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const userRes = await axios.get("https://momma-s-care.onrender.com/api/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUserName(userRes.data.name || "Mom");

        const res = await axios.get("https://momma-s-care.onrender.com/api/pregnancy", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setData(res.data);
      } catch (err) {
        setError("Failed to load pregnancy data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteTracker = async () => {
    try {
      await axios.delete("https://momma-s-care.onrender.com/api/pregnancy/delete", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(null);
      setShowDeleteModal(false);
    } catch (err) {
      alert("Failed to delete tracker.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-500">Loading pregnancy tracker...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 text-center p-4">
        <p>{error}</p>
      </div>
    );

  if (!data)
    return (
      <div className="text-center p-4">
        <p>No pregnancy data found. Please start your tracker.</p>
      </div>
    );

  const {
    currentWeek,
    currentDay,
    lmpDate,
    dueDate,
    trimester,
    progress,
    growthInfo,
    nutritionTips,
  } = data;

  const formattedLmpDate = new Date(lmpDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedDueDate = new Date(dueDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="bg-ivory ">
      <div className="max-w-5xl mx-auto p-6 relative">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold text-darkpink mt-8 mb-6">
            Welcome, <span className="text-darkpink">{userName}</span>!
          </h1>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="text-red-600 hover:text-red-800 transition"
            title="Delete Pregnancy Tracker"
          >
            <Trash2 size={24} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 bg-ivory rounded-lg p-6 ">
          <div className="md:w-1/2  pr-6">
            <h2 className="text-xl font-semibold mb-4 text-pink">Progress Overview</h2>
            <p className="text-lg mb-1"><span className="font-semibold">Week:</span> {currentWeek}, Day {currentDay}</p>
            <p className="text-lg mb-1"><span className="font-semibold">LMP Date:</span> {formattedLmpDate}</p>
            <p className="text-lg mb-1"><span className="font-semibold">Due Date:</span> {formattedDueDate}</p>
            <p className="text-lg mb-6">
              <span className="font-semibold">Trimester:</span> {trimester}
              {trimester === 1 ? "st" : trimester === 2 ? "nd" : "rd"}
            </p>

            <div>
              <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-pink transition-all duration-500"
                  style={{ width: progress }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold">
                  {progress} complete
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 pl-6">
            <h2 className="text-xl font-semibold mb-4 text-pink">Weekly Growth Info</h2>
            {growthInfo ? (
              <>
                <p className="text-lg mb-2">
                  <span className="font-semibold">Baby Size:</span> {growthInfo.babySize}
                </p>
                <p className="mb-4">{growthInfo.description}</p>
                <h3 className="font-semibold mb-2">Nutrition Tips:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {nutritionTips.length > 0 ? (
                    nutritionTips.map((tip, idx) => <li key={idx}>{tip}</li>)
                  ) : (
                    <li>No nutrition tips available</li>
                  )}
                </ul>
              </>
            ) : (
              <p>No weekly growth info available</p>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-4">Delete Pregnancy Tracker?</h3>
            <p className="text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTracker}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PregnancyProgress;
