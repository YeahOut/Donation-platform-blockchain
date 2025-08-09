import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';

import Login from './pages/Login';
import Points from './pages/Points';
import DonatePoints from './pages/DonatePoints';
import ConvertPoints from './pages/ConvertPoints';
import DonateSuccess from './pages/DonateSuccess';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-[#111]">
        <main className="mx-auto max-w-screen-sm px-4 py-6">
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/points" element={<Points/>} />
            <Route path="/donate" element={<DonatePoints/>} />
            <Route path="/convert" element={<ConvertPoints/>} />
            <Route path="/donate/success" element={<DonateSuccess/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App
