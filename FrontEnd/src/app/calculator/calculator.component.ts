import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  screen: String = "0"; //content of current user input
  firstOperand: String = "0";
  secondOperand: String = "0";
  operation: String = "";
  unaryOperation: String = "";
  hist: String = ""; //operation History
  result: String = "";
  isError: boolean = false; //trigger error to disable some buttons if needed

  //instance from service to use later
  constructor(private calculatorService: CalculatorService) { }
  ngOnInit(): void { }

  handleButton(click: any) { //naming convention for events (name of action)
    //wipe out screen and start over
    if (this.hist.charAt(this.hist.length - 1) === '=' || this.screen == "E") {
      this.hist = "";
      this.screen = ""
    }
    console.log(this.hist);
    this.isError = false;
    //get the data of the pressed button and append it on screen
    if (this.screen.substring(0, 1) === '0') {
      this.screen = this.screen.replace(this.screen.charAt(0), "");
    }
    this.screen += click.target.innerText;
  }

  handleOperation(operation: any) {
    if (this.screen == "" && this.screen != "0") { //replace operation (undo operation)
      this.operation = operation.target.innerText;
      this.hist = this.hist.replace(/.$/, operation.target.innerText);
      return;
    }

    //set the operation between first and second operand
    this.operation = operation.target.innerText;
    this.firstOperand = this.screen;
    this.hist = String(this.firstOperand) + this.operation;
    this.screen = "";
  }

  unaryOperations(unaryOp: any) {
    //this if block just to make unaryOperation text more stable "innerHTML has some errors :)"
    if (unaryOp.target.innerText == "%") {
      this.unaryOperation = "percent";
    } else if (unaryOp.target.innerText == "1/x") {
      this.unaryOperation = "inverse";
    } else if (unaryOp.target.innerText == "x2") {
      this.unaryOperation = "square";
    } else if (unaryOp.target.innerText == "√ x ") {
      this.unaryOperation = "squareRoot";
    }

    this.calculatorService.unaryOperations(this.screen, this.unaryOperation).subscribe(recieved => {
      //set the history sub screen according to the operation
      switch (this.unaryOperation) {
        case "percent": this.hist = this.screen + "/" + "100"; break;
        case "inverse": this.hist = "1" + "/" + this.screen; break;
        case "square": this.hist = "sqr(" + this.screen + ")"; break;
        case "squareRoot": this.hist = "sqrt(" + this.screen + ")"; break;
      }
      this.screen = recieved;
    }, err => {
      this.screen = err.error.text;
      this.handleError();
      if (this.screen == "E") { this.isError = true; } //to disable some buttons
    }
    )
  }

  binaryOperations(result: any) {
    this.isError = false;
    if (this.hist.charAt(this.hist.length - 1) === "=") { return; }
    this.secondOperand = this.screen;
    //send http get request to calculate at server side and get whether the result or error
    this.calculatorService.binaryOperations(this.firstOperand, this.operation, this.secondOperand).subscribe(recieved => {
      this.result = recieved;
      this.hist = String(this.firstOperand) + this.operation + String(this.secondOperand) + "=";
      this.screen = this.result;
      console.log(this.hist);
    }, err => {
      this.screen = err.error.text;
      this.handleError();
      if (this.screen == "E") { this.isError = true; } //to disable some buttons
    });

  }

  //C and CE buttons
  reset(reset: any) {
    this.isError = false;
    this.screen = "0"; //clear the screen 
    this.hist = "";    //clear the history
    this.firstOperand = "";
    this.operation = "";
    this.secondOperand = "";
  }

  //undo button "X"
  backSpace(x: any) {
    this.isError = false;
    this.screen = this.screen.replace(/.$/, "") //clear the last element 
    if (this.screen == "") {
      this.screen = "0"
    }
  }

  number: number = 0
  toggleSign(toggle: any) {
    this.number = +this.screen;
    this.number = -this.number;
    this.screen = String(this.number);
    //just toggle the nubmer sign when clicking +/- button
  }

  floatIt() {
    if (this.screen.includes(".")) { return; }
    this.screen += '.';
    //add floating point 
  }

  //what to do when error occurs
  handleError() {
    this.firstOperand = "";
    this.operation = "";
    this.secondOperand = "";
    this.hist = "";
  }
}
