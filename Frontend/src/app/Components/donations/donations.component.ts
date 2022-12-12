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
  address : string = '';
  description : string = '';
  user_id : any ='';
  id:any;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.id = setInterval(() => {
      this.refresh(); 
    }, 800);
   
  }

  setDonationsDetails(type :string ,description :string,address :any,id :any,user_id:any)
  {
    localStorage.setItem('donations_type',type);
    localStorage.setItem('donations_desc',description);
    localStorage.setItem('donations_address',address);
    localStorage.setItem('post_id',id);
    localStorage.setItem('donor_id',user_id);

  }

  refresh()
  {
    this.userService.getDonations().subscribe((data:any) =>{
      this.donations = data;

      
      
    },(err : HttpErrorResponse)=>{
      
    })
  }

}
