package com.girlfriend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "moodTable")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MoodFixerEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String mood;
    @Column(length = 1000)
    private String reason;
    private int luckyNumber;
    private LocalDateTime timestamp;

}
