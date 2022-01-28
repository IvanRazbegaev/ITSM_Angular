import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IncidentRequest} from "../interfaces/incident-request";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrackerBackendService {

  constructor(private http: HttpClient) { }

  getAllIncidents() :Observable<any>{
    return this.http.get("http://localhost:8000/incidents")
  }

  createIncident(body: IncidentRequest) :Observable<any>{
    return this.http.post("http://localhost:8000/incidents", body)
  }
}
