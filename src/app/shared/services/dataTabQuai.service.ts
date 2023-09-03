import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTabQuaiService {

  private url = "http://localhost:1000/GRMKWService/Rest/Api/QUAI/";


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

getQuaiList( ): Observable<any> {
  return this.http.get<any>(this.url + 'getQuaiList');
}

getQuaiById(idQuai: String ): Observable<any> {
    return this.http.get<any>(this.url + 'getQuaiById/'+idQuai );
  }
  

addQuai(Quai): Observable<any> {
    return this.http.post<any>(this.url + 'addQuai/'+Quai ,this.httpOptions);
  }

  Indisponible(Quai): Observable<any> {
    return this.http.put<any>(this.url + 'updateQuai/'+Quai ,this.httpOptions);
  }
  Disponible(Quai): Observable<any> {
    return this.http.put<any>(this.url + 'updateQuaiD/'+Quai ,this.httpOptions);
  }


}



