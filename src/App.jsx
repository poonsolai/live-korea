import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage.jsx';
import LocationPage from './pages/LocationPage.jsx';
import EmergencyPage from './pages/EmergencyPage.jsx';
import LanguagePage from './pages/LanguagePage.jsx';
import Tourist from './pages/Tourist.jsx';
import LifeTips from './pages/LifeTips.jsx';
import DailyUse from './pages/DailyUse.jsx';
import Navbar from './components/Navbar.jsx';
import FoodPage from './pages/FoodPage.jsx';
import CheckList from './pages/CheckList.jsx';


function App() {
  return (
    <div className="App">
      {/* Pages Content Area */}
      <div className="content-area" style={{ paddingBottom: '80px' }}> 
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
      </div>

      {/* Navbar always at bottom */}
      <Navbar />
    </div>
  );
}

export default App;
