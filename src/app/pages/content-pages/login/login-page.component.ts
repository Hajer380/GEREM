import { Component, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { AlertService } from 'app/shared/services/Alert.service';
import { AuthenticationService } from 'app/shared/services/Authentification.service';
import { LoginService } from 'app/shared/services/login.service';
import { NgxSpinnerService } from "ngx-spinner";
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  loginForm : FormGroup ;
  FormSubmitted = false;
  isFailed = false;
  loading = false;
    submitted = false;
    returnUrl: string;
    logoUrl = 'assets/img/sagemcom-logo.png';
  


  constructor(  private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService, private authService: AuthService,private loginService : LoginService ,
    private spinner: NgxSpinnerService,
    ) {
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/dashboard/GRMK']);
    }

  }
 
  ngOnInit():void {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/src/app/pages/content-pages/login';
}




get f() { return this.loginForm.controls; }

onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;

    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              this.alertService.success("succes")
                this.router.navigate(['/dashboard/GRMK'])
            },
            error => {
            

                this.alertService.error("error")
                this.router.navigate(['/pages/login'])
                this.loading = false;
            });
}

}
