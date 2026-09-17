package com.example.demo.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Server.UserManager;
import com.example.demo.Server.UserResponse;
import com.example.demo.Server.ResultCodes;



@CrossOrigin(origins = "https://miniature-space-engine-9wwjw6pq7jvc9v9v-5173.app.github.dev")
@RestController
@RequestMapping("/api")
public class Controller {
    private final UserManager um;
    public Controller(UserManager um){
        this.um = um;
    }
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest request){
        // {
        //     군번,
        //     비번
        // }

        UserResponse ur = um.Login(request.getServiceNumber(), request.getPassword());
        ResultCodes rc = ur.getResultCodes();
        String m = ur.getMessage();
        if(rc == ResultCodes.SUCCESS){
            System.out.println(m);
            // System.out.println(u.getServiceNumber()+u.getPwd());
            return ResponseEntity.ok(ur);
        }
        else{
            System.out.println(m);
            return ResponseEntity.ok(ur);
        }
        
    }

    @PostMapping("/users") //signUp
    public ResponseEntity<?> SignUp(@RequestBody UserSignUpRequest request){
        UserResponse ur = um.SignUp(request.getName(), request.getPwd(), request.getDateOfBirth(), request.getBranch(), request.getRank());
        if(ur.getResultCodes() == ResultCodes.SUCCESS){
            return ResponseEntity.ok(ur);
        }else{
            return ResponseEntity.status(500).body(ur);
        }
    }
}
