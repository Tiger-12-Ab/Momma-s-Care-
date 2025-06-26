import React, { useEffect, useState } from "react";
import axios from "axios";
import { MoreHorizontal, Edit2, Trash2 } from "lucide-react";
import milestonesData from "../data/milestones";
import nutritionData from "../data/babyNutrition";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewbornTracker = () => {
  const [babyData, setBabyData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    babyName: "",
    gender: "",
    birthDate: "",
  });
  const [showAgeWarningModal, setShowAgeWarningModal] = useState(false);
  const [vaccinationStatus, setVaccinationStatus] = useState({});
  const [milestoneStatus, setMilestoneStatus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://momma-s-care.onrender.com/api/newborn",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setBabyData(res.data);
        setFormData({
          babyName: res.data.babyName || "",
          gender: res.data.gender || "",
          birthDate: res.data.birthDate ? res.data.birthDate.slice(0, 10) : "",
        });

        const initialVaccStatus = {};
        res.data.reminders.vaccinations.forEach((v) => {
          const alreadyDone = res.data.vaccinationsDone?.includes(v.title);

          initialVaccStatus[v.title] = alreadyDone;
        });
        setVaccinationStatus(initialVaccStatus);

        const initialMilestoneStatus = {};
        res.data.reminders.milestones.forEach(
          (m) => (initialMilestoneStatus[m.title] = false)
        );
        setMilestoneStatus(initialMilestoneStatus);
      } catch (err) {
        console.error("Error fetching baby data", err);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const markVaccinationDone = async (title) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://momma-s-care.onrender.com/api/newborn/vaccination/done",
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setVaccinationStatus((prev) => ({ ...prev, [title]: true }));
    } catch (err) {
      console.error("Failed to mark vaccination done", err);
    }
  };

  const calculateWeeksOld = (birthDate) => {
    const msPerWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor((Date.now() - new Date(birthDate)) / msPerWeek);
  };

  const handleUpdateBabyInfo = async () => {
    const weeksOld = calculateWeeksOld(formData.birthDate);
    if (weeksOld > 104) {
      setShowAgeWarningModal(true);
      return;
    }
    try {
      const token = localStorage.getItem("token");

      const dataToUpdate = {
        ...formData,
        gender: formData.gender || "Not specified",
      };

      await axios.put(
        "https://momma-s-care.onrender.com/api/newborn/update",
        dataToUpdate,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBabyData((prev) => ({
        ...prev,
        babyName: formData.babyName,
        gender: dataToUpdate.gender,
        birthDate: formData.birthDate,
      }));

      setShowEditModal(false);
      setMenuOpen(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDeleteBaby = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        "https://momma-s-care.onrender.com/api/newborn/delete",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBabyData(null);
      setShowDeleteConfirm(false);
      setMenuOpen(false);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (!babyData)
    return (
      <div className="p-6 bg-ivory min-h-screen">
        Loading or no baby data...
      </div>
    );

  const currentWeek = babyData.weeksOld;
  const milestonesThisWeek = milestonesData.filter(
    (m) => m.ageInWeeks === currentWeek
  );
  const pastMilestones = milestonesData.filter(
    (m) => m.ageInWeeks < currentWeek
  );
  const lastMilestone =
    pastMilestones.length > 0
      ? pastMilestones[pastMilestones.length - 1]
      : null;

  const upcomingMilestones = milestonesData.filter(
    (m) => m.ageInWeeks > currentWeek
  );
  const upcomingVaccinations = babyData.reminders.vaccinations.filter(
    (v) => v.ageInWeeks > currentWeek
  );

  let nutritionTips = [];
  for (let week = currentWeek; week >= 0; week--) {
    if (nutritionData[week]) {
      nutritionTips = nutritionData[week];
      break;
    }
  }
  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768, // medium devices (md)
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024, // large devices (lg)
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <section className="bg-ivory flex items-center justify-center min-h-screen">
      <div className="text-charcoal max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-2xl font-bold text-darkpink mb-4 mt-10 text-pink ">
          Hello, Little Toodler!
        </div>

        {/* Baby Info Card */}
        <div className="bg-ivory p-6 rounded mb-8 flex justify-between items-start relative">
          <div>
            <h2 className="text-3xl font-bold text-pink">
              {babyData.babyName}
            </h2>
            <p className="text-charcoal text-lg">
              Gender:{" "}
              <span className="font-semibold">
                {babyData.gender || "Not specified"}
              </span>
            </p>
            <p className="text-charcoal mt-1">
              Born on {new Date(babyData.birthDate).toLocaleDateString()}
            </p>
            <p className="font-semibold text-pink mt-1">
              {babyData.weeksOld} weeks old
            </p>
          </div>
          <div className="relative">
            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Open menu"
              className="p-2 rounded hover:bg-pink/20"
            >
              <MoreHorizontal className="w-6 h-6 text-darkpink" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow p-2 z-20">
                <button
                  onClick={() => {
                    setShowEditModal(true);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full text-sm text-pink hover:text-darkpink px-2 py-1 rounded"
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(true);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full text-sm text-red-500 hover:text-red-700 px-2 py-1 rounded mt-1"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Weekly Section - Row on lg, Column on sm */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Milestone Card */}
          <div className="bg-ivorycard p-4 rounded shadow flex-1">
            <h3 className="text-xl font-bold text-darkpink mb-2">
              This Week's Milestone
            </h3>
            {milestonesThisWeek.length > 0 ? (
              milestonesThisWeek.map((m) => (
                <div
                  key={m.title}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{m.title}</p>
                    <p className="text-sm text-gray-600">{m.description}</p>
                  </div>
                </div>
              ))
            ) : lastMilestone ? (
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{lastMilestone.title}</p>
                  <p className="text-sm text-gray-600">
                    {lastMilestone.description}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No milestones available yet.</p>
            )}
          </div>

          {/* Vaccination Card */}
          <div className="bg-ivorycard p-4 rounded shadow flex-1">
            <h3 className="text-xl font-bold text-darkpink mb-2">
              This Week's Vaccinations
            </h3>
            {babyData.reminders.vaccinations.length === 0 ? (
              <p className="text-gray-600">No vaccinations due this week.</p>
            ) : (
              <div className="max-h-[260px] overflow-y-auto pr-2 space-y-3">
                {babyData.reminders.vaccinations.map((v) => (
                  <div
                    key={v.title}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-semibold">{v.title}</p>
                      <p className="text-sm text-gray-600">{v.description}</p>
                    </div>
                    <button
                      disabled={vaccinationStatus[v.title]}
                      onClick={() => markVaccinationDone(v.title)}
                      className={`px-4 py-2 rounded font-semibold ${
                        vaccinationStatus[v.title]
                          ? "text-pink"
                          : "text-ivory bg-pink hover:bg-darkpink"
                      }`}
                    >
                      {vaccinationStatus[v.title] ? "Completed" : "Mark Done"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nutrition Card */}
          <div className="bg-ivorycard p-4 rounded shadow flex-1">
            <h3 className="text-xl font-bold text-darkpink mb-2">
              Nutrition Tips
            </h3>
            {nutritionTips.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {nutritionTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No nutrition tips available.</p>
            )}
          </div>
        </div>

        {/* Upcoming Section - Scrollable Horizontally */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-pink-600 mb-4">
            Upcoming Milestones
          </h3>
          <Slider {...sliderSettings}>
            {upcomingMilestones.map((m) => (
              <div key={m.title} className="p-2">
                <div className="bg-ivorycard p-4 rounded shadow min-h-[160px]">
                  <p className="font-semibold">{m.title}</p>
                  <p className="text-sm text-gray-600">{m.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Week {m.ageInWeeks}
                  </p>
                </div>
              </div>
            ))}
          </Slider>

          <h3 className="text-xl font-semibold text-pink-600 mt-8 mb-4">
            Upcoming Vaccinations
          </h3>
          <Slider {...sliderSettings}>
            {upcomingVaccinations.map((v) => (
              <div key={v.title} className="p-2">
                <div className="bg-ivorycard p-4 rounded shadow min-h-[160px]">
                  <p className="font-semibold">{v.title}</p>
                  <p className="text-sm text-gray-600">{v.description}</p>
                  <p className="text-xs text-gray-400 mt-1">Week {v.week}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-96 max-w-full">
              <h3 className="text-lg font-bold mb-4 text-pink-600">
                Edit Baby Info
              </h3>

              <label className="block mb-1 font-semibold text-gray-700">
                Baby Name
              </label>
              <input
                name="babyName"
                value={formData.babyName}
                onChange={handleInputChange}
                className="w-full border p-2 mb-4 text-gray-800 rounded"
                placeholder="Baby Name"
              />

              <label className="block mb-1 font-semibold text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full border p-2 mb-4 rounded"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Not specified">Prefer not to say</option>
              </select>

              <label className="block mb-1 font-semibold text-gray-700">
                Birth Date
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="w-full border p-2 mb-4 rounded"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-600 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateBabyInfo}
                  className="px-4 py-2 bg-pink text-ivory rounded hover:bg-darkpink"
                >
                  Save
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

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-80 max-w-full">
              <h3 className="text-lg font-bold mb-4 text-red-600">
                Confirm Deletion
              </h3>
              <p className="mb-6">
                Are you sure you want to delete this baby’s data? This action
                cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 rounded border border-gray-300 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteBaby}
                  className="px-4 py-2 bg-red-600 text-white rounded"
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

export default NewbornTracker;
