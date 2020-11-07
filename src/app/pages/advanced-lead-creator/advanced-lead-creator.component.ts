import { Component, OnInit, ViewChild , AfterViewInit, ChangeDetectorRef, Output } from '@angular/core';
import {AdvancedLeadCreatorService , PipelineService , StageService, UserManagementService} from 'src/app/_services/index';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmDialogService } from 'src/app/_commonComponent/confirmation/index';
import { NgForm, FormGroupDirective } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { TodoComponent } from 'src/app/pages/advanced-lead-creator/todo/todo.component';
import { Todo } from '@app/_models';
@Component({
  selector: 'app-advanced-lead-creator',
  templateUrl: './advanced-lead-creator.component.html',
  styleUrls: ['./advanced-lead-creator.component.css']
})
export class AdvancedLeadCreatorComponent implements OnInit , AfterViewInit {
  debugger;
  @ViewChild('todoTemplate')
  sample: TodoComponent;
  model: any = {};
  allPipeLine: any = [];
  allStage: any = [];
  allUser: any = [];
  public isSaving = false;
  parentLeadId: any = '' ;
  loading = false;
  @Output()todoCount = 0 ;
  @Output()contactCount = 0 ;
  @Output()notesCount = 0 ;
  @Output()fileCount = 0 ;
  @Output()productCount = 0 ;
  constructor(private advancedLeadCreatorService: AdvancedLeadCreatorService,
              private pipelineService: PipelineService,
              private stageService: StageService,
              private userManagementService: UserManagementService,
              private cd: ChangeDetectorRef) { }
  ngOnInit() {
    this.model.pipeId = '';
    this.model.assignUser = '';
    this.getAllPipeLine();
    this.getAllUser();
  }

  ngAfterViewInit() {
   
  }

  getAllPipeLine() {
    this.pipelineService.getAllPipeLine(1, 1).pipe(
      ).subscribe(
        (data: any) => {
            this.allPipeLine = data.data;
           },
            error => {
   });
  }

  getAllStage(pipeId) {
    this.stageService.getAllStage(pipeId, 1, 1).pipe(
      ).subscribe(
        (data: any) => {
            this.model.stageId = '';
            this.allStage = data.data;
           },
            error => {
           });
  }
  getAllUser() {
    this.userManagementService.GetAllUser(1, 1).pipe(
      ).subscribe(
        (data: any) => {
            this.allUser = data.data;
          },
            error => {
          });
  }
  changePipeLine(event: any) {
    if( event.target.value !== '' )  {
      this.getAllStage(event.target.value);
    }
  }

  submitLead(f: NgForm) {
    this.isSaving = true;
    this.advancedLeadCreatorService.createAdvanceLeads(this.model).pipe(
      finalize(() => this.isSaving = false),
      ).subscribe(
           (data: any ) => {
               this.isSaving = false;
               this.parentLeadId = data.data;
           },
            error => {
              this.isSaving = false;
           });
      }
      Reset() {
               this.model = {};
               this.model.pipeId = '';
               this.model.stageId = '';
               this.allStage.length = 0;
               this.model.assignUser = '';
      }

      addNewLead (f: NgForm) {
               this.parentLeadId = '';
               this.model = {};
               f.reset();
               f.resetForm();
               f.form.enable();
               this.model.pipeId = '';
               this.model.stageId = '';
               this.allStage.length = 0;
               this.model.assignUser = '';
      }

      getCount(todoCount: any) {
          this.todoCount =  todoCount ;
      }
      getContactCount(contactCount: any) {
        this.contactCount =  contactCount ;
      }
      getNotesCount(notesCount: any) {
        this.notesCount =  notesCount;
      }
      getfileCount(fileCount: any) {
        this.fileCount =  fileCount;
      }
      getProductCount(productCount: any) {
        this.productCount = productCount;
      }

      numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
           return false;
        }
        return true;
      }
     

}
