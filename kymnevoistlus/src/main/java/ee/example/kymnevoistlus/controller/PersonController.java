package ee.example.kymnevoistlus.controller;

import ee.example.kymnevoistlus.entity.Person;
import ee.example.kymnevoistlus.repository.PersonRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/persons")
public class PersonController {
    @Autowired
    PersonRepository personRepository;

    @GetMapping
    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }

    @PostMapping
    public Person addPerson(@RequestBody Person person) {
        person.setTotalResult(0.0); // Setting it to 0.00 when prevent it to be NULL 
        return personRepository.save(person);
    }

    @GetMapping("/{id}")
    public Person getPersonById(@PathVariable Long id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ERROR_PERSON_IS_NOT_FOUND"));
    }

    @DeleteMapping("/{id}")
    public List<Person> deletePersonById(@PathVariable Long id) {
        if (!personRepository.existsById(id)) {
            throw new RuntimeException("ERROR_PERSON_IS_NOT_FOUND");
        } else {
            personRepository.deleteById(id);
            return personRepository.findAll();
        }
    }

    @PutMapping("/{id}")
    public Person updatePerson(@PathVariable Long id, @RequestBody Person updatedPerson) {
        Person person = personRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("ERROR_PERSON_IS_NOT_FOUND"));
        if (updatedPerson.getName() != null) {
            throw new RuntimeException("ERROR_NAME_IS_MISSING");
        }
        if (updatedPerson.getCountry() != null) {
            throw new RuntimeException("ERROR_COUNTRY_IS_MISSING");
        }
        if (updatedPerson.getAge() < 18) {
            throw new RuntimeException("ERROR_AGE_IS_NOT_ALLOWED");
        }
        return personRepository.save(person);    
    }

    @PatchMapping("/{id}")
    public Person partialUpdatePerson(@PathVariable Long id, @RequestBody Person updatedPerson) {
        Person person = personRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("ERROR_PERSON_IS_NOT_FOUND"));
    
    if (updatedPerson.getName() != null) {
        person.setName(updatedPerson.getName());
    }
    if (updatedPerson.getCountry() != null) {
        person.setCountry(updatedPerson.getCountry());
    }
    if (updatedPerson.getAge() < 18) {
        throw new RuntimeException("ERROR_AGE_IS_NOT_ALLOWED");

    }
    
    //if in someway totalresult doesnt exist, then we will get this totalresult from person, that is defined as0.00
    if (updatedPerson.getTotalResult() == null) {
        person.setTotalResult(updatedPerson.getTotalResult());
    }

    return personRepository.save(person);
    }

    @GetMapping("/countries")
    public List<String> getAllCountries() {
        return personRepository.findDistinctCountries();
    }

    @GetMapping("/persons-countries")
    public Page<Person> findByCountry(@RequestParam String country, Pageable pageable) {
        if (country.equalsIgnoreCase("ALL")) {
            return personRepository.findAll(pageable);
        }
        return personRepository.findByCountry(country, pageable);
    }

}