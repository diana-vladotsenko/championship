import './App.css';
import MainPage from './pages/MainPage';
import { Route, Routes } from 'react-router-dom'
import People from './pages/People';
import Events from './pages/Events';
import Menu from './components/Menu';
import AddPerson from './pages/ManagePerson';


function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/people" element={<People />} />
        <Route path="/events" element={<Events />} />
        <Route path="/addPerson" element={<AddPerson />} />
        <Route path="/*" element={<div>Page Not Found</div>} />
      </Routes>
    </>
  )
}

export default App
