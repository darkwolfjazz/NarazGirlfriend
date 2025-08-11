package com.girlfriend.service;

import com.girlfriend.entity.MoodFixerEntity;
import com.girlfriend.repository.MoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class MoodService {

@Autowired
private MoodRepository moodRepository;

@Autowired
private JavaMailSender mailSender;

@Value("${user.mail}")
private String userMail;



public String fixMood(String mood,String reason,int number){
    MoodFixerEntity userMood=new MoodFixerEntity();
    userMood.setMood(mood);
    userMood.setReason(reason);
    userMood.setLuckyNumber(number);
    userMood.setTimestamp(LocalDateTime.now());
    moodRepository.save(userMood);

    if(number%2==0){
        //return "video:https://www.youtube.com/watch?v=XkUSQ-be8w4";
        List<String>videoList=List.of(
            "video:https://www.youtube.com/watch?v=DjocrCuXN-w",
            "video:https://www.youtube.com/watch?v=7FDAJ8L3lig",
             "video:https://www.youtube.com/watch?v=1sCuNB2ajtQ",
                "video:https://www.youtube.com/watch?v=N5QgxryUBzo"
        );
        String selectedVideo=videoList.get(new Random().nextInt(videoList.size()));
        return selectedVideo;
    }else{
        List<String>couponList=List.of("TRYNEW","WELCOME50","AXIS200","SWGLOVE20","FOODIE100","CUTIECAFE50");
        String selectedCoupon =couponList.get(new Random().nextInt(couponList.size()));
        System.out.println("Selected coupon->"+ selectedCoupon);
        SimpleMailMessage mailMessage=new SimpleMailMessage();
        mailMessage.setTo(userMail);
        mailMessage.setSubject("Hey Love ❤\uFE0F Your Special Food Coupon is Here!");
        mailMessage.setText("Hey love, Just wanted to send you a small treat today. Your special coupon code is:" +" " + selectedCoupon + "  " +  "Enjoy something tasty and think of me while you do");
        mailSender.send(mailMessage);
        return "Mail sent!!";
    }
}


}
