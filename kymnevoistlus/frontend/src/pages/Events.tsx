import { useState, useEffect } from "react";
import { Event } from "../models/Event";

function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    
    useEffect(() =>{  
        fetch("http://localhost:8080/events") 
        .then (res => res.json()) 
        .then (json => setEvents(json))
    },[]);
    return (
    <div>
        <h1>Võistlused</h1>
        <table style={{ width: "100%", border: "1px solid black" }}>
                <tr style={{ border: "1px solid black" }}>
                    <th>Person ID</th>
                    <th>Result</th>
                </tr>
                {events.map(event =>
                <tr key={event.id}>
                    <td>{event.person.id}</td>
                    <td>{event.result}</td>
                </tr>
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