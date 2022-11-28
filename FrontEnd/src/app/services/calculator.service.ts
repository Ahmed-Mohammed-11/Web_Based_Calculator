import { HttpBackend, HttpClient , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  
  constructor(private http: HttpClient) {}
  private url = "http://localhost:8080";
  binaryOperations(o1:String, o2:String, o3:String): Observable<String>{
    return this.http.get<String>(
      `${this.url}/firstoperand=${o1}/operation=${o2}/secondoperand=${o3}`
    );
  }
  unaryOperations(o1:String, o2:String): Observable<String>{
    return this.http.get<String>(
      `${this.url}/operand=${o1}/operation=${o2}`
    );
  }
}

