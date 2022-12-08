import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
[x: string]: any;

  private subscriptions : Subscription[] = [];

  registerForm:FormGroup = new FormGroup({
    username: new FormControl('', [ Validators.required, Validators.minLength(3),Validators.maxLength(50) ]),
    password: new FormControl(),
    email: new FormControl(),
    name: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    surname: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    confirmPassword: new FormControl(),
    account: new FormControl()
  });

  submitted=false;

  constructor(private authService: AuthService, private router: Router,private toast : NgToastService,private spinner:NgxSpinnerService, private fb:FormBuilder) { }

  myForm() {
    this.registerForm = this.fb.group({
      username: ['', [ Validators.required, Validators.minLength(3),Validators.maxLength(50) ]],
      email: ['', [Validators.required, Validators.email]],
      name:  ['', [ Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
      password:  ['', [ Validators.required ]],
      confirmPassword:  ['', [ Validators.required ]],
      account:  ['', [ Validators.required ]]
    });
  }

  ngOnInit(): void {
    this.myForm;
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }

  get formValidation(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
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
            this.toast.success({detail:"Successful ", summary:'Your account is now created'});// form.value.name+"!"});
          },(error:HttpErrorResponse)=>{
            this.toast.warning({detail:"Warning ", summary:'please enter correct details'});
            console.log(error)
          })
        )
      }else{
        this.toast.warning({detail:"Welcome ", summary:'welcome'});
      }
    }

    

  }
}
