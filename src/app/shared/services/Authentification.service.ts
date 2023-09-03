import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserModel } from 'app/pages/content-pages/login/class';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private url = "http://localhost:1000/GRMKWService/Rest/Api/User/";

    private currentUserSubject: BehaviorSubject<UserModel>;
    public currentUser: Observable<UserModel>;

    constructor(private http: HttpClient,public _firebaseAuth: AngularFireAuth, public router: Router) {
        this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserModel {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        let obj;
        obj = {
            nomPersonne : username,
            password : password
        }
        return this.http.post<any>(this.url + 'authenticate/', obj)
            .pipe(map(user => {
                console.log("currentUser")
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                console.log("currentUser"), console.log(user)
                return user;}
              
                
            ));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this._firebaseAuth.signOut();
        this.router.navigate(["/pages/login"]);
        console.log("logout")
        
    }
}