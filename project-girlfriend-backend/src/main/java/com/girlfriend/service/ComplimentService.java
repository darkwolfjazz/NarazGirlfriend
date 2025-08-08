package com.girlfriend.service;

import com.girlfriend.entity.ComplimentEntity;
import com.girlfriend.repository.ComplimentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ComplimentService {

@Autowired
private OpenRouterService openRouterService;

@Autowired
private ComplimentRepository complimentRepository;

public ComplimentEntity generateCompliment(String word){
    String compliment =openRouterService.getFlirtyCompliment(word);
    ComplimentEntity entity=new ComplimentEntity();
    entity.setWord(word);
    entity.setGeneratedCompliment(compliment);
    entity.setTimeStamp(LocalDateTime.now());
    return complimentRepository.save(entity);
}



}
