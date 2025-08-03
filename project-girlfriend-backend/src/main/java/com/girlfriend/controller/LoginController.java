package com.girlfriend.controller;

import com.girlfriend.entity.LoginEntity;
import com.girlfriend.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class LoginController {


    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/login")
    public ResponseEntity<String>login(@RequestBody LoginEntity loginData) {

   Optional<LoginEntity>userOpt=loginRepository.findByUsername(loginData.getUsername());
   if(userOpt.isEmpty()){
       return ResponseEntity.status(401).body("Girlfriend ka naam bhul gaya?");
   }
   LoginEntity user=userOpt.get();

   if(!loginData.getPassword().equalsIgnoreCase(user.getPassword())){
//       System.out.println("password->"+loginData.getPassword());
//       System.out.println("Entered passowrd->"+user.getPassword());
       return ResponseEntity.status(401).body("Wrong password baby!!");
   }
   return ResponseEntity.status(200).body("Login successful");

    }
}
