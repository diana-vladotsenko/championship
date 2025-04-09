package ee.example.kymnevoistlus.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double result;

    @ManyToOne
    @JoinColumn(name = "person_id")
    private Person person;
}
