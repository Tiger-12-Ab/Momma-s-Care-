const pregnancyNutritionData = {};

for (let week = 1; week <= 40; week++) {
  pregnancyNutritionData[week] = {
    week,
    nutritionPlan: [
      `Include iron-rich foods like spinach and lentils during week ${week}`,
      `Eat small, frequent meals to manage nausea and fatigue (week ${week})`,
    ],
    foodsToAvoid: [
      "Unpasteurized cheese",
      "Raw or undercooked meats",
      week % 4 === 0 ? "Limit caffeine intake" : "Avoid alcohol completely",
    ],
    recommendation: `Stay hydrated, get enough rest, and take prenatal vitamins during week ${week}.`,
  };
}

export default pregnancyNutritionData;
