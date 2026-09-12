package com.example.demo;

public class HelloResponse {
    private String message;
    private String name;
    public HelloResponse(String message, String name) {
        this.message = message;
        this.name = name;
    }
    public String getMessage() {
        return message;
    }
    public String getName() {
        return name;
    }
}
