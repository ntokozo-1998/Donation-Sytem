import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { JwtService } from 'src/app/service/jwt.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private subscriptions : Subscription[] = [];
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });


  //constructor(private authService: AuthService,private toastr:ToastrService,private router:Router,private jwt :JwtService,private spinner: NgxSpinnerService) { }
 
  constructor(private authService: AuthService, private toast : NgToastService,private router:Router,private jwt :JwtService,private spinner: NgxSpinnerService){}

  ngOnInit(): void {

    // this.spinner.show();
    // if(localStorage.getItem('token')!= null && localStorage.getItem('account') == "donor")
    // {
    //   this.router.navigateByUrl('/donor');
    // }else if(localStorage.getItem('token')!= null && localStorage.getItem('account') == "donee"){

    //   this.router.navigateByUrl('/donee');
    // }
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }

  onLogin(form : FormGroup)
  {
    
    
    this.spinner.show();
        setTimeout(() => {
      /** spinner ends after 5 seconds */
        this.spinner.hide();
        }, 2000);

    this.subscriptions.push(
      this.authService.login(form.value).subscribe((data: any)=>{
        this.authService.saveToken(data.token);
        

        const {email,name,username,surname,account,user_id} = this.jwt.getData(data.token);
        console.log(this.jwt.getData(data.token));
        localStorage.setItem('account', account);
        localStorage.setItem('email',email);
        localStorage.setItem('username',username);
        localStorage.setItem('surname',surname);
        localStorage.setItem('name',name);
        localStorage.setItem('user_id',user_id);

        if(account =="Donor") //route to relevent page
        {
          this.toast.success({detail: "Welcome "+name, summary:'successfully logged in'});
          this.router.navigateByUrl('/donor');
        }else if(this.jwt.getData(data.token).account =="Donee") //route to relevent page
        {
          this.toast.success({detail:"Welcome "+name, summary:'successfully logged in'});
          this.router.navigateByUrl('/donee');
        } 

    },(error:HttpErrorResponse)=>{
      this.toast.warning({detail:"Warning "+name, summary:'you entered wrong details'});


      console.log(error)
    })
    )    
  }

}
