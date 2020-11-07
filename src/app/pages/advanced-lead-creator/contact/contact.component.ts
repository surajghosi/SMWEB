import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormGroupDirective } from '@angular/forms';
import {ContactService} from 'src/app/_services/index';
import { finalize } from 'rxjs/operators';
import { ConfirmDialogService } from 'src/app/_commonComponent/confirmation/index';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  model: any = {};
  public isSaving = false;
  allContactList: any  = [] ;
  @Input() leadId: string;
  @Output() contactCount = new EventEmitter<string>();
  constructor(private contactService: ContactService,
              private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
  }
 
  addContact(f: NgForm) {
    this.isSaving = true;
    this.model.leadId = this.leadId;
    this.contactService.createContact(this.model).pipe(
      finalize(() => this.isSaving = false),
      ).subscribe(
           (data: any ) => {
               this.isSaving = false;
               const contactObject = {
                contactId: data.data,
                contactName: this.model.contactName,
                contactDesignation : this.model.contactDesignation,
                contactEmail: this.model.contactEmail,
                contactPhone: this.model.contactPhone,
                contactAddress: this.model.contactAddress,
                contactOrg: this.model.contactOrg,
               };
               this.allContactList.push(contactObject);
               this.contactCount.emit(this.allContactList.length);
               f.reset();
               this.model = {};
           },
            error => {
              this.isSaving = false;
           });
      }

      showDialog(item) {
        this.confirmDialogService.confirmThis('Are you sure to delete?', () => {
          this.deleteContact(item);
        }, () => {
        }); 
      }

      deleteContact(contactItem: any) {
        this.allContactList = this.allContactList.filter(obj => obj !== contactItem);
        this.contactService.deleteContact(contactItem).pipe(
          finalize(() => this.isSaving = false),
          ).subscribe(
               (data: any ) => {
               },
                error => {
                  this.isSaving = false;
               });
        this.contactCount.emit(this.allContactList.length);
      }

}
