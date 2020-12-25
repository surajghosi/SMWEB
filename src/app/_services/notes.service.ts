import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notes } from '../_models/index';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }
  createNotes(notesDetails: Notes) {
    return this.http.post(`${environment.APIUrl}Notes/AddNotes`, notesDetails);
  }
  deleteNotes(notesDetails: Notes) {
    return this.http.post(`${environment.APIUrl}Notes/DeleteNotes`, notesDetails);
  }
  getNotesDetailsByLeadId(leadId) {
    return this.http.get(`${environment.APIUrl}Notes/AllNotes?leadId=${leadId}`);
  }
}
