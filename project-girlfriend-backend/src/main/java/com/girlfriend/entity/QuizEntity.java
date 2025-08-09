package com.girlfriend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "quiz_table")
public class QuizEntity {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String question;

private String optionA;
private String optionB;
private String optionC;
private String optionD;
private String correctAnswer;
private String category;





}
