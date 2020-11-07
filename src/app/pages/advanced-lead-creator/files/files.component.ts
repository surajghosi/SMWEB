import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FilesService} from 'src/app/_services/index';
import { finalize } from 'rxjs/operators';
import { ConfirmDialogService } from 'src/app/_commonComponent/confirmation/index';
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  model: any = {};
  public isSaving = false;
  allfilesList: any  = [] ;
  public progress: number;
  @Input() leadId: string;
  @Output() fileCount = new EventEmitter<string>();
  constructor(private filesService: FilesService,
              private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
  }

  upload(files) {
    this.isSaving = true;
    if (files.length === 0) {
      return;
    }
    const formData = new FormData();
    let fName = '';
    for (const file of files) {
      fName = file.name;
      formData.append('leadFiles', file);
    }
    formData.append('leadId', this.leadId);
    // this.isSaving = true;
    // debugger;
    this.filesService.fileUpload(formData).pipe(
      finalize(() => this.isSaving = false),
      ).subscribe(
           (data: any ) => {
               this.isSaving = false;
               const contactObject = {
                fileId: data.data,
                fileName: fName,
               };
               this.allfilesList.push(contactObject);
               this.fileCount.emit(this.allfilesList.length);
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
    this.allfilesList = this.allfilesList.filter(obj => obj !== contactItem);
    this.filesService.deleteFile(contactItem).pipe(
      finalize(() => this.isSaving = false),
      ).subscribe(
           (data: any ) => {
           },
            error => {
              this.isSaving = false;
           });
    this.fileCount.emit(this.allfilesList.length);
  }

}
