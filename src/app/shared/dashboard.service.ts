import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  getdata(){
    return this.http.get('http://localhost:52253/api/Dashboard').toPromise()
  }

}
