import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormGroupDirective } from '@angular/forms';
import {SourceService} from 'src/app/_services/index';
import { finalize } from 'rxjs/operators';
import { ConfirmDialogService } from 'src/app/_commonComponent/confirmation/index';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent implements OnInit {
  model: any = {};
  public isSaving = false;
  allSourceList: any  = [] ;
  @Input() leadId: string;
  @Input() leadDetailsMode = false;
  @Output() sourceCount = new EventEmitter<string>();
  constructor(private sourceService: SourceService,
              private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    if(this.leadDetailsMode) {
      this.getAllSourceByleadId(this.leadId);
    }
  }

  addSource(f: NgForm) {
    this.isSaving = true;
    this.model.leadId = this.leadId;
    this.sourceService.createSource(this.model).pipe(
      finalize(() => this.isSaving = false),
      ).subscribe(
           (data: any ) => {
               this.isSaving = false;
               const sourceObject = {
                sourceId: data.data,
                sourceName: this.model.sourceName,
               };
               this.allSourceList.push(sourceObject);
               this.sourceCount.emit(this.allSourceList.length);
               f.reset();
               this.model = {};
           },
            error => {
              this.isSaving = false;
           });
      }

      showDialog(item) {
        this.confirmDialogService.confirmThis('Are you sure to delete?', () => {
          this.deleteSource(item);
        }, () => {
        }); 
      }

      deleteSource(sourceItem: any) {
        this.allSourceList = this.allSourceList.filter(obj => obj !== sourceItem);
        this.sourceService.deleteSource(sourceItem).pipe(
          finalize(() => this.isSaving = false),
          ).subscribe(
               (data: any ) => {
               },
                error => {
                  this.isSaving = false;
               });
        this.sourceCount.emit(this.allSourceList.length);
      }
      getAllSourceByleadId(leadId: any) {
        this.sourceService.getSourceDetailsByLeadId(leadId).pipe().subscribe(
               (data: any ) => {
                   this.allSourceList = data.data;
               },
                error => {
                  this.isSaving = false;
               });
      }

}
