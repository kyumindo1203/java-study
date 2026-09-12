package com.example.demo.Controller;

public class UserLoginRequest {
      private String serviceNumber;
      private String password;
      // private boolean remember; //여기 있는 게 맞나..?   
      public UserLoginRequest(String serviceNumber, String password){
        this.serviceNumber = serviceNumber;
        this.password = password;
        // this.remember = remember;
      }
      public UserLoginRequest(){
        
      }

      public String getServiceNumber(){
        return this.serviceNumber;
      }

      public String getPassword(){
        return this.password;
      }


}
