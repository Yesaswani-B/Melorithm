import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import BestMatch from './pages/BestMatch';

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/best-match" element={<BestMatch />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  );
}
