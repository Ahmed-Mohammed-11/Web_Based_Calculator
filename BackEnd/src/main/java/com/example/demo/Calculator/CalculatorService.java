package com.example.demo.Calculator;

import org.springframework.stereotype.Service;

@Service
public class CalculatorService {
    public String result(String firstOperand, String operation, String secondOperand) {
        if(secondOperand == ""){
            return  firstOperand;
        } else if (firstOperand == "") {
            return secondOperand;
        }
        double firstOp = Double.parseDouble(firstOperand);
        double secondOp = Double.parseDouble(secondOperand);
        switch (operation){
            case "+":return BinaryOperations.add(firstOp, secondOp);
            case "−":return BinaryOperations.subtract(firstOp, secondOp);
            case "×":return BinaryOperations.multiply(firstOp, secondOp);
            case "÷":return BinaryOperations.divide(firstOp, secondOp);
        }
        return null;
    }
    public String result(String operand, String operation) {
        double op = Double.parseDouble(operand);

        switch (operation){
            case "percent":return UnaryOperations.percent(op);
            case "inverse":return UnaryOperations.inverse(op);
            case "square":return UnaryOperations.square(op);
            case "squareRoot":return UnaryOperations.sqrt(op);
        }
        return null;
    }
}
