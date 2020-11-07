import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Stage } from '../_models/index';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  constructor(private http: HttpClient) { }

  createStage(stage: Stage) {
    return this.http.post(`${environment.APIUrl}Stage/AddStage`, stage);
  }
  getAllStage(pipeId, pageNumber, Size) {
    return this.http.get(`${environment.APIUrl}Stage/GetAllStage?pipeId=${pipeId}&pageNumber=${pageNumber}&pageSize=${Size}`);
  }
  GetStageId(id: any) {

    return this.http.get(`${environment.APIUrl}Stage/GetStageById?stageId=${id}`);
  }
  DeleteStageById(id: any) {
    return this.http.delete(`${environment.APIUrl}Stage/DeleteStage?stageId=${id}`);
  }
  updateStageSequence(stage: any[]) {
    return this.http.post(`${environment.APIUrl}Stage/UpdateStageSequence`, stage);
  }
}
