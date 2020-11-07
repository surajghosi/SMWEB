import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactModel } from '../_models/index';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) { }
  createContact(contactDetails: ContactModel) {
    return this.http.post(`${environment.APIUrl}Contact/AddContact`, contactDetails);
  }
  deleteContact(contactDetails: ContactModel) {
    return this.http.post(`${environment.APIUrl}Contact/DeleteContact`, contactDetails);
  }

}
