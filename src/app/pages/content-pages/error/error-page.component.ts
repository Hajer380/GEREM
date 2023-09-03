import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/shared/services/Authentification.service';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.scss']
})

export class ErrorPageComponent {
    constructor(public Authentication: AuthenticationService,private router: Router){
       
    }

    LOGOUT(){
        localStorage.removeItem('currentUser')
        this.Authentication.logout()
        this.router.navigate(['/pages/login'])

    }

}