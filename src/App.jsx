import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar.jsx";

// Lazy Loading Pages
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const LocationPage = lazy(() => import("./pages/LocationPage.jsx"));
const EmergencyPage = lazy(() => import("./pages/EmergencyPage.jsx"));
const LanguagePage = lazy(() => import("./pages/LanguagePage.jsx"));
const Tourist = lazy(() => import("./pages/Tourist.jsx"));
const LifeTips = lazy(() => import("./pages/LifeTips.jsx"));
const DailyUse = lazy(() => import("./pages/DailyUse.jsx"));
const FoodPage = lazy(() => import("./pages/FoodPage.jsx"));
const CheckList = lazy(() => import("./pages/CheckList.jsx"));

function App() {
  return (
    <div className="App">
      {/* Pages Content Area */}
      <div className="content-area" style={{ paddingBottom: "80px" }}>
        
        {/* Suspense Loader */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/food" element={<FoodPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/language" element={<LanguagePage />} />
            <Route path="/tourist" element={<Tourist />} />
            <Route path="/tips" element={<LifeTips />} />
            <Route path="/checklist" element={<CheckList />} />
            <Route path="/daily-use" element={<DailyUse />} />
          </Routes>
        </Suspense>
      </div>

      {/* Navbar always at bottom */}
      <Navbar />
    </div>
  );
}

export default App;