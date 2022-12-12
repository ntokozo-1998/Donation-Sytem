import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as path from 'path';
import { ConfirmComponent } from './Components/confirm/confirm.component';
import { DonationsComponent } from './Components/donations/donations.component';
import { DoneeComponent } from './Components/donee/donee.component';
import { DonorComponent } from './Components/donor/donor.component';
import { FormComponent } from './Components/form/form.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { NavComponent } from './Components/nav/nav.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegisterComponent } from './Components/register/register.component';
import { ScheduleComponent } from './Components/schedule/schedule.component';
import { TrackComponent } from './Components/track/track.component';
import { ViewDonationComponent } from './Components/view-donation/view-donation.component';


const routes: Routes = [

  {path : 'login' , component : LoginComponent},
  {path : 'register' , component : RegisterComponent},
  {path : 'nav' , component : NavComponent},
  {path : 'donee' , component : DoneeComponent},
  {path : 'donor' , component : DonorComponent},
  {path : 'home' , component : HomeComponent},
  {path : 'profile' , component : ProfileComponent},
  {path : 'track' , component : TrackComponent},
  {path : 'form' , component : FormComponent},
  {path : 'viewdonation' , component : ViewDonationComponent},
  {path : 'donations' , component : DonationsComponent},
  {path : 'schedule' , component : ScheduleComponent},
  {path : 'confirm' , component : ConfirmComponent},
  
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
