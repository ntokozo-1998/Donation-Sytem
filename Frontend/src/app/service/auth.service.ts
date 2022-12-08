import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'http://localhost:8080/api';
  token !: string;
  loggedInUsername !: string;
  jwtHelper = new JwtHelperService;

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(this.api+'/login',data);
  }

  register(data: any) {
    return this.http.post(this.api+'/register',data);
  }

  saveToken(token : string): void
  {
    this.token = token;
    sessionStorage.setItem('token',token);
  }

  forgotPassword(data: any) {
    return this.http.post(this.api+'/forgotPassword',data);
  }
}
