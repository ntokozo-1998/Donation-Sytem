import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.scss']
})
export class DonorComponent implements OnInit {

  completed: any [] = [];
  inProgress : any [] = [];

  constructor(private spinner:NgxSpinnerService,private userService : UserService,private router:Router) { }

  ngOnInit(): void {

    this.router.navigate(['path/to'])
  .then(() => {
    window.location.reload();
  });

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
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      
      this.router.navigate(['path/to'])
      .then(() => {
        window.location.reload();
      });
      this.spinner.hide();
    }, 1000);
  }

}
