import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NavComponent } from './Components/nav/nav.component';
import { HomeComponent } from './Components/home/home.component';
import { DonorComponent } from './Components/donor/donor.component';
import { DoneeComponent } from './Components/donee/donee.component';
import { FormComponent} from './Components/form/form.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { TrackComponent } from './Components/track/track.component';
import { ConfirmComponent } from './Components/confirm/confirm.component';
import { DonationsComponent } from './Components/donations/donations.component';
import { ScheduleComponent } from './Components/schedule/schedule.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgToastModule } from 'ng-angular-popup';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgToastModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
