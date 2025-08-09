package com.girlfriend.controller;

import com.girlfriend.entity.QuizEntity;
import com.girlfriend.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class QuizController {


    @Autowired
    private QuizRepository quizRepository;

    @GetMapping("/allQuiz")
    public List<QuizEntity>getAllQuiz(){
        return quizRepository.findAll();
    }

        @GetMapping("/getRandomQuiz")
    public QuizEntity getRandomQuiz(){
       long count=quizRepository.count();
       if(count==0) return null;
       long randomId=(long)(Math.random()*count)+1;
       return quizRepository.findById(randomId).orElse(null);
    }

    @PostMapping("/checkScore")
    public int checkAnswer(@RequestParam Long quizId,@RequestParam String userAnswer){
        QuizEntity quiz=quizRepository.findById(quizId).orElse(null);
        int score=0;
        if(quiz==null){
            return 0;
        }
        if(quiz.getCorrectAnswer().equalsIgnoreCase(userAnswer)){
            score+=4;
        }else{
            score=score-1;
        }
        return score;
    }
}
