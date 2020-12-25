import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { FilesUpload } from '../_models/index';
@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(private http: HttpClient) { }
  fileUpload(formData: FormData) {
    return this.http.post(`${environment.APIUrl}Files/UploadFile`, formData);
  }
  deleteFile(filesUpload: FilesUpload) {
    return this.http.post(`${environment.APIUrl}Files/DeleteFile`, filesUpload);
  }
  getFileDetailsByLeadId(leadId) {
    return this.http.get(`${environment.APIUrl}Files/AllFiles?leadId=${leadId}`);
  }
}

