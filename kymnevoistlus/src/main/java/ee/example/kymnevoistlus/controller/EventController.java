package ee.example.kymnevoistlus.controller;

import ee.example.kymnevoistlus.entity.Event;
import ee.example.kymnevoistlus.entity.Person;
import ee.example.kymnevoistlus.repository.EventRepository;
import ee.example.kymnevoistlus.repository.PersonRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/events")
public class EventController {
    @Autowired
    EventRepository eventRepository;
    @Autowired
    PersonRepository personRepository;

    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
    return eventRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("ERROR_EVENT_IS_NOT_FOUND"));
}


    @PostMapping
    public Event submitEvent(@RequestBody Event event) {
        if (event == null || event.getPerson() == null || event.getPerson().getId() == null) {
            throw new RuntimeException("ERROR_EVENT_IS_MISSING");
        }
    

        //Kui pГ¤ring peaks tagastama ainult Гјhe tulemuse, kasutaksime Optional<Event>.
        //Kui tulemuseks on Гјks rida vГµi mitte midagi.
        // List<T>	Kui tulemuseks vГµib olla mitu rida (nt mitme sГјndmusega isik).
        Optional<Person> person = personRepository.findById(event.getPerson().getId()); //Kuna isik ei pruugi eksisteerida, tagastab findById(id) Optional<Person> objekti.
        if (person.isEmpty()) {
            throw new RuntimeException("ERROR_PERSON_IS_NOT_FOUND");
        }
        event.setPerson(person.get()); //seob sГјndmuse Гµigesse isikusse
        eventRepository.save(event); //salvestab sundmuse andmebaasi

        // Update totalResult in Person table
        List<Event> events = eventRepository.findByPersonId(person.get().getId());
        person.get().updateTotalResult(events); // arvutab uue Гјldtulemuse, vГµttes arvesse kГµiki sГјndmusi.
        personRepository.save(person.get()); //salvestab uuendatud isiku andmebaasi

        return event;
    }

    @DeleteMapping("/{id}")
    public List<Event> deletePersonById(@PathVariable Long id) {
        if (!eventRepository.existsById(id)) {
            throw new RuntimeException("ERROR_PERSON_IS_NOT_FOUND");
        } else {
            eventRepository.deleteById(id);
            return eventRepository.findAll();
        }
    }
}