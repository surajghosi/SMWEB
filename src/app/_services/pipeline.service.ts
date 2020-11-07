import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PipeLine } from '../_models/index';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PipelineService {
  constructor(private http: HttpClient) { }

  createPipeLine(pipeLine: PipeLine) {
    return this.http.post(`${environment.APIUrl}PipeLine/AddPipeLine`, pipeLine);
  }
  getAllPipeLine(pageNumber, Size) {
    return this.http.get(`${environment.APIUrl}PipeLine/GetAllPipeLine?pageNumber=${pageNumber}&pageSize=${Size}`);
  }
  GetPipeLineId(id: any) {

    return this.http.get(`${environment.APIUrl}PipeLine/GetPipeLineById?pipeLineId=${id}`);
  }
  DeletePipeLineById(id: any) {
    return this.http.delete(`${environment.APIUrl}PipeLine/DeletePipeLine?pipeLineId=${id}`);
  }
}
