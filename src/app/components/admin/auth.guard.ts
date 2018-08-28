import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AdminloginService} from './adminlogin.service';
import {Admin} from '../../Admin';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AdminloginService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      // handle any redirects if a user isn't authenticated
      if (!this.auth.isAdminAuthenticated()) {    
            this.router.navigate(['/admin/login']);
            return false;
      }

      return true;
  }
}
