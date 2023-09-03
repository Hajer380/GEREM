import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTabSiteService {

  private url = "http://localhost:1000/GRMKWService/Rest/Api/Site/";


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

getSite( ): Observable<any> {
  return this.http.get<any>(this.url + 'getSite');
}

getSiteByName(idSite ): Observable<any> {
    return this.http.get<any>(this.url + 'getSiteById/'+idSite );
  }
  
deleteSite(idSite ): Observable<any> {
    return this.http.delete<any>(this.url + 'deleteSite/'+idSite , this.httpOptions);
  }

  addSite(data:any): Observable<any> {
    return this.http.post<any>(this.url + 'addSite/',data);
  }
  updateSite(data:any ,idSite): Observable<any> {
    return this.http.put<any>(this.url + 'updateSite/'+idSite,data);
  }


}