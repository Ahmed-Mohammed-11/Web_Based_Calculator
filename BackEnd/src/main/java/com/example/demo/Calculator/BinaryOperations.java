package com.example.demo.Calculator;

public class BinaryOperations {
    public static String add(double operand1, double operand2){
        String result = Double.toString(operand1 + operand2);
        return result;
    }
    public static String subtract(double operand1, double operand2){
        String result = Double.toString(operand1 - operand2);
        return result;
    }
    public static String multiply(double operand1, double operand2){
        String result = Double.toString(operand1 * operand2);
        return result;
    }
    public static String divide(double operand1, double operand2){
        if(operand2 == 0.0){
            return "E";
        }else{
            String result = Double.toString(operand1 / operand2);
            return result;
        }
    }
}
