import React, { useState, useEffect } from "react";
import "./ShowPersons.css";
import deleteLogo from "../../../image/delete (1).png";
import { useNavigate } from "react-router-dom";

const ShowPersons = () => {
  const [persons, setPersons] = useState([]);
  const navigate = useNavigate();

  const getAllData = async () => {
    try {
      const res = await fetch("https://companyassignments.herokuapp.com/persons", {
        method: "GET",
        headers: {
          "Content-Type": "application",
        },
      });
      const data = await res.json();
      console.log(data.message);
      setPersons(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async(id) =>{
      try{
        const res = await fetch(`https://companyassignments.herokuapp.com/persons/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        });
        // const data = await res.json();
        //getAllData();
        navigate('/')
      }catch(err){
          console.log(err);
      }
  }

  useEffect(() => {
    getAllData();
    
  }, []);

  return (
    <div className="show-person-body">
      <div className="show-person-container">
          {persons.length===0 && <p>No person data stored</p>}
        {persons.length>0 && <table>
          <tr id="header">
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone number</th>
            <th style={{
                    // display: "flex",
                    
                    // justifyContent: "center",
                  }}>Delete</th>
          </tr>
          {persons.length>0 && persons.map((person) => {
            return (
              <tr>
                <td>{person.username}</td>
                <td>{person.email}</td>
                <td>{person.address}</td>
                <td>{person.mobile}</td>
                <td
                  onClick={()=>deleteHandler(person._id)}
                  className="delete"
                  style={{
                    // display: "flex",
                    
                    // justifyContent: "center",
                  }}
                >
                  <img
                    style={{ width: "30px" }}
                    src={deleteLogo}
                    alt={"delete"}
                  />
                </td>
              </tr>
            );
          })}
        </table>}
      </div>
    </div>
  );
};

export default ShowPersons;
