package com.example.demo.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Server.User;
import com.example.demo.Server.UserManager;
import com.example.demo.Server.UserResponse;
import com.example.demo.Server.ResultCodes;

@CrossOrigin(origins = "https://miniature-space-engine-9wwjw6pq7jvc9v9v-5173.app.github.dev")
@RestController
@RequestMapping("/api")
public class Controller {
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest request){
        // {
        //     군번,
        //     비번
        // }
        System.out.println("응답이 왔떠염!");

        UserResponse ur = new UserManager().Login(request.getServiceNumber(), request.getPassword());
        ResultCodes rc = ur.getResultCodes();
        User u = ur.getUser();
        String m = ur.getMessage();
        if(rc == ResultCodes.SUCCESS){
            System.out.println(m);
            System.out.println(u.getServiceNumber()+u.getPwd());
            return ResponseEntity.ok(u);
        }
        else{
            System.out.println(m);
            return ResponseEntity.status(500).body(m);
        }
        
    }
    @PostMapping("/auth/logout")
    public String logout(){
        return "ok";
    }
    @PostMapping("/users")
    public UserLoginRequest SignUp(){
        return new UserLoginRequest();
    }
}
