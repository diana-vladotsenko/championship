package ee.example.kymnevoistlus.repository;

import ee.example.kymnevoistlus.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}