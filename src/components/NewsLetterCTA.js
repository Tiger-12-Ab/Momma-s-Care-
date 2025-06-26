import React, { useState } from "react";

const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); 
  const [showModal, setShowModal] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const res = await fetch("https://momma-s-care.onrender.com/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setShowModal(true);
        setEmail("");
      } else {
        setStatus("Subscription failed. Please try again.");
      }
    } catch (error) {
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <section className="bg-ivory py-16 px-6 text-center relative">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-pink mb-3">
          Stay Connected with Momma’s Care
        </h2>
        <p className="text-charcoal mb-6">
          Get weekly pregnancy tips, care reminders, and mom-to-mom wisdom
          straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-lightgray text-charcoal focus:outline-none focus:ring-2 focus:ring-pink"
          />
          <button
            type="submit"
            className="bg-pink text-ivory px-6 py-3 rounded-lg hover:bg-darkpink transition"
          >
            Subscribe
          </button>
        </form>

        {status && (
          <p
            className={`mt-4 ${
              status.includes("Thank") ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl max-w-sm">
            <h3 className="text-xl font-semibold text-pink mb-2">🎉 Subscribed!</h3>
            <p className="text-charcoal mb-4">
              Thank you for joining the Momma’s Care family. We'll keep you posted with helpful updates!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-2 bg-pink text-ivory px-6 py-2 rounded-lg hover:bg-darkpink transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsletterCTA;
