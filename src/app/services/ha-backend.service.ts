import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HaBackendService {

  constructor(private http:HttpClient) { }

  getHaForMonth(month?: number, year?: number, highLimit?: number): Observable<any>{
    if(month && year && highLimit){
      return this.http.get(`http://localhost:8000/ha?month=${month}&year=${year}&limit=${highLimit}`)
    }
    return this.http.get(`http://localhost:8000/ha`)
  }

  checkSystemForDowntimes(month: number, year: number, highLimit?: number): Observable<any>{
    return this.http.post(`http://localhost:8000/ha`, {month, year, limit: highLimit})
  }

  deleteDowntime(id: number): Observable<any>{
    return this.http.delete(`http://localhost:8000/ha?id=${id}`)
  }

}
