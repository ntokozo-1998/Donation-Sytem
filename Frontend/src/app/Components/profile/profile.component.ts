import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { JwtService } from 'src/app/service/jwt.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  updateForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    name: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    surname: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    confirmPassword: new FormControl(),
    //account: new FormControl()
  });

  username ?:string;
  name ?:string;
  surname ?:string;
  email ?:string;
  account ?:string;
  user_id ?:string;
  image_link:any='';
  rating : number = 0;
  showRating :boolean = true;

  preset :string = "i8maua2c";

  update_dp = new FormGroup({
    file:new FormControl(),
    upload_preset: new FormControl()}
  );

  cloudinaryUrl: string = 'https://api.cloudinary.com/v1_1/dev-lab/image/upload';
  file: any;
  isUpdating: boolean = false;


  constructor(private userService:UserService,private authService: AuthService, private router: Router,private toastr: ToastrService ,private jwt:JwtService,private spinner:NgxSpinnerService, private http:HttpClient) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);

    this.username = this.jwt.getData(JSON.stringify(localStorage.getItem('token'))).username; 
    this.surname = this.jwt.getData(JSON.stringify(localStorage.getItem('token'))).surname;
    this.name = this.jwt.getData(JSON.stringify(localStorage.getItem('token'))).name;
    this.email = this.jwt.getData(JSON.stringify(localStorage.getItem('token'))).email;
    this.account = this.jwt.getData(JSON.stringify(localStorage.getItem('token'))).account;
    this.user_id = this.jwt.getData(JSON.stringify(localStorage.getItem('token'))).user_id;


    if(this.account =='Client')
    {
      this.showRating = false;
    }else
    {
      this.showRating = true;

    }



    this.userService.getOneUser(this.user_id).subscribe((data:any)=>{
      this.rating = data.rating;

    })
    
    this.image_link = localStorage.getItem('image_link')

    

  }

  toggleUpdate() {
    if(this.isUpdating)
    {
      this.isUpdating = false;
    }else{
      this.isUpdating = true;
    }

  }


  onUpdate(form: FormGroup)
  {
    if(form.valid){
      if(form.value.confirmPassword == form.value.password)
      {
        this.userService.updateProfile(this.user_id, form.value).subscribe((data:any)=>{
          this.toastr.success(data.message);
          if(this.account == 'Freelancer')
          {
            this.router.navigateByUrl('/freelancer');
          }else
          {
            this.router.navigateByUrl('/client');
    
          }
        },(err:HttpErrorResponse)=>{
          this.toastr.error(err.error.message);
          
        })

      }else{
        this.toastr.warning('Passwords do not match');
      }

    }
    
    
  }

  async onFileChange(event :any)
  {
    this.spinner.show();

    if(event.target.files.length>0)
    {
      this.file =  event.target.files[0];
      this.spinner.hide();
     
    }

  }

  image = {
    link : '' 
  }


  onSubmit(){  
    
    this.spinner.show();
    const formData = new FormData();    
    formData.append("file",this.file)    
    formData.append("upload_preset","i8maua2c");     
    this.http.post(this.cloudinaryUrl,formData).subscribe(async (res:any)=>{     
      this.image_link = await res.url;
      this.image.link = this.image_link;
      // console.log(res)
      //this.userService.updateProfilePicture(this.user_id,this.image).subscribe((saveData:any)=>{
        this.toastr.success("Image updated successfully");
        localStorage.setItem('image_link',this.image_link);

        this.spinner.hide();
        //console.log(saveData);
      })
      //console.log(this.image_link);
    //}) 
    
    
   
  }
  

}
