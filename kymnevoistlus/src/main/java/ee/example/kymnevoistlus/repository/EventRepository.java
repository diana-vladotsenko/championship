package ee.example.kymnevoistlus.repository;

import ee.example.kymnevoistlus.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByPersonId(Long personId);

    void deleteByPersonId(Long id);
}