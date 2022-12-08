import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private subscriptions : Subscription[] = [];

  registerForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
    name: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    surname: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    confirmPassword: new FormControl(),
    account: new FormControl()
  });

  constructor(private authService: AuthService, private router: Router,private toast: NgToastService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }

  onRegister(form : FormGroup)
  {
    if(form.valid)
    {
      if(form.value.confirmPassword == form.value.password)
      {
        this.subscriptions.push(
          this.authService.register(form.value).subscribe((response:any)=>{
            this.router.navigateByUrl('/login');
            this.toast.success({detail:'succesful', summary:'Welcome to Change World'+form.value.name+'!'});
          },(error:HttpErrorResponse)=>{
            this.toast.error({detail:'erro', summary:(JSON.stringify(error.error.message))});
            console.log(error)
          })
        )
      }else{
        this.toast.warning({detail:'warning', summary: 'Passwords do not match'})
      }
    }

    

  }
}
