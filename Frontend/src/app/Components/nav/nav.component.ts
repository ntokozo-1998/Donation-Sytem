import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  name : any = 'Hello World'
  isLoggedIn : boolean = false;
  id : any;
  dashboardRoute : string = '';
  image :any;
  
  constructor(private router : Router) { }

  ngOnInit(): void {
    this.id = setInterval(() => {
      this.refresh();
      this.checkAccount(); 
    }, 10);   
  
  }

  checkAccount(): boolean {
    
    if(localStorage.getItem('account') == "Freelancer")
    {

      this.dashboardRoute = '/freelancer';
      return true;
    }else
    {
      this.dashboardRoute = '/client';
      return false;
    }
    
  }
  logout()
  {
    localStorage.clear();
    this.isLoggedIn = false;
    clearInterval(this.id);
    localStorage.setItem('isLoggedIn','no');
    this.router.navigateByUrl('/home');
  }
  refresh(){
    if(localStorage.getItem('token')!= null ){this.isLoggedIn = true;}
  
    if(localStorage.getItem('name')!= null)
    {
      this.name = "Hello "+localStorage.getItem('name');
      this.image = localStorage.getItem('image_link'); 
    }
  }

}
