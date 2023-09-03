import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserModel } from 'app/pages/content-pages/login/class';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class LoginService {

  private url = "http://localhost:1000/GRMKWService/Rest/Api/User/";


 /*  private httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json'
    })
    }; */

    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
      })
    };


constructor(private http: HttpClient) { }

getByMatricule(username: string ): Observable<any> {
  return this.http.get<any>(this.url + 'getUserByName/'+username);

}

getRemorqueList(): Observable<any> {
  return this.http.get<any>(this.url + 'getRemorqueList');
}
    getAll() {
        return this.http.get<any>(this.url + 'getUsers');
    }

  
    delete(id: number) {
        return this.http.delete<any>(this.url +'deleteUser/ ' +id);
    }

    authenticate(data  ): Observable<any> {
      return this.http.post<any>(this.url + 'authenticate/'  ,data);
    }

}






