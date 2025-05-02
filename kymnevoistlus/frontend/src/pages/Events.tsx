import { useState, useEffect } from "react";
import { Event } from "../models/Event";

function Events() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/events")
            .then(res => res.json())
            .then(json => setEvents(json));
    }, []);

    const uniqueEvents = Array.from(
        new Map(events.map(event => [event.person.id, event])).values()
    );

    return (
        <div>
            <h1>Competition Events</h1>
            <table style={{ width: "800px", border: "1px solid black", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ border: "1px solid black" }}>
                        <th>ID</th>
                        <th>Person ID</th>
                        <th>Name</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {uniqueEvents.map(event => (
                        <tr key={event.id}>
                            <td>{event.id}</td>
                            <td>{event.person.id}</td>
                            <td>{event.person.name}</td>
                            <td>{event.result}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Events;
