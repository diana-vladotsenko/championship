import { useState, useEffect } from "react";
import { Person } from "../models/Person";

function People() {
    const [person, setPersons] = useState<Person[]>([]);
    useEffect(() => {
        fetch("http://localhost:8080/persons")
            .then(res => res.json())
            .then(json => setPersons(json))
    }, []);

    return (

        <div>
            <h1>Sportlased ja nende tulemused tabelina</h1>

            <table style={{ width: "100%", border: "1px solid black" }}>
                <tr style={{ border: "1px solid black" }}>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Age</th>
                    <th>TotalResult</th>
                </tr>
                {person.map(person =>
                    <tr key={person.id}>
                        <td>{person.id}</td>
                        <td>{person.name}</td>
                        <td>{person.country}</td>
                        <td>{person.age}</td>
                        <td>{person.totalResult}</td>
                    </tr>
                )}
            </table>
        </div>
    )
}

export default People;