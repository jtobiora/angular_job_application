import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {routing} from './routing';
import {LoginService} from './services/login.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './register/register.component';
import {UploadService} from './services/upload.service';
import {HttpClientModule} from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewUsersComponent } from './components/admin/view-users/view-users.component';
import {AdminloginService} from './components/admin/adminlogin.service';
import { AdminloginComponent } from './components/admin/adminlogin/adminlogin.component';
import { HomeComponent } from './components/home/home.component';
import {AuthGuard} from './components/admin/auth.guard';
import { ApplicantRegisterComponent } from './components/applicant-register/applicant-register.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ViewUsersComponent,
    AdminloginComponent,
    HomeComponent,
    ApplicantRegisterComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule
  ],
  providers: [LoginService,UploadService,AdminloginService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
