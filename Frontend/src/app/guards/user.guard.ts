import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
 
  constructor(private router:Router, private toast: NgToastService,private authSevice : AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(sessionStorage.getItem('token') != null){
        return true;
      }else{
        this.router.navigate(['/login']);
        this.toast.warning({detail: 'Alert', summary: 'Please Login'})
        return false;

      }
    
  }
  
}
