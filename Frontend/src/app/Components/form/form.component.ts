import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  donation: any;
  id : any;
  user_id : any;
  //donationsId : any;
  donationsType:any;
  date : any;
  time : any;
  donationsDesc:any;
  donationsAddress:any;
  
 
  constructor(private userService : UserService, private auth :AuthService,private toast : NgToastService, private router:Router) { }
    DonationsForm= new FormGroup({
    type: new FormControl(),
    address: new FormControl(),
    date: new FormControl(),
    time: new FormControl(),
    description: new FormControl(),
  });

  updateDonationsForm= new FormGroup({
    donations_type: new FormControl(),
    donations_address: new FormControl(),
    donations_description: new FormControl(),
    date: new FormControl(),
    time: new FormControl(),
   
  });

  onSubmit(form: FormGroup) {

    //console.log(localStorage.getItem('user_id'));
    this.userService.createDonations(form.value).subscribe((data:any) =>{
      
      this.toast.success({detail:'Successful',summary:(data.message)});

    },(err: HttpErrorResponse)=>{

      this.toast.error({detail:'Error',summary:(err.error.message)});


    })
    this.DonationsForm.reset();
  }

  ngOnInit(): void {
      // this.id = setInterval(() => {
      //   this.refresh(); 
      // }, 2000);
     
  }

  deleteDonations(id:any)
  {
    this.userService.deleteDonations(id,this.data).subscribe((data:any)=>{
      this.toast.success({detail:'Successful',summary:(data.message)});
    },(err: HttpErrorResponse)=>{
      this.toast.error({detail:'error',summary:(err.error.message)});

    })
  }


  refresh()
  {
    if(localStorage.getItem('isLoggedIn') =='yes')
      {
        this.userService.getDonorDonations().subscribe((data:any)=>{
          this.donation = data;
          localStorage.setItem('donationsPosted',this.donation.length);
  
        },(err: HttpErrorResponse)=>{
          this.toast.error({detail:'Error',summary:(err.error.message)});
        })
      }
    
  }
  
  onUpdate(form:FormGroup)
  {
    this.userService.updateDonations(this.user_id,form.value).subscribe((data:any)=>{
      this.toast.success({detail:'Succesful',summary:(data.message)});
    },(err: HttpErrorResponse)=>{
      //console.log(err)
      this.toast.error({detail:'Error',summary:(err.error.message)});
    })
  }
  
  setDetails(id:any,donations_type:any,donations_desc:any,donations_address:any){
        this.user_id = id;
        this.donationsType = donations_type;
        this.donationsDesc = donations_desc;
        this.donationsAddress = donations_address;
      }
  
  
  
  data ={
    status: '',
    donations_id: ''
  }
    // changeStatus(status:any, donations_id:any,dev_id:any){
    //   this.data.status = status;
    //   this.data.donations_id = donations_id;
  
    //   this.userService.updateStatus(this.data).subscribe(async(data:any)=>{
    //     this.toastr.success(data.message);
  
    //     if(this.data.status=="Completed"){
    //       this.isRated = true;
  
    //       // this.router.navigateByUrl('/ratings')
    //       // localStorage.setItem('dev_id',dev_id);
          
    //     }else{
    //       this.isRated = false;
    //     }
  
    //   },(err : HttpErrorResponse)=>{
    //     this.toastr.error(err.error.message);
    //   })
      
      
    }
  