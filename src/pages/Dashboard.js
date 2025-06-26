import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAgeWarningModal, setShowAgeWarningModal] = useState(false);
  const [error, setError] = useState("");
  const [showPregnancyModal, setShowPregnancyModal] = useState(false);
  const [showNewbornModal, setShowNewbornModal] = useState(false);
  const [gender, setGender] = useState("Not specified");
  const [lmpDate, setLmpDate] = useState("");
  const [babyName, setBabyName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://momma-s-care.onrender.com/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserData(res.data);
      } catch (err) {
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [showPregnancyModal, showNewbornModal]);

  const calculateWeeksOld = (birthDate) => {
    const msPerWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor((Date.now() - new Date(birthDate)) / msPerWeek);
  };

  const startPregnancyTracker = async () => {
    try {
      await axios.post(
        "https://momma-s-care.onrender.com/api/pregnancy/start",
        { lmpDate },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setShowPregnancyModal(false);
      setLmpDate("");
    } catch (err) {
      alert("Failed to start pregnancy tracker");
    }
  };

  const startNewbornTracker = async () => {
    const weeksOld = calculateWeeksOld(birthDate);

    if (weeksOld > 104) {
      setShowAgeWarningModal(true);
      return; // Stop submission
    }
    try {
      await axios.post(
        "https://momma-s-care.onrender.com/api/newborn/start",
        { babyName, birthDate, gender },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setShowNewbornModal(false);
      setBabyName("");
      setBirthDate("");
    } catch (err) {
      alert("Failed to start newborn tracker");
    }
  };

  if (loading)
    return (
      <div className="text-center bg-ivory  p-8 min-h-screen">Loading...</div>
    );
  if (error)
    return (
      <div className="text-red-600 bg-ivory text-center p-8 min-h-screen">
        {error}
      </div>
    );

  return (
    <section className="bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto p-6 ">
        <h1 className="text-3xl font-bold text-pink mb-4">
          Welcome back, {userData.name}!
        </h1>
        <p className="text-warmgray mb-6 text-lg">
          Let's get you started with your care journey:
        </p>

        <div className="flex gap-4 mb-10 flex-wrap">
          <button
            className="bg-pink hover:bg-darkpink text-white px-4 py-2 rounded-lg"
            onClick={() => setShowPregnancyModal(true)}
          >
            Start Pregnancy Tracker
          </button>
          <button
            className="bg-pink hover:bg-darkpink text-white px-4 py-2 rounded-lg"
            onClick={() => setShowNewbornModal(true)}
          >
            Start Newborn Tracker
          </button>
        </div>

        {/* Active Trackers */}
        {userData.hasPregnancyTracker && (
          <div className="mb-8 bg-ivory rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold text-pink mb-2">
              Pregnancy Tracker - Week {userData.pregnancyTracker.currentWeek}
            </h2>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => navigate("/pregnancy")}
                className="bg-pink hover:bg-darkpink text-white px-4 py-2 rounded-lg"
              >
                View Progress
              </button>
            </div>
          </div>
        )}

        {userData.hasNewbornTracker && (
          <div className="bg-ivory rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold text-pink mb-2">
              Newborn Tracker - Age: {userData.newbornTracker.babyAgeWeeks}{" "}
              weeks
            </h2>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => navigate("/newborn")}
                className="bg-pink hover:bg-darkpink text-white px-4 py-2 rounded-lg"
              >
                View Milestones
              </button>
            </div>
          </div>
        )}

        {/* Pregnancy Modal */}
        {showPregnancyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4 text-pink">
                Start Pregnancy Tracker
              </h2>
              <label className="block mb-2 text-gray-700">
                Last Menstrual Period
              </label>
              <input
                type="date"
                value={lmpDate}
                onChange={(e) => setLmpDate(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowPregnancyModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={startPregnancyTracker}
                  className="px-4 py-2 bg-pink hover:bg-darkpink text-white rounded-lg"
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        )}
        {showAgeWarningModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-4">
              <h2 className="text-xl font-semibold mb-4 text-red-600">
                Age Limit Exceeded
              </h2>
              <p className="mb-4">
                The baby’s age cannot exceed 2 years (104 weeks). Please enter a
                valid birth date.
              </p>
              <button
                onClick={() => setShowAgeWarningModal(false)}
                className="px-4 py-2 bg-pink text-white rounded hover:bg-darkpink"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Newborn Modal */}
        {showNewbornModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4 text-pink">
                Start Newborn Tracker
              </h2>
              <label className="block mb-1 text-gray-700">Baby Name</label>
              <input
                type="text"
                value={babyName}
                onChange={(e) => setBabyName(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg mb-3"
              />
              <label className="block mb-1 text-gray-700">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg mb-3"
              >
                <option value="Not specified">Prefer not to say</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <label className="block mb-1 text-gray-700">Birth Date</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowNewbornModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={startNewbornTracker}
                  className="px-4 py-2 bg-pink hover:bg-darkpink text-white rounded-lg"
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
