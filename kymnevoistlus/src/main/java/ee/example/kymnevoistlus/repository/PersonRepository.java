package ee.example.kymnevoistlus.repository;

import ee.example.kymnevoistlus.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
}