import './App.css';
import React,{useState} from 'react';
import {Routes,Route} from 'react-router-dom';
import AddPerson from './components/Pages/AddPerson/AddPerson';
import ShowPersons from './components/Pages/ShowPerson/ShowPersons';
import LoggedInNavbar from './components/UI/LogedInNavbar/LoggedInNavbar';
import LogInPage from './components/Pages/LogInPage/LogInPage';

const admin={email:"admin@namasys.co",password:"admin123"}


function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  
  const setStatus = (status) =>{
    setIsLoggedIn(status);
  }

  return (
    <div className="App">
      {!isLoggedIn && <LogInPage admin={admin} getStatus={setStatus} />}
     {isLoggedIn && <LoggedInNavbar/>}
      {isLoggedIn && <Routes>
        <Route path="/" element={<AddPerson/>}/>
        <Route path="/show-persons" element={<ShowPersons/>}/>
      </Routes>}
    </div>
  );
}

export default App;
