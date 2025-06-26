import React, { useState } from "react";
import pregnancyNutritionData from "../data/pregnancyNutritionData";
import babyNutritionData from "../data/babyNutritionData";

const calculatePregnancyWeek = (lmp) => {
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor((Date.now() - new Date(lmp)) / msPerWeek);
};

const calculateBabyWeeksOld = (birthDate) => {
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor((Date.now() - new Date(birthDate)) / msPerWeek);
};

const NutritionPage = () => {
  const [type, setType] = useState("pregnancy");
  const [pendingType, setPendingType] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    date: "",
  });
  const [week, setWeek] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleTypeClick = (selectedType) => {
    setPendingType(selectedType);
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const weekValue =
      pendingType === "pregnancy"
        ? calculatePregnancyWeek(formData.date)
        : calculateBabyWeeksOld(formData.date);

    setWeek(weekValue);
    setType(pendingType);
    setModalOpen(false);
  };

  const data =
    type === "pregnancy"
      ? pregnancyNutritionData[week]
      : babyNutritionData[week];

  return (
    <section className="bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center mb-6 mt-8">
          <h1 className="text-3xl font-bold text-pink mb-2">
            Nourish with Love
          </h1>
          <p className="text-lg text-charcoal">
            Personalized nutrition guidance for moms-to-be and little ones —
            week by week, with care.
          </p>
        </div>
        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            className="px-4 py-2 rounded-xl shadow bg-pink text-white hover:bg-darkpink transition"
            onClick={() => handleTypeClick("pregnancy")}
          >
            Pregnancy
          </button>
          <button
            className="px-4 py-2 rounded-xl shadow bg-pink text-white hover:bg-darkpink transition"
            onClick={() => handleTypeClick("newborn")}
          >
            Newborn
          </button>
        </div>

        {/* Modal Form */}
        {modalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => setModalOpen(false)}
            aria-modal="true"
            role="dialog"
          >
            <div
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4 text-pink">
                {pendingType === "pregnancy"
                  ? "Pregnancy Details"
                  : "Newborn Details"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium mb-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full border p-2 rounded"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                {pendingType === "pregnancy" && (
                  <div>
                    <label className="block font-medium mb-1" htmlFor="age">
                      Age
                    </label>
                    <input
                      id="age"
                      type="number"
                      className="w-full border p-2 rounded"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      required
                      min={0}
                    />
                  </div>
                )}

                <div>
                  <label className="block font-medium mb-1" htmlFor="date">
                    {pendingType === "pregnancy" ? "LMP Date" : "Birth Date"}
                  </label>
                  <input
                    id="date"
                    type="date"
                    className="w-full border p-2 rounded"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-pink text-white hover:bg-darkpink transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Render Nutrition Info */}
        {week !== null && data && (
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-bold text-pink">
              Week {week} - {formData.name}
            </h2>

            {type === "pregnancy" ? (
              <>
                <div className="bg-yellow-100 p-4 rounded-xl shadow">
                  <h3 className="font-semibold text-pink">Nutrition Plan</h3>
                  <ul className="list-disc ml-4">
                    {data.nutritionPlan.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-100 p-4 rounded-xl shadow">
                  <h3 className="font-semibold text-pink">Foods to Avoid</h3>
                  <ul className="list-disc ml-4">
                    {data.foodsToAvoid.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl shadow">
                  <h3 className="font-semibold text-pink">Recommendation</h3>
                  <p>{data.recommendation}</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-pink-100 p-4 rounded-xl shadow">
                  <h3 className="font-semibold text-pink">
                    Breastfeeding Tips
                  </h3>
                  <ul className="list-disc ml-4">
                    {data.breastfeedingTips.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-purple-100 p-4 rounded-xl shadow">
                  <h3 className="font-semibold text-pink">Formula Tips</h3>
                  <ul className="list-disc ml-4">
                    {data.formulaTips.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-green-100 p-4 rounded-xl shadow">
                  <h3 className="font-semibold text-pink">
                    Age-Based Recommendation
                  </h3>
                  <p>{data.nutritionRecommendation}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl shadow">
                  <h3 className="font-semibold text-pink">
                    Weekly Nutrition Plan
                  </h3>
                  <ul className="list-disc ml-4">
                    {data.weeklyPlan.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-100 p-4 rounded-xl shadow">
                  <h3 className="font-semibold text-pink">Foods to Avoid</h3>
                  <ul className="list-disc ml-4">
                    {data.foodsToAvoid.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl shadow">
                  <h3 className="font-semibold text-pink">Tips</h3>
                  <ul className="list-disc ml-4">
                    {data.tips.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default NutritionPage;
