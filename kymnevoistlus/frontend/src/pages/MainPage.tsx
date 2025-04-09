import { useEffect, useState } from 'react'
import { Person } from '../models/Person';
import { Event } from '../models/Event';

function MainPage(){
    const [person, setPersons] = useState<Person[]>([]);
      const [event, setEvents] = useState<Event[]>([]);
      useEffect(() =>{  
        fetch("http://localhost:8080/persons") 
        .then (res => res.json()) 
        .then (json => setPersons(json))
      },[]);
      useEffect(() =>{  
        fetch("http://localhost:8080/events") 
        .then (res => res.json()) 
        .then (json => setEvents(json))
      },[]);

    
    return(
        <div>Main Page</div>
    )
}

export default MainPage;