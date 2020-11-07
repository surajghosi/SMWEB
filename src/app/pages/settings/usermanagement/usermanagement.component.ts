import { Component, OnInit } from '@angular/core';
import {UserManagementService, CommonService} from 'src/app/_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ConfirmDialogService } from 'src/app/_commonComponent/confirmation/index';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgForm } from '@angular/forms';
import { Pagination } from 'src/app/_commonComponent/common/pagination';
import { BlockTemplateComponent } from 'src/app/_commonComponent/index';
@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
  model: any = {};
  public isSaving = false;
  loading = false;
  userRoleData: any = [];
  allUser: any = [];
  pageOfItems: Array<any>;
  @BlockUI('contact-list') blockUIList: NgBlockUI;
  blockTemplate = BlockTemplateComponent;
  constructor( private commonService: CommonService , private route: ActivatedRoute,
               private router: Router, private userManagementService: UserManagementService,
               private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.model.role = '';
    this.userRole();
    this.getAllUser();
  }
  userRole() {
    this.commonService.userRole()
        .subscribe((data: any) => {
             this.userRoleData = data.data;
            },
            error => {
          });
}

  register(f: NgForm) {
    this.isSaving = true;
    this.userManagementService.addNewUser(this.model).pipe(
      finalize(() => this.isSaving = false),
      ).subscribe(
           data => {
               this.isSaving = false;
               this.getAllUser();
               this.model = {};
               f.reset();
               f.resetForm();
               this.model.role = '';
           },
            error => {
              this.isSaving = false;
           });
}
  getAllUser() {
    this.blockUIList.start('Loading...'); // Start blocking element only
    this.userManagementService.GetAllUser(Pagination.pageNo, Pagination.size).pipe(
      ).subscribe(
        (data: any) => {
            this.allUser = data.data;
            this.blockUIList.stop(); // Stop blocking
          },
            error => {
              this.blockUIList.stop(); // Stop blocking
          });
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
showDialog(user) {
  this.confirmDialogService.confirmThis('Are you sure to delete?', () => {
    this.DeleteUser(user.userId);
  }, () => {

  });
}
EditUser(user) {
  this.userManagementService.GetUserById(user.userId).pipe(
    ).subscribe(
      (data: any) => {
          this.model = data.data;
         },
          error => {
         });
 }
 DeleteUser(id) {
  this.userManagementService.DeleteUserById(id).pipe(
    ).subscribe(
      (data: any) => {
        this.getAllUser();
         },
          error => {
         });
 }
 Reset() {
   this.model = {};
 }

}
