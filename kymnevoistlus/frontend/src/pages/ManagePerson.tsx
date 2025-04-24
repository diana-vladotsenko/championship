import { useEffect, useRef, useState } from "react";
import { Person } from "../models/Person";
import { ToastContainer, toast } from 'react-toastify';

function ManagePerson() {

  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/persons")
      .then(res => res.json())
      .then(json => setPersons(json));
  }, []);



  const deletePerson = (id: number) => {
    fetch(`http://localhost:8080/persons/${id}`, {
      method: "DELETE",
    }).then(res => res.json())
      .then(json => {
        if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
          toast.success("Athlete deleted!");
          fetch("http://localhost:8080/persons")
            .then(res => res.json())
            .then(data => setPersons(data));
        } else {
          toast.error(json.message);
        }
      });
  };


  const nameRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLInputElement>(null);

  const addPerson = () => {
    const newPerson = {
      name: nameRef.current?.value,
      country: countryRef.current?.value,
      age: Number(ageRef.current?.value),
      totalResult: Number(resultRef.current?.value)
    };

    fetch("http://localhost:8080/persons", {
      method: "POST",
      body: JSON.stringify(newPerson),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(json => {
        if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
          toast.success("Athlete added successfully!");
          fetch("http://localhost:8080/persons")
            .then(res => res.json())
            .then(data => setPersons(data));

          if (nameRef.current && countryRef.current && ageRef.current && resultRef.current) {
            nameRef.current.value = "";
            countryRef.current.value = "";
            ageRef.current.value = "";
            resultRef.current.value = "";
          }
        } else {
          toast.error(json.message);
        }
      });
  };


  return (

    <div>
      <h2>Add Athlete</h2>
      <label>Name</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Country</label> <br />
      <input ref={countryRef} type="text" /> <br />
      <label>Age</label> <br />
      <input ref={ageRef} type="number" /> <br />
      <label>Result</label> <br />
      <input ref={resultRef} type="number" /> <br />
      <button onClick={() => addPerson()} style={{ marginTop: "20px" }}>Add</button>
      
      
      <table style={{ width: "800px", border: "1px solid black", marginTop: "60px" }}>
        <thead style={{ border: "1px solid black" }}>
          <   tr>
            <th>ID</th>
            <th>Name</th>
            <th>Country</th>
            <th>Age</th>
            <th>TotalResult</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {persons.map(person => (
            <tr key={person.id}>
              <td>{person?.id}</td>
              <td>{person.name}</td>
              <td>{person.country}</td>
              <td>{person.age}</td>
              <td>{person.totalResult}</td>
              <td>
                <button onClick={() => deletePerson(person.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default ManagePerson