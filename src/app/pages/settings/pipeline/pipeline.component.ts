import { Component, OnInit } from '@angular/core';
import {PipelineService, CommonService} from 'src/app/_services/index';
import { finalize } from 'rxjs/operators';
import { ConfirmDialogService } from 'src/app/_commonComponent/confirmation/index';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgForm } from '@angular/forms';
import { Pagination } from 'src/app/_commonComponent/common/pagination';
@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css']
})
export class PipelineComponent implements OnInit {
  model: any = {};
  public isSaving = false;
  loading = false;
  allPipeLine: any = [];
  pageOfItems: Array<any>;
  @BlockUI('contact-list') blockUIList: NgBlockUI;
  constructor( private commonService: CommonService ,
               private pipeLineService: PipelineService,
               private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.getAllPipeLine();
  }

  submit(f: NgForm) {
    this.isSaving = true;
    this.pipeLineService.createPipeLine(this.model).pipe(
      finalize(() => this.isSaving = false),
      ).subscribe(
           data => {
               this.isSaving = false;
               this.model = {};
               f.reset();
               f.resetForm();
               this.getAllPipeLine();
           },
            error => {
              this.isSaving = false;
           });
      }
      getAllPipeLine() {
        this.blockUIList.start('Loading...'); // Start blocking element only
        this.pipeLineService.getAllPipeLine(Pagination.pageNo, Pagination.size).pipe(
          ).subscribe(
            (data: any) => {
                this.allPipeLine = data.data;
                this.blockUIList.stop(); // Stop blocking
               },
                error => {
                  this.blockUIList.stop(); // Stop blocking
               });
      }
      onChangePage(pageOfItems: Array<any>) {
        this.pageOfItems = pageOfItems;
      }
      EditPipe(pipe) {
        this.pipeLineService.GetPipeLineId(pipe.pipeID).pipe(
          ).subscribe(
            (data: any) => {
                this.model = data.data;
               },
                error => {
               });
       }
       DeletePipe(id) {
        this.pipeLineService.DeletePipeLineById(id).pipe(
          ).subscribe(
            (data: any) => {
              this.getAllPipeLine();
               },
                error => {
               });
       }
       showDialog(pipe) {
        this.confirmDialogService.confirmThis('Are you sure to delete?', () => {
          this.DeletePipe(pipe.pipeID);
        }, () => {
        });
      }
      Reset() {
        this.model = {};
      }
  }
