import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircleQuestion } from "lucide-react";

const FloatingQAButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/questions")}
      className="fixed bottom-6 right-6 z-50 bg-pink hover:bg-darkpink text-ivory p-4 rounded-full shadow-lg flex items-center justify-center"
    >
      <MessageCircleQuestion className="w-6 h-6" />
    </button>
  );
};

export default FloatingQAButton;
