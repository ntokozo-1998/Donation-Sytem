import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    HomeComponent,
    DonorComponent,
    DoneeComponent,
    FormComponent,
    ProfileComponent,
    TrackComponent,
    ConfirmComponent,
    DonationsComponent,
    ScheduleComponent,
    ViewDonationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgToastModule,
    NgxSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,RouterModule.forRoot([{path:'login',component:LoginComponent}])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
