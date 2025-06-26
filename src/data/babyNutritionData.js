// File: src/data/babyNutritionData.js

const babyNutritionData = {};

for (let week = 0; week <= 104; week++) {
  babyNutritionData[week] = {
    ageInWeeks: week,
    breastfeedingTips: [
      `Breastfeed every 2-3 hours during week ${week}`,
      week < 24 ? "Ensure proper latch" : "Supplement with solids as needed",
    ],
    formulaTips: [
      "Sterilize bottles before each use",
      week < 24 ? "Feed 4-6 oz every 3-4 hrs" : "Adjust quantity with solids",
    ],
    nutritionRecommendation:
      week < 24
        ? "No solids yet. Breast milk or formula only."
        : week < 52
        ? "Gradually introduce pureed solids and soft foods."
        : "Encourage family meals with safe, soft solid foods.",
    weeklyPlan: [
      week < 24
        ? "Milk feeds only"
        : week < 52
        ? "1-2 solid meals + milk feeds"
        : "3 meals + 2 snacks + milk feeds",
    ],
    foodsToAvoid: [
      "Honey",
      "Whole nuts",
      "Added sugar",
      "Salt",
    ],
    tips: [
      week < 24
        ? "Watch for hunger cues and burp after feeds"
        : week < 52
        ? "Introduce one new food at a time"
        : "Encourage self-feeding and healthy habits",
    ],
  };
}

export default babyNutritionData;
