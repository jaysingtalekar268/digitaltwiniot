import logo from './logo.svg';
import './App.css';
import Navbar_main from './component/navbar/navbar';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './component/home/home';
import Temperature from './component/temparature/temparature';
import Humidity from './component/humidity/humidity';
function App() {
  return (
    <BrowserRouter>
    <Navbar_main></Navbar_main>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/Temperature" element={<Temperature></Temperature>} />
        <Route path="/Humidity" element={<Humidity></Humidity>} />


      </Routes>
    </BrowserRouter>

  );
}

export default App;
