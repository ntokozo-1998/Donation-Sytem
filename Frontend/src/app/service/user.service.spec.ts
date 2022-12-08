import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private helper = new JwtHelperService();
  

  constructor() { }
  
  getData(token: string)
  { 
    return this.helper.decodeToken(token);
  }
}
