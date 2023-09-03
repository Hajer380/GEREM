import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/Authentification.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        let c  = JSON.parse(localStorage.getItem('currentUser'));
        console.log("c"),console.log(c)
        if (  c['role']['idRole']==1 || c['role']['idRole']==2 || c['role']['idRole']==3 || c['role']['idRole']==4 ) {
            // authorised so return true

            return true;
        }
        else{
          Swal.fire('Oops...', 'Acces dennied!', 'error')

        
        // not logged in so redirect to login page with the return url
       // this.router.navigate(['/pages/login'], { queryParams: { returnUrl: state.url }});
        return false;}
    }
}
