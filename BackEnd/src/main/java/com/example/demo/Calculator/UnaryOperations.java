package com.example.demo.Calculator;
import java.util.*;
import java.lang.Math;
public class UnaryOperations {
    public static String percent(double op) {
        String result = Double.toString(op / 100);
        return result;
    }

    public static String inverse(double op) {
        if (op == 0.0){
            return "E";
        }
        String result = Double.toString(1 / op);
        return result;
    }

    public static String square(double op) {
        String result = Double.toString( op * op);
        return result;
    }

    public static String sqrt(double op) {
        if(op < 0.0){
            return "E";
        }
        String result = Double.toString(Math.sqrt(op));
        return result;
    }
}
