import './App.css';
import React,{useState,useEffect,useCallback} from 'react';
import {Routes,Route} from 'react-router-dom';
import AddPerson from './components/Pages/AddPerson/AddPerson';
import ShowPersons from './components/Pages/ShowPerson/ShowPersons';
import LoggedInNavbar from './components/UI/LogedInNavbar/LoggedInNavbar';
import LogInPage from './components/Pages/LogInPage/LogInPage';
import LoggedOutNavbar from './components/UI/LogedOutNavbar/LoggedOutNavbar';

// const admin={email:"admin@namasys.co",password:"admin123"}

let logoutTimer;

function App() {
  const [token,setToken] = useState();
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [admin,setAdmin] = useState({});
  const [expirationDate, setExpirationDate] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();


//

  useEffect(()=>{
    const storedToken = JSON.parse(localStorage.getItem('token'));
    if(storedToken && storedToken.token && new Date(storedToken.expiration)>new Date() ){
      setIsLoggedIn(true);
      setExpirationDate(new Date(storedToken.expiration));
       setTokenExpirationDate(storedToken.expiration);
    }
  },[]);

  const getAdmin = async() =>{
    try{
      const res = await fetch('https://companyassignments.herokuapp.com/admin/',);
      const data = await res.json();
      // console.log(data);
      setAdmin(data.admin[0]);
      setToken(data.token);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{getAdmin()},[]);

  const setStatus = (status) =>{
    setIsLoggedIn(status);
  }
  const logOutHandler=useCallback(()=>{
    localStorage.removeItem('token');
    console.log('logout');
    setIsLoggedIn(false);
  },[]);

  useEffect(()=>{
    if(token && expirationDate){
      const remainingTime = expirationDate.getTime() - new Date().getTime();
      console.log(logoutTimer);
      logoutTimer = setTimeout(logOutHandler,remainingTime );
    }else{
      clearTimeout(logoutTimer);
    }
  },[token,logOutHandler,expirationDate]);
  


  return (
    <div className="App">
      {!isLoggedIn && <LoggedOutNavbar/>}
      {!isLoggedIn && <LogInPage admin={admin} token={token} expire={tokenExpirationDate} getStatus={setStatus} />}
     {isLoggedIn && <LoggedInNavbar logOut={logOutHandler} />}
      {isLoggedIn && <Routes>
        <Route path="/" element={<AddPerson />}/>
        <Route path="/show-persons" element={<ShowPersons/>}/>
      </Routes>}
    </div>
  );
}

export default App;
