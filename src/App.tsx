// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Publisher from "./pages/Publisher";
import Home from "./pages/Home";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/publisher" element={<Publisher />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
