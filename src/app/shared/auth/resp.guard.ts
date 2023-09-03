
import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/Authentification.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Injectable({
  providedIn: 'root'
})
export class RespGuard implements CanActivate {
   constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
 
        const currentUser = this.authenticationService.currentUserValue;
        let c  = JSON.parse(localStorage.getItem('currentUser'));
        console.log(c)
        if (c['role']['idRole']==3 || c['role']['idRole']==1) {
            // authorised so return true
                console.log("chef 1 true")
            return true;
        }
        else{
          
        Swal.fire('Oops...', 'Acces dennied!', 'error')
        
        

        // not logged in so redirect to login page with the return url
        //this.router.navigate(['/pages/login'], { queryParams: { returnUrl: state.url }});
        return false;}
    }
  
}
