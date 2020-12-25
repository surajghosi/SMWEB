import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormGroupDirective } from '@angular/forms';
import {ManageleadaccessService , UserManagementService} from 'src/app/_services/index';
import { finalize } from 'rxjs/operators';
import { ConfirmDialogService } from 'src/app/_commonComponent/confirmation/index';

@Component({
  selector: 'app-manage-access',
  templateUrl: './manage-access.component.html',
  styleUrls: ['./manage-access.component.css']
})
export class ManageAccessComponent implements OnInit {
  keyword = 'name';
  data = [
     {
       id: 1,
       name: 'Usa'
     },
     {
       id: 2,
       name: 'England'
     }
  ];
  model: any = {};
  allUser: any = [];
  public isSaving = false;
  allManageAccessList: any  = [] ;
  @Input() leadId: string;
  @Input() leadDetailsMode = false;
  @Output() accessCount = new EventEmitter<string>();
  constructor(private manageleadaccessService: ManageleadaccessService,
              private userManagementService: UserManagementService,
              private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.getAllUser();
    if(this.leadDetailsMode) {
      this.getAllLeadAccessByleadId(this.leadId);
    }
  }

  selectEvent(item) {
    // do something with selected item
    console.log(item);
    this.addLeadManageAccess(item);
  }
 
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e){
    // do something when input is focused
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

  addLeadManageAccess(item: any) {
    this.isSaving = true;
    this.model.leadId = this.leadId;
    this.model.userId = item.userId;
    this.manageleadaccessService.createLeadAccess(this.model).pipe(
      finalize(() => this.isSaving = false),
      ).subscribe(
           (data: any ) => {
               this.isSaving = false;
               const leadAccessObject = {
                accessID: data.data,
                name: item.name,
               };
               this.allManageAccessList.push(leadAccessObject);
               this.accessCount.emit(this.allManageAccessList.length);
               this.model = {};
           },
            error => {
              this.isSaving = false;
           });
      }

      showDialog(item) {
        this.confirmDialogService.confirmThis('Are you sure to delete?', () => {
          this.deleteLeadAccess(item);
        }, () => {
        });
      }

      deleteLeadAccess(manageLeadAccessItem: any) {
        this.allManageAccessList = this.allManageAccessList.filter(obj => obj !== manageLeadAccessItem);
        this.manageleadaccessService.deleteLeadAccess(manageLeadAccessItem).pipe(
          finalize(() => this.isSaving = false),
          ).subscribe(
               (data: any ) => {
               },
                error => {
                  this.isSaving = false;
               });
        this.accessCount.emit(this.allManageAccessList.length);
      }
      getAllLeadAccessByleadId(leadId: any) {
        this.manageleadaccessService.getLeadAccessDetailsByLeadId(leadId).pipe().subscribe(
               (data: any ) => {
                   this.allManageAccessList = data.data;
               },
                error => {
                  this.isSaving = false;
               });
      }
}
