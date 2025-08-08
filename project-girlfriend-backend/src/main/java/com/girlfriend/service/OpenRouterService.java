package com.girlfriend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class OpenRouterService {


    @Value("${openrouter.api.key}")
    private String apiKey;
    @Value("${openrouter.model}")
    private String model;

    @Value("${openrouter.url}")
    private String apiUrl;

    private final RestTemplate restTemplate=new RestTemplate();

    public String getFlirtyCompliment(String word){

        HttpHeaders headers=new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        Map<String,Object>message=Map.of(
                "role","user",
                "content", "Give me a short, flirty and creative pickup line. It must include the word '" + word + "' and should start with: Hey girl!!"
        );

      Map<String,Object>requestBody = Map.of(
              "model", model,
              "messages", List.of(message)
      );

        HttpEntity<Map<String,Object>>request=new HttpEntity<>(requestBody,headers);
        try{
            ResponseEntity<Map>response=restTemplate.postForEntity(apiUrl,request, Map.class);
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
            Map<String, Object> messageObj = (Map<String, Object>) choices.get(0).get("message");
            return (String) messageObj.get("content");
        }catch (Exception e){
            e.printStackTrace();
            return "Oops! Couldn't generate a compliment. Try again later.";
        }

    }


}
