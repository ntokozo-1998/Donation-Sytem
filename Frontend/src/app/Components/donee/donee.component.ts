import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './donee.component.html',
  styleUrls: ['./donee.component.scss']
})
export class DoneeComponent implements OnInit {

  posted : any = 0
  completed: any [] = [];
  inProgress : any [] = [];

  constructor(private spinner:NgxSpinnerService, private userService : UserService) { }



  ngOnInit(): void {

    this.userService.getCompletedDonations().subscribe((data:any) => {
    
      if(data.length != 0){
        this.completed = data;
      }

    })

    this.userService.getInProgressDonations().subscribe((data:any) => {
 
      if(data.length != 0){
        this.inProgress = data;
      }

    })

    if(localStorage.getItem('donationsPosted')!=null)
    {
      this.posted = (localStorage.getItem('donationsPosted')) 
      
    }


    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }



}
