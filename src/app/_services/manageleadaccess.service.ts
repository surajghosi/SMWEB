import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ManageLeadAccess } from '../_models/index';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageleadaccessService {

  constructor(private http: HttpClient) { }
  createLeadAccess(accessDetails: ManageLeadAccess) {
    return this.http.post(`${environment.APIUrl}LeadAccess/AddLeadAccess`, accessDetails);
  }
  deleteLeadAccess(accessDetails: ManageLeadAccess) {
    return this.http.post(`${environment.APIUrl}LeadAccess/DeleteLeadAccess`, accessDetails);
  }
  getLeadAccessDetailsByLeadId(leadId) {
    return this.http.get(`${environment.APIUrl}LeadAccess/AllLeadAccess?leadId=${leadId}`);
  }
}
