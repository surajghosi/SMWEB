import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormGroupDirective } from '@angular/forms';
import {NotesService} from 'src/app/_services/index';
import { finalize } from 'rxjs/operators';
import { ConfirmDialogService } from 'src/app/_commonComponent/confirmation/index';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  model: any = {};
  public isSaving = false;
  allNotesList: any  = [] ;
  @Input() leadId: string;
  @Input() leadDetailsMode = false;
  @Output() notesCount = new EventEmitter<string>();
  constructor(private notesService: NotesService,
              private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    if(this.leadDetailsMode) {
      this.getAllNotesByleadId(this.leadId);
    }
  }

  addNotes(f: NgForm) {
    this.isSaving = true;
    this.model.leadId = this.leadId;
    this.notesService.createNotes(this.model).pipe(
      finalize(() => this.isSaving = false),
      ).subscribe(
           (data: any ) => {
               this.isSaving = false;
               const notesObject = {
                noteId: data.data,
                notes: this.model.notes,
               };
               this.allNotesList.push(notesObject);
               this.notesCount.emit(this.allNotesList.length);
               f.reset();
               this.model = {};
           },
            error => {
              this.isSaving = false;
           });
      }

      showDialog(item) {
        this.confirmDialogService.confirmThis('Are you sure to delete?', () => {
          this.deleteNotes(item);
        }, () => {
        }); 
      }

      deleteNotes(notesItem: any) {
        this.allNotesList = this.allNotesList.filter(obj => obj !== notesItem);
        this.notesService.deleteNotes(notesItem).pipe(
          finalize(() => this.isSaving = false),
          ).subscribe(
               (data: any ) => {
               },
                error => {
                  this.isSaving = false;
               });
        this.notesCount.emit(this.allNotesList.length);
      }
      getAllNotesByleadId(leadId: any) {
        this.notesService.getNotesDetailsByLeadId(leadId).pipe().subscribe(
               (data: any ) => {
                   this.allNotesList = data.data;
               },
                error => {
                  this.isSaving = false;
               });
      }
}
