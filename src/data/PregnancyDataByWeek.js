const pregnancyDataByWeek = {
  1: {
    growthInfo: {
      babySize: "Poppy seed",
      description:
        "A tiny embryo starts developing. The neural tube (which becomes the brain and spinal cord) begins to form.",
    },
    nutritionTips: [
      "Start taking prenatal vitamins with folic acid.",
      "Avoid alcohol, smoking, and certain medications.",
    ],
  },
  2: {
    growthInfo: {
      babySize: "Apple seed",
      description:
        "The embryo’s heart starts beating and basic facial features begin to form.",
    },
    nutritionTips: [
      "Eat iron-rich foods like leafy greens and legumes.",
      "Stay hydrated and avoid caffeine overload.",
    ],
  },
  3: {
    growthInfo: {
      babySize: "Blueberry",
      description:
        "Limb buds start appearing; the embryo is about the size of a blueberry.",
    },
    nutritionTips: [
      "Include calcium-rich foods for bone development.",
      "Consume plenty of fruits and vegetables.",
    ],
  },
  4: {
    growthInfo: {
      babySize: "Raspberry",
      description:
        "The embryo continues to grow rapidly, and major organs begin developing.",
    },
    nutritionTips: [
      "Maintain a balanced diet with protein, healthy fats, and carbs.",
      "Avoid processed foods and added sugars.",
    ],
  },
  5: {
    growthInfo: {
      babySize: "Sesame seed",
      description:
        "The neural tube closes, and the baby's brain and spinal cord develop rapidly.",
    },
    nutritionTips: [
      "Keep up folic acid intake to support neural development.",
      "Eat foods rich in omega-3 fatty acids like walnuts and flaxseeds.",
    ],
  },

  6: {
    growthInfo: {
      babySize: "Lentil",
      description:
        "The baby's facial features become more defined and the heart beats steadily.",
    },
    nutritionTips: [
      "Include protein-rich foods like lean meats and legumes.",
      "Stay hydrated and maintain a healthy weight.",
    ],
  },
  7: {
    growthInfo: {
      babySize: "Blueberry",
      description:
        "The baby’s brain and lungs start to develop rapidly.",
    },
    nutritionTips: [
      "Consume vitamin C-rich fruits to support immunity.",
      "Avoid high-mercury fish and unpasteurized products.",
    ],
  },
  8: {
    growthInfo: {
      babySize: "Kidney bean",
      description:
        "The baby’s arms, legs, fingers, and toes start forming.",
    },
    nutritionTips: [
      "Eat whole grains for sustained energy.",
      "Limit caffeine intake.",
    ],
  },
  9: {
    growthInfo: {
      babySize: "Grape",
      description:
        "Baby's bones start hardening and facial features become clearer.",
    },
    nutritionTips: [
      "Get enough calcium and vitamin D for bone health.",
      "Maintain a diet rich in fiber.",
    ],
  },
  10: {
    growthInfo: {
      babySize: "Prune",
      description:
        "The baby’s organs are developing and will soon start functioning.",
    },
    nutritionTips: [
      "Eat foods high in iron to prevent anemia.",
      "Stay physically active with doctor's approval.",
    ],
  },

  11: {
    growthInfo: {
      babySize: "Fig",
      description:
        "The baby's fingers and toes separate; nails and hair start growing.",
    },
    nutritionTips: [
      "Incorporate healthy fats like avocados and nuts.",
      "Keep hydrated throughout the day.",
    ],
  },
  12: {
    growthInfo: {
      babySize: "Lime",
      description:
        "The baby’s reflexes develop, and eyelids close to protect the eyes.",
    },
    nutritionTips: [
      "Focus on a balanced diet with fruits, veggies, and protein.",
      "Avoid raw or undercooked foods.",
    ],
  },
  13: {
    growthInfo: {
      babySize: "Peach",
      description:
        "The baby is starting the second trimester with rapid growth and development.",
    },
    nutritionTips: [
      "Increase fiber intake to ease digestion.",
      "Take prenatal vitamins as prescribed.",
    ],
  },
  14: {
    growthInfo: {
      babySize: "Lemon",
      description:
        "The baby’s arms and legs lengthen and facial muscles develop.",
    },
    nutritionTips: [
      "Eat iron-rich foods like spinach and lentils.",
      "Drink plenty of water.",
    ],
  },
  15: {
    growthInfo: {
      babySize: "Apple",
      description:
        "The baby begins to develop fingerprints and vocal cords.",
    },
    nutritionTips: [
      "Include whole grains for energy.",
      "Avoid high-sodium foods to reduce swelling.",
    ],
  },

  16: {
    growthInfo: {
      babySize: "Avocado",
      description:
        "The baby can make sucking motions and may start to move.",
    },
    nutritionTips: [
      "Eat a variety of colorful vegetables.",
      "Maintain adequate protein intake.",
    ],
  },
  17: {
    growthInfo: {
      babySize: "Onion",
      description:
        "The baby's skeleton is hardening and joints are working.",
    },
    nutritionTips: [
      "Include dairy products for calcium.",
      "Stay active but avoid strenuous exercises.",
    ],
  },
  18: {
    growthInfo: {
      babySize: "Sweet potato",
      description:
        "The baby’s senses develop, including hearing.",
    },
    nutritionTips: [
      "Consume foods rich in folate.",
      "Limit sugar intake.",
    ],
  },
  19: {
    growthInfo: {
      babySize: "Mango",
      description:
        "The baby’s muscles and lungs continue to develop.",
    },
    nutritionTips: [
      "Eat magnesium-rich foods like nuts and seeds.",
      "Stay hydrated.",
    ],
  },
  20: {
    growthInfo: {
      babySize: "Banana",
      description:
        "The baby is halfway through pregnancy and begins to develop hair.",
    },
    nutritionTips: [
      "Include iron and protein rich foods.",
      "Avoid processed snacks.",
    ],
  },

  21: {
    growthInfo: {
      babySize: "Carrot",
      description:
        "The baby's digestive system matures, and movements increase.",
    },
    nutritionTips: [
      "Eat plenty of fruits and vegetables.",
      "Practice mindful eating to manage weight.",
    ],
  },
  22: {
    growthInfo: {
      babySize: "Spaghetti squash",
      description:
        "The baby’s lungs continue to develop and they can respond to sounds.",
    },
    nutritionTips: [
      "Maintain balanced nutrition with adequate vitamins.",
      "Avoid alcohol and tobacco.",
    ],
  },
  23: {
    growthInfo: {
      babySize: "Grapefruit",
      description:
        "The baby's skin is becoming less transparent.",
    },
    nutritionTips: [
      "Eat foods high in vitamin C.",
      "Manage swelling with proper hydration.",
    ],
  },
  24: {
    growthInfo: {
      babySize: "Corn",
      description:
        "The baby practices breathing movements and the senses sharpen.",
    },
    nutritionTips: [
      "Include healthy fats and protein.",
      "Take breaks to rest as needed.",
    ],
  },
  25: {
    growthInfo: {
      babySize: "Cauliflower",
      description:
        "The baby’s immune system is developing and body fat increases.",
    },
    nutritionTips: [
      "Eat zinc-rich foods like nuts and legumes.",
      "Maintain hydration.",
    ],
  },

  26: {
    growthInfo: {
      babySize: "Kale leaf",
      description:
        "The baby gains more control over movements and sleep cycles.",
    },
    nutritionTips: [
      "Consume iron and calcium rich foods.",
      "Avoid heavy lifting.",
    ],
  },
  27: {
    growthInfo: {
      babySize: "Lettuce leaf",
      description:
        "The baby's lungs and brain grow rapidly.",
    },
    nutritionTips: [
      "Keep balanced meals with protein and fiber.",
      "Stay physically active within limits.",
    ],
  },
  28: {
    growthInfo: {
      babySize: "Eggplant",
      description:
        "The baby enters the third trimester; lungs prepare for breathing.",
    },
    nutritionTips: [
      "Increase calcium and vitamin D intake.",
      "Watch for swelling and report concerns.",
    ],
  },
  29: {
    growthInfo: {
      babySize: "Butternut squash",
      description:
        "The baby gains weight rapidly and begins to practice breathing motions.",
    },
    nutritionTips: [
      "Eat frequent small meals to reduce heartburn.",
      "Stay hydrated.",
    ],
  },
  30: {
    growthInfo: {
      babySize: "Cucumber",
      description:
        "The baby’s bones are fully formed but still soft.",
    },
    nutritionTips: [
      "Maintain protein and iron intake.",
      "Include fiber to help with digestion.",
    ],
  },

  31: {
    growthInfo: {
      babySize: "Honeydew melon",
      description:
        "The baby’s brain development speeds up.",
    },
    nutritionTips: [
      "Eat foods rich in omega-3 fatty acids.",
      "Avoid excess salt intake.",
    ],
  },
  32: {
    growthInfo: {
      babySize: "Squash",
      description:
        "The baby gains more body fat and develops fingernails.",
    },
    nutritionTips: [
      "Stay hydrated and eat balanced meals.",
      "Practice relaxation techniques.",
    ],
  },
  33: {
    growthInfo: {
      babySize: "Pineapple",
      description:
        "The baby’s bones harden, and lanugo begins to disappear.",
    },
    nutritionTips: [
      "Include iron and calcium rich foods.",
      "Manage swelling with elevation and hydration.",
    ],
  },
  34: {
    growthInfo: {
      babySize: "Cantaloupe",
      description:
        "The baby’s lungs mature further and immune system strengthens.",
    },
    nutritionTips: [
      "Eat foods rich in vitamins A and C.",
      "Rest when needed.",
    ],
  },
  35: {
    growthInfo: {
      babySize: "Honeydew melon",
      description:
        "The baby’s brain and lungs continue to mature rapidly.",
    },
    nutritionTips: [
      "Continue a balanced diet with protein and vitamins.",
      "Prepare for breastfeeding with guidance.",
    ],
  },

  36: {
    growthInfo: {
      babySize: "Romaine lettuce",
      description:
        "The baby drops lower into the pelvis preparing for birth.",
    },
    nutritionTips: [
      "Eat iron-rich foods to prevent anemia.",
      "Stay hydrated and active with gentle walks.",
    ],
  },
  37: {
    growthInfo: {
      babySize: "Winter melon",
      description:
        "The baby is considered full term and continues to gain weight.",
    },
    nutritionTips: [
      "Maintain nutrition and rest.",
      "Practice breathing and relaxation exercises.",
    ],
  },
  38: {
    growthInfo: {
      babySize: "Pumpkin",
      description:
        "The baby’s organs are ready for life outside the womb.",
    },
    nutritionTips: [
      "Eat small, frequent meals.",
      "Stay hydrated and avoid heavy lifting.",
    ],
  },
  39: {
    growthInfo: {
      babySize: "Watermelon",
      description:
        "The baby continues to grow and gain fat for temperature regulation.",
    },
    nutritionTips: [
      "Keep up hydration and balanced nutrition.",
      "Prepare for labor with exercises and education.",
    ],
  },
  40: {
    growthInfo: {
      babySize: "Full term baby",
      description:
        "Your baby is ready for birth! Organs are fully developed.",
    },
    nutritionTips: [
      "Maintain calm and rest.",
      "Ensure regular prenatal checkups.",
    ],
  },
};

module.exports = pregnancyDataByWeek;
