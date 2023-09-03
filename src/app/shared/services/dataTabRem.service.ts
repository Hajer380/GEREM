import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTabRemService {

  private url = "http://localhost:1000/GRMKWService/Rest/Api/Remorque/";


  /*  private httpOptions = {
     headers: new HttpHeaders({
         'Content-Type':  'application/json'
     })
     }; */

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
    })
  };

  


  constructor(private http: HttpClient) { }

  getRemorqueList(): Observable<any> {
    return this.http.get<any>(this.url + 'getRemorqueList');
  }

  getRemById(idRemorque): Observable<any> {
    return this.http.get<any>(this.url + 'getRemorqueById/' + idRemorque);
  }
  updateRemorque(Remorque , idRemorque: number): Observable<any> {
    return this.http.put<any>(this.url + 'updateRemorque/' + idRemorque, Remorque);}

  deleteRemorque(idRemorque): Observable<any> {
    return this.http.delete<any>(this.url + 'deleteRemorque/' + idRemorque, this.httpOptions);
  }
  
  addRemorque(data  ): Observable<any> {
    return this.http.post<any>(this.url + 'addRemorque/'  ,data);
  }
 
  getNbRemByQuai(idQuai): Observable<any> {
    return this.http.get<any>(this.url + 'getNbRemByQuai/' + idQuai);
  }
  
  getNburg(degurg): Observable<any> {
    return this.http.get<any>(this.url + 'getNburg/' + degurg, this.httpOptions);
  }



}
