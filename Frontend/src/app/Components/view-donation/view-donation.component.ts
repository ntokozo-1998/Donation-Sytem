import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-donation-job',
  templateUrl: './view-donation.component.html',
  styleUrls: ['./view-donation.component.scss']
})

export class ViewDonationComponent implements OnInit {

  donations_type: any;
  donations_desc: any;
  donations_id : any;
  donations_address : any
  donor_id : any;
  dev_id : any;

 formDonations = new FormGroup({
  
 });

  constructor(private toastr : ToastrService, private userService : UserService,private router:Router) { }

  viewDonationsForm= new FormGroup({ 
    donationsType : new FormControl(''),
    donationsDesc:new FormControl(''),
    donationsAddress:new FormControl(''),

  });

  data = {
    donations_id : 0,
    type : 0,
    address: 0,
    description: 0,
    user_id: 0,
    dev_id: 0,
    
  }
 
  
isShow: boolean = false;
isHide: boolean = true;

toggleHide(){
  this.isHide = ! this.isHide;
}

toggleshow(){
  this.isShow = ! this.isShow;
}

  ngOnInit(): void {
    this.donations_type = localStorage.getItem('donations_type');
    this.donations_desc = localStorage.getItem('donations_desc');
    this.donations_address = localStorage.getItem('donations_address');
    this.donor_id = localStorage.getItem('Donor_id');
    this.donations_id = localStorage.getItem('donations_id');
    this.dev_id = localStorage.getItem('user_id');

    // this.toastr.success("bidding was successful");
  }

 

  addDonations(form:FormGroup)
  {
    this.data.type = form.value.donationsType;
    this.data.description = form.value.donationsDesc;
    this.data.description = form.value.donationsAddress;
    this.data.user_id = this.donor_id;
    this.data.donations_id = this.donations_id;
    this.data.dev_id = this.dev_id;

    this.userService.addDonations(this.data).subscribe((response:any)=>{
      this.toastr.success(response.message);
      this.router.navigateByUrl('/Donor');
      
    },(err: HttpErrorResponse)=>{
      this.toastr.error(err.error.message);

    })
  }
  
    

}



