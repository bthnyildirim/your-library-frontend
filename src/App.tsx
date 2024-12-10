// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Publisher from "./pages/Publisher";
import Visitor from "./pages/Visitor";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publisher" element={<Publisher />} />
        <Route path="/visitor" element={<Visitor />} />
      </Routes>
    </Router>
  );
};

export default App;
