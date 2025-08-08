package com.girlfriend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "compliment_table")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ComplimentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String word;

    private String generatedCompliment;

    private LocalDateTime timeStamp;
}
