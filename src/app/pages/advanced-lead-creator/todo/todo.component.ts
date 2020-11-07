import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {AdvancedLeadCreatorService , SharedServcieService} from 'src/app/_services/index';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmDialogService } from 'src/app/_commonComponent/confirmation/index';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  model: any = {};
  public isSaving = false;
  loading = false;
  allTodoList: any = [];
  profileName: any ;
  @Input() leadId: string;
  @Input() leadDetailsMode = false;
  @Output() todoCount = new EventEmitter<string>();
  constructor(private advancedLeadCreatorService: AdvancedLeadCreatorService,
              private sharedServcieService: SharedServcieService,
              private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
   this.model.todoType = 'other';
   this.model.todoDate = moment().format('MM/DD/YYYY');
   this.sharedServcieService.username.subscribe(result => {
    this.profileName = result;
  });
   if ( this.leadDetailsMode) {
      this.getAllTodoList(this.leadId);
    }
  }

  submitTodo(f: NgForm) {
    this.isSaving = true;
    
    if (this.model.todoDate.startDate !== undefined && this.model.todoDate.startDate !== null ) {
      this.model.todoDate =  new Date(this.model.todoDate.startDate._d);  // moment(this.model.todoDate.startDate._d).format('MM/DD/YYYY');
    }
    this.model.leadId = this.leadId;

    this.advancedLeadCreatorService.addTodos(this.model).pipe(
      finalize(() => this.isSaving = false),
      ).subscribe(
           (data: any ) => {
               this.isSaving = false;
               const todoobject = {
                todoId: data.data, 
                todoName: this.model.todoName,
                todoDate : moment(this.model.todoDate).format('MM/DD/YYYY'),
                todoTime: '',
                todoType: this.model.todoType,
                name: this.profileName,
                todoStatus: 'Pending',
               };
               this.allTodoList.push(todoobject);
               this.todoCount.emit(this.allTodoList.length);
               this.model = {};
               this.model.todoType = 'other';
               this.model.todoDate = moment().format('MM/DD/YYYY');
           },
            error => {
              this.isSaving = false;
           });
      }


    todoTypeIcon(todoType: any) {
        switch(todoType) {
          case 'email':
            return 'fa fa-envelope-open';
          case 'Call':
              return 'fa fa-phone-square';
          case 'Meeting':
            return 'fa fa-calendar';
         case 'other':
            return 'fa fa-th-large';


        }
    }
    todoStatusClass(todoStatus: any) {
      switch(todoStatus) {
        case 'Pending':
          return 'table-info';
        case 'Completed':
            return 'table-success';
        case 'Completed by System':
          return 'table-danger';


      }
  }
  updateTodo(item: any) {
    this.allTodoList.forEach(todoItem => {
      if ( todoItem.todoId === item.todoId) {
          let Todostatus = 0;
          if(todoItem.todoStatus === 'Completed') {
            todoItem.todoStatus = 'Pending';
            Todostatus = 1;
          } else {
            todoItem.todoStatus = 'Completed';
            Todostatus = 2 ;
          }
          const todosAuto = {
            todoId: item.todoId,
            updateFlag : 1,
            status: Todostatus
          };
          this.advancedLeadCreatorService.updateTodos(todosAuto).pipe(
            finalize(() => this.isSaving = false),
            ).subscribe(
                 (data: any ) => {
                 },
                  error => {
                    this.isSaving = false;
                 });
            }
    });
  }
  showDialog(item) {
    this.confirmDialogService.confirmThis('Are you sure to delete?', () => {
      this.deleteTodo(item);
      
    }, () => {
    });
  }

  deleteTodo(todoItem: any) {
    this.allTodoList = this.allTodoList.filter(obj => obj !== todoItem);
    const todosAuto = {
      todoId: todoItem.todoId,
      updateFlag : 0,
      status: 0
    };
    this.advancedLeadCreatorService.updateTodos(todosAuto).pipe(
      finalize(() => this.isSaving = false),
      ).subscribe(
           (data: any ) => {
           },
            error => {
              this.isSaving = false;
           });
    this.todoCount.emit(this.allTodoList.length);
  }
  getAllTodoList(leadId: any) {
    this.advancedLeadCreatorService.getTodoList(leadId).pipe(
      finalize(() => this.isSaving = false),
      ).subscribe(
           (data: any ) => {
             
             this.allTodoList = data.data;
           },
            error => {
              this.isSaving = false;
           });
  }
}
