import { useState, useEffect } from "react";
import { Event } from "../models/Event";

function Events() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/events")
            .then(res => res.json())
            .then(json => {
                setEvents(json)
            })

    }, []);
    return (
        <div>
            <h1>Competition Events</h1>
            <table style={{ width: "800px", border: "1px solid black" }}>
                <tr style={{ border: "1px solid black" }}>
                    <th>ID</th>
                    <th>Person ID</th>
                    <th>Name</th>
                    <th>Result</th>
                </tr>
                {events.map(event =>
                    <tbody key={event.id}>
                        <td>{event.id}</td>
                        <td>{event.person.id}</td>
                        <td>{event.person.name}</td>

                        <td>{event.result}</td>
                    </tbody>
                )}
            </table>
            {/* {events.map(event => 
        <div key={event.id}>
          <div>Person ID: {event.person.id}</div>
          <div>Result:  {event.result}</div>
          ------------------------------
        </div>)}  */}
        </div>
    )
}

export default Events;