import './App.css';
import {Routes,Route} from 'react-router-dom';
import AddPerson from './components/Pages/AddPerson/AddPerson';
import ShowPersons from './components/Pages/ShowPerson/ShowPersons';
import LoggedInNavbar from './components/UI/LogedInNavbar/LoggedInNavbar';

function App() {
  return (
    <div className="App">
      <LoggedInNavbar/>
      <Routes>
        <Route path="/" element={<AddPerson/>}/>
        <Route path="/show-persons" element={<ShowPersons/>}/>
      </Routes>
    </div>
  );
}

export default App;
