package ee.example.kymnevoistlus.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String country;
    private int age;

    private Double totalResult; 

    // Funktsioon, mis arvutab inimese kogupunktid kГµikidest vГµistlustest.
    public void updateTotalResult(List<Event> events) { //data from events on nimekiri vГµistlustest, kus inimene osales.
        this.totalResult = events.stream() //VГµtab kГµik inimese vГµistlused
        .mapToDouble(Event::getResult) //iga resuldi arvuks muutmine
        .sum(); //resultide summerimine
    }
}