import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Source } from '../_models/index';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  constructor(private http: HttpClient) { }
  createSource(sourceDetails: Source) {
    return this.http.post(`${environment.APIUrl}Source/AddSource`, sourceDetails);
  }
  deleteSource(sourceDetails: Source) {
    return this.http.post(`${environment.APIUrl}Source/DeleteSource`, sourceDetails);
  }
}
