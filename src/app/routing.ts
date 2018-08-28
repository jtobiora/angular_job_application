import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ViewUsersComponent} from './components/admin/view-users/view-users.component';
import {AdminloginComponent} from './components/admin/adminlogin/adminlogin.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './components/admin/auth.guard';
import {ApplicantRegisterComponent} from './components/applicant-register/applicant-register.component';
const appRoutes: Routes = [
   
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'viewusers',
      component: ViewUsersComponent,
      canActivate: [ AuthGuard ],
    },
    {
      path: 'register',
      component: ApplicantRegisterComponent
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'profile',
      component: ProfileComponent
    },
    {
      path: 'admin/login',
      component: AdminloginComponent
    },

    { path: '**', redirectTo:'sales-report', pathMatch:'full' }

   
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
