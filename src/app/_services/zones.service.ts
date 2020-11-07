import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Zone } from '../_models/index';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZonesService {

  constructor(private http: HttpClient) { }
  createZone(zoneDetails: Zone) {
    return this.http.post(`${environment.APIUrl}Zone/AddZone`, zoneDetails);
  }
  deleteZone(zoneDetails: Zone) {
    return this.http.post(`${environment.APIUrl}Zone/DeleteZone`, zoneDetails);
  }
}
