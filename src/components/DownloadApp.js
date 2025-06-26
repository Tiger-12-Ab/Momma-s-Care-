import React from "react";

const DownloadApp = () => {
  return (
    <section className="bg-ivory py-16 px-6">
     <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="flex-1">
          <h2 className="text-pink text-4xl font-bold mb-4">
            Coming Soon: Momma’s Care Mobile App
          </h2>
          <p className="text-charcoal text-lg mb-6">
            Stay connected and track your pregnancy and baby care anytime, anywhere.
          </p>

          <ul className="list-disc list-inside text-charcoal space-y-2 mb-6 marker:text-darkpink">
            <li>Stay connected with your pregnancy and baby’s milestones anytime.</li>
            <li>Receive gentle reminders tailored to your unique motherhood journey.</li>
            <li>Access nutrition tips and care advice designed just for you and your little one.</li>
          </ul>

          <a
            href="https://play.google.com/store/apps" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-pink text-ivory px-8 py-3 rounded-lg hover:bg-darkpink transition"
          >
            Download on Play Store
          </a>
        </div>

        {/* Image */}
        <div className="flex-1 max-w-full">
          <img
            src="/Mobile.png"
            alt="Momma's Care Mobile App Preview"
            className="w-full rounded-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
