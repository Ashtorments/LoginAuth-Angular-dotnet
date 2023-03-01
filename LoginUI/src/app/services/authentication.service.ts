import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl:string = "https://localhost:7030/api/User/authenticate"
  constructor(private http: HttpClient) { }

  signUp(userObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`, userObj)
  }
  
  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj)

  }
}
