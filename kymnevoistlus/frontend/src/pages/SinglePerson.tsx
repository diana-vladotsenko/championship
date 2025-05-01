import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Person } from "../models/Person";

function SinglePerson() {
    const { personId } = useParams();
    const [person, setPeople] = useState<Person>();

    useEffect(() => {
        fetch("http://localhost:8080/persons/" + personId)
            .then(res => res.json())
            .then(json => setPeople(json));
        //kui muutub id, nt minnakse teisele id-le, siis saadetakse see paring uuesti
    }, [personId]);

    return (
        <div style={{
            maxWidth: "600px",
            margin: "50px auto",
            padding: "30px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f9f9f9"
        }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>{person?.name} Profile</h2>
            <div><strong>Name:</strong> {person?.name}</div>
            <div><strong>Country:</strong> {person?.country}</div>
            <div><strong>Age:</strong> {person?.age}</div>
            <div><strong>Total Result:</strong> {person?.totalResult}</div>
        </div>
    );
}

export default SinglePerson;
