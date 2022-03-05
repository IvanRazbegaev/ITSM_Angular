import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IncidentRequest} from "../interfaces/incident-request";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrackerBackendService {

  constructor(private http: HttpClient) { }

  getAllIncidents(start: number, end: number) :Observable<any>{
    return this.http.get(`http://localhost:8000/tracker?start=${start}&end=${end}`)
  }

  createNewIncident(incidentStart: string, incidentEnd: string, incLength: number, desc:string, comments: string): Observable<any>{
    return this.http.post('http://localhost:8000/tracker', {incidentStart, incidentEnd, incLength, desc, comments})
  }

  deleteAllIncidents() :Observable<any>{
    return this.http.delete("http://localhost:8000/tracker")
  }

  checkForIncidents(): Observable<any>{
    return this.http.get(`http://localhost:8000/incidents`)
  }

  deleteIncident(id: number){
    return this.http.delete(`http://localhost:8000/tracker?id=${id}`)
  }
}
