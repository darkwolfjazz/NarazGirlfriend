package com.girlfriend.controller;

import com.girlfriend.entity.ComplimentEntity;
import com.girlfriend.service.ComplimentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class ComplimentController {

@Autowired
private ComplimentService complimentService;

@PostMapping("/compliment")
public ResponseEntity<ComplimentEntity>generateCompliment(@RequestBody Map<String, String> payload){
    String word=payload.get("word");
    if(word==null || word.trim().isEmpty()){
        return ResponseEntity.badRequest().build();
    }

    ComplimentEntity response=complimentService.generateCompliment(word.trim());
    return ResponseEntity.ok(response);

}

}
