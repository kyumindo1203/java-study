package com.example.demo.Controller;


public class UserSignUpRequest {
    private String name;
    private String pwd;
    private String branch;
    private String rank;
    private String dateOfBirth;
    public UserSignUpRequest(String name, String pwd, String branch, String rank, String dateOfBirth){
        this.name = name;
        this.pwd = pwd;
        this.branch = branch;
        this.rank = rank;
        this.dateOfBirth = dateOfBirth;
    }

    public String getName(){
        return this.name;
    }

    public String getPwd(){
        return this.pwd;
    }

    public String getBranch(){
        return this.branch;
    }

    public String getRank(){
        return this.rank;
    }

    public String getDateOfBirth(){
        return this.dateOfBirth;
    }


}


