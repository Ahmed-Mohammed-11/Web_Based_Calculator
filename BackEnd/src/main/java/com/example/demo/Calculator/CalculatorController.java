package com.example.demo.Calculator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RequestMapping
@RestController
public class CalculatorController {
    @Autowired
    private CalculatorService calculatorservice ;

    @GetMapping(value = "/firstoperand={firstOperand}/operation={operation}/secondoperand={secondOperand}")
    public String binaryOperations(@PathVariable ("firstOperand") String firstOperand, @PathVariable ("operation") String operation ,@PathVariable ("secondOperand") String secondOperand){
        return calculatorservice.result(firstOperand, operation, secondOperand);
    }

    @GetMapping(value = "operand={operand}/operation={operation}")
    public String unaryOperations(@PathVariable ("operand") String operand, @PathVariable ("operation") String operation){
        return calculatorservice.result(operand, operation);
    }


}
