import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  screen: String = ""; //content of current user input
  firstOperand: String = "";
  secondOperand: String = "";
  operation: String = "";
  unaryOperation: String = "";
  hist: String = ""; //operation History
  result: String = "";
  isError: boolean = false; //trigger error to disable some buttons if needed

  //instance from service to use later
  constructor(private calculatorService: CalculatorService) { }
  ngOnInit(): void { }

  unaryOperations(unaryOp: any) {
    if (unaryOp.target.innerText == "%") {
      this.unaryOperation = "percent";
    } else if (unaryOp.target.innerText == "1/x") {
      this.unaryOperation = "inverse";
    } else if (unaryOp.target.innerText == "x2") {
      this.unaryOperation = "square";
    } else if (unaryOp.target.innerText == "√ x ") {
      this.unaryOperation = "squareRoot";
    }
    console.log(this.unaryOperation);
    this.calculatorService.unaryOperations(this.screen, this.unaryOperation).subscribe(recieved => {
      switch (this.unaryOperation) {
        case "percent": this.hist = this.screen + "/" + "100"; break;
        case "inverse": this.hist = "1" + "/" + this.screen; break;
        case "square": this.hist = "sqr(" + this.screen + ")"; break;
        case "squareRoot": this.hist = "sqrt(" + this.screen + ")"; break;
      }
      this.screen = recieved;
    }, err => {
      this.screen = err.error.text;
      if (this.screen == "E") { this.isError = true; }
    }
    )
  }

  handleButton(click: any) { //naming convention for events (name of action)
    if (this.hist.charAt(this.hist.length - 1) === "=" || this.screen == "E") { this.screen = "" } //wipe out screen and start over
    this.isError = false;
    //get the data of the pressed button and append it on screen
    this.screen += click.target.innerText;
  }

  handleOperation(operation: any) {
    if (this.screen == "") { //replace operation (undo operation)
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

  binaryOperations(result: any) {
    this.isError = false;
    if (this.hist.charAt(this.hist.length - 1) === "=") { return; }
    this.secondOperand = this.screen;
    //send http get request to calculate at server side and get whether the result or error
    this.calculatorService.binaryOperations(this.firstOperand, this.operation, this.secondOperand).subscribe(recieved => {
      this.result = recieved
      this.hist = String(this.firstOperand) + this.operation + String(this.secondOperand) + "=";
      this.screen = this.result;
    }, err => {
      this.result = err.error.text;
      this.screen = this.result;
      if (this.result == "E") { this.isError = true; }
    });
  }

  //C and CE buttons
  reset(reset: any) {
    this.isError = false;
    this.screen = ""; //clear the screen 
    this.hist = ""; //clear the history
    this.firstOperand = "";
    this.operation = "";
    this.secondOperand = "";
  }

  //undo button "X"
  backSpace(x: any) {
    this.isError = false;
    this.screen = this.screen.replace(/.$/, "") //clear the last element 
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
}
