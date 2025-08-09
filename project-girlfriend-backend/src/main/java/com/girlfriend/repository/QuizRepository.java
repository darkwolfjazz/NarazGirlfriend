package com.girlfriend.repository;

import com.girlfriend.entity.QuizEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuizRepository extends JpaRepository<QuizEntity,Long> {


List<QuizEntity>findByCategory(String category);

Optional<QuizEntity>findByQuestion(String question);

}
