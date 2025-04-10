package ee.example.kymnevoistlus.repository;

import ee.example.kymnevoistlus.entity.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonRepository extends JpaRepository<Person, Long> {
    @Query("SELECT DISTINCT p.country FROM Person p ORDER BY p.country")
    List<String> findDistinctCountries();

    Page<Person> findByCountry(String country, Pageable pageable);
}
