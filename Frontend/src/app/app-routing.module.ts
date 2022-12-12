import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as path from 'path';
import { DoneeComponent } from './Components/donee/donee.component';
import { DonorComponent } from './Components/donor/donor.component';
import { FormComponent } from './Components/form/form.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { NavComponent } from './Components/nav/nav.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegisterComponent } from './Components/register/register.component';
import { TrackComponent } from './Components/track/track.component';


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
  
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
