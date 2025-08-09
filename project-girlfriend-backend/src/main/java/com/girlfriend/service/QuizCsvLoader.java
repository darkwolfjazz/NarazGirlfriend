package com.girlfriend.service;

import com.girlfriend.entity.QuizEntity;
import com.girlfriend.repository.QuizRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

@Service
public class QuizCsvLoader {

 @Autowired
 private QuizRepository quizRepository;

@PostConstruct
public void quizLoadData(){

 try{
  if(quizRepository.count()>0){
   return;
  }
  InputStream inputStream=getClass().getResourceAsStream("/quiz.csv");
  BufferedReader reader=new BufferedReader(new InputStreamReader(inputStream));
  String line;
  boolean firstLine=true;
  while((line= reader.readLine())!=null){
   if(firstLine){
    firstLine=false;
    continue;
   }
   if(line.trim().isEmpty()){
    continue;
   }
   String[] fields=line.split(",",-1);
   if (fields.length < 6) {
    System.err.println("Skipping invalid line: " + line);
    continue;
   }

   String question=fields[0];
   if(quizRepository.findByQuestion(question).isPresent()){
    continue; //skip if already exists
   }
   QuizEntity quiz=new QuizEntity();
   quiz.setQuestion(question);
   quiz.setOptionA(fields[1]);
   quiz.setOptionB(fields[2]);
   quiz.setOptionC(fields[3]);
   quiz.setOptionD(fields[4]);
   quiz.setCorrectAnswer(fields[5]);
   quizRepository.save(quiz);
  }
  reader.close();
 } catch (IOException e) {
     throw new RuntimeException(e);
 }
}
}
