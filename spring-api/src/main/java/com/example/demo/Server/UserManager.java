package com.example.demo.Server;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.lang.StringBuilder;

@Service
public class UserManager {
    Map<String, User> userMap;

    public UserManager(){
        this.userMap = new HashMap<>();
        String pwd = "8151a8531863a41640ca690aef8b89ef0f9a320bcd56dd97e2181a87cdccc66c";//테스트용 kyumin-2005
        this.userMap.put("25-76047098", new User("25-76047098","도래미",pwd,"abc","bcd","2005-12-03")); //테스트용
    }

    public UserResponse Login(String serviceNumber, String pwd) {
        User u = this.userMap.get(serviceNumber);
        if(u!=null){
            try{
                if(u.getPwd().equals(hashPwd(pwd))){
                    //로그인 성공
                    //return login successed.
                    return new UserResponse(ResultCodes.SUCCESS, u, "로그인 성공");
                }
                else{
                    System.out.println(u.getPwd());
                    System.out.println(hashPwd(pwd));
                    //비번 틀림
                    //return unvalid password.
                    return new UserResponse(ResultCodes.UNVALID_PWD, u, "비밀번호가 틀렸습니다.");
                }
            } catch(NoSuchAlgorithmException e){
                return new UserResponse(ResultCodes.UNPREDICTED_ERROR, u, "예기치 못한 오류 발생");
            }

        }else{
            //해당 군번 존재 X
            //service number doesn't exsist.
            return new UserResponse(ResultCodes.USER_NOT_FOUND, u, "해당 군번이 존재하지 않습니다.");
        }
    }

    public UserResponse SignUp(String name, String unHashedPwd, String dateOfBirth, String branch, String rank){
        try {
            String serviceNumber=generateServiceNumber();
            User u = new User(serviceNumber, name, hashPwd(unHashedPwd),branch,rank, dateOfBirth);
            this.userMap.put(serviceNumber, u);
            return new UserResponse(ResultCodes.SUCCESS, u, "회원가입 성공");
        } catch (Exception e) {
            e.printStackTrace();
            return new UserResponse(ResultCodes.UNPREDICTED_ERROR, new User(), "예기치 못한 오류 발생");
        }
    }

    private String hashPwd(String unHashedPwd) throws NoSuchAlgorithmException {
        String HashedPwd = "";
    
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] hashedByte = md.digest(unHashedPwd.getBytes(StandardCharsets.UTF_8));
        StringBuilder sb = new StringBuilder();
        for(byte b:hashedByte){
            sb.append(String.format("%02x",b));
        }
        HashedPwd = sb.toString();
    
        return HashedPwd;
    }

    private String generateServiceNumber(){ //군번 생성기 - AA-BBBBBBBB AA : 년도 뒷 두자리, BBBBBBBB : 등록 순서 
        return "";
        
    }

}
