import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Query from './pages/Query';
import Maps from './pages/Maps';
import MapView from './pages/MapView';
import './App.css';

const App = () => {
  return (
    <Router basename="/Cs2Utility">
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/query" element={<Query />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/map/:mapName" element={<MapView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 