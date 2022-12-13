import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit {
  type : any;
  donations: any;
  time: any;
  date: any;
  address : string = '';
  description : string = '';
  user_id : any ='';
  id:any;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    // this.id = setInterval(() => {
      this.refresh(); 
    // }, 800);
   
  }

  setDonationsDetails(type :string ,description :string,address :any,id :any,user_id:any, date:any, time: any)
  {
    localStorage.setItem('donations_type',type);
    localStorage.setItem('donations_description',description);
    localStorage.setItem('donations_address',address);
    localStorage.setItem('date',date);
    localStorage.setItem('time',time);
    localStorage.setItem('donations_id',id);
    localStorage.setItem('donor_id',user_id);

  }

  refresh()
  {
    this.userService.getDonation().subscribe((data:any) =>{
      this.donations = data;
      console.log(this.donations)

      
      
    },(err : HttpErrorResponse)=>{
      
    })
  }

}
