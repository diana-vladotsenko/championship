import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Person } from "../models/Person";


function EditPerson() {
    const { personId } = useParams();
    const nameRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const resultRef = useRef<HTMLInputElement>(null);
    const [person, setPersons] = useState<Person>();
    const navigate = useNavigate();

    const editPerson = () => {
        const modifiedPerson = {
            name: nameRef.current?.value,
            country: countryRef.current?.value,
            age: Number(ageRef.current?.value),
            totalResult: Number(resultRef.current?.value)
        }
        fetch("http://localhost:8080/persons/" + personId,
            {
                method: "PUT",
                body: JSON.stringify(modifiedPerson),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(json => {
                if (json.message && json.timestamp && json.status) {
                    toast.error(json.message);
                } else {
                    navigate("/addPerson");
                }
            });
    };

    useEffect(() => {
        fetch("http://localhost:8080/persons/" + personId)
            .then(res => res.json())
            .then(json => setPersons(json))
    }, [personId]);

    if (person === undefined) {
        return <h3>This person is not defined!</h3>
    }

    return (
        <div>
            <h2>Edit Athlete #{personId}</h2>
            <label>Name</label> <br />
            <input ref={nameRef} type="text" defaultValue={person?.name} /> <br />
            <label>Country</label> <br />
            <input ref={countryRef} type="text" defaultValue={person?.country} /> <br />
            <label>Age</label> <br />
            <input ref={ageRef} type="number" defaultValue={person?.age} /> <br />
            <label>Result</label> <br />
            <input ref={resultRef} type="number" defaultValue={person?.totalResult} /> <br />
            <button onClick={() => editPerson()} style={{ marginTop: "20px" }}>Edit</button>
            <ToastContainer />
        </div>
    );
}

export default EditPerson;
