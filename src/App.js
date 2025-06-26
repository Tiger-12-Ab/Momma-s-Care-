import {  Routes, Route } from "react-router-dom";
//importing components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import QADashboard from './components/QADashboard';
import QuestionDetail from './components/QuestionDetail';
import FloatingQAButton from "./components/FloatingQAButton";

//importing pages------
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PregnancyTracker from "./pages/PregnancyTracker";
import NewbornTracker from "./pages/NewbornTracker";
import Nutrition from "./pages/Nutrition";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/questions" element={<QADashboard />} />
        <Route path="/questions/:id" element={<QuestionDetail />} />
        
        <Route
          path="/pregnancy"
          element={
            <ProtectedRoute>
              <PregnancyTracker />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newborn"
          element={
            <ProtectedRoute>
              <NewbornTracker />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        
      </Routes>
      
      <FloatingQAButton />
      <Footer />
    </>
  );
}

export default App;
