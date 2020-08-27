import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AddUser } from '../_models/index';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  constructor(private http: HttpClient) { }
  addNewUser(addNewUser: AddUser) {

    return this.http.post(`${environment.APIUrl}UserManagment/AddUser`, addNewUser);
  }
  GetAllUser(pageNumber, Size) {

    return this.http.get(`${environment.APIUrl}UserManagment/GetAllUser?pageNumber=${pageNumber}&pageSize=${Size}`);
  }
  GetUserById(id: any) {

    return this.http.get(`${environment.APIUrl}UserManagment/GetUserById?userId=${id}`);
  }
  DeleteUserById(id: any) {

    return this.http.delete(`${environment.APIUrl}UserManagment/DeleteUser?userId=${id}`);
  }
}
