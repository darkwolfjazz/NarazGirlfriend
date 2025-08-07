package com.girlfriend.controller;

import com.girlfriend.entity.MoodFixerEntity;
import com.girlfriend.service.MoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mood")
@CrossOrigin("*")
public class MoodController {

@Autowired
    private MoodService moodService;

@PostMapping("/fix")
public ResponseEntity<String>fixMoodController(@RequestBody MoodFixerEntity moodRequest){
   try {
       String moodResponse = moodService.fixMood(moodRequest.getMood()
               , moodRequest.getReason(), moodRequest.getLuckyNumber());
       return ResponseEntity.status(200).body(moodResponse);
   } catch (Exception e) {
       throw new RuntimeException("Something wrong occured");
   }
}

}
