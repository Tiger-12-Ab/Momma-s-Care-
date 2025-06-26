import React from "react";

const Features = () => {
  return (
    <section className="bg-ivory text-charcoal py-16 px-4">
      {/* Heading */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-pink mb-2">
          Our Core Features
        </h2>
        <p className="text-lg text-charcoal">
          Tools to help you every step of your motherhood journey.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Pregnancy Tracker */}
        <div className=" cursor-pointer flex-1 bg-ivorycard shadow-lg rounded-2xl p-6 text-center transition hover:shadow-xl">
          <h3 className="text-xl font-semibold mb-2 text-charcoal">
            Pregnancy Tracker
          </h3>
          <p className="text-warmgray text-sm">
            Week-by-week tracking of pregnancy milestones, symptoms, and health tips — all in one place.
          </p>
        </div>

        {/* Newborn Tracker */}
        <div className="cursor-pointer flex-1 bg-ivorycard shadow-lg rounded-2xl p-6 text-center transition hover:shadow-xl">
          <h3 className="text-xl font-semibold mb-2 text-charcoal">
            Newborn Tracker
          </h3>
          <p className="text-warmgray text-sm">
            Easily track feeding, sleep schedules, and diaper changes with smart logging and reminders.
          </p>
        </div>

        {/* Nutrition Support */}
        <div className="cursor-pointer flex-1 bg-ivorycard shadow-lg rounded-2xl p-6 text-center transition hover:shadow-xl">
          <h3 className="text-xl font-semibold mb-2 text-charcoal">
            Nutrition Support
          </h3>
          <p className="text-warmgray text-sm">
            Access curated meal plans and nutritional guidance for both expecting mothers and newborns.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
