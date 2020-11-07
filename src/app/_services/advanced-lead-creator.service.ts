import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Leads , MovedLead , Todo} from '../_models/index';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvancedLeadCreatorService {

  constructor(private http: HttpClient) { }
  createAdvanceLeads(leads: Leads) {
    return this.http.post(`${environment.APIUrl}Lead/AddLead`, leads);
  }
  getLeadListView(pipeId) {
    return this.http.get(`${environment.APIUrl}Lead/LeadList?pipeId=${pipeId}`);
  }
  movedLeads(movedleads: MovedLead) {
    return this.http.post(`${environment.APIUrl}Lead/MovedLead`, movedleads);
  }
  addTodos(todos: Todo) {
    return this.http.post(`${environment.APIUrl}Lead/AddTodo`, todos);
  }
  updateTodos(updateTodos: any) {
    return this.http.post(`${environment.APIUrl}Lead/UpdateTodoStatus`, updateTodos);
  }
  getTodoList(leadId) {
    return this.http.get(`${environment.APIUrl}Lead/TodoList?leadId=${leadId}`);
  }
  getLeadDetailsByLeadId(leadId) {
    return this.http.get(`${environment.APIUrl}Lead/GetLeadDetailsByLeadId?leadId=${leadId}`);
  }
  createDirectLead(leadInfo: any) {
    return this.http.post(`${environment.APIUrl}Lead/AddDirectLead`, leadInfo);
  }
}
