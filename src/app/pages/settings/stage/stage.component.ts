import { Component, OnInit } from '@angular/core';
import {StageService, PipelineService, CommonService} from 'src/app/_services/index';
import { finalize } from 'rxjs/operators';
import { ConfirmDialogService } from 'src/app/_commonComponent/confirmation/index';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgForm } from '@angular/forms';
import { Pagination } from 'src/app/_commonComponent/common/pagination';
import { moveItemInArray, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {
  model: any = {};
  public isSaving = false;
  loading = false;
  allStage: any = [];
  pipeLineData: any = [];
  selectedPipeLine: any;
  pageOfItems: Array<any>;
  @BlockUI('contact-list') blockUIList: NgBlockUI;
  constructor( private commonService: CommonService ,
               private stageService: StageService,
               private pipelineService: PipelineService,
               private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.model.pipeId = '';
    this.pipeLine();
  }
  submit(f: NgForm) {
    this.isSaving = true;
    this.stageService.createStage(this.model).pipe(
      finalize(() => this.isSaving = false),
      ).subscribe(
           data => {
               this.isSaving = false;
               this.model = {};
               f.reset();
               f.resetForm();
               if (this.selectedPipeLine !== '') {
                this.getAllStage(this.selectedPipeLine);
               }
           },
            error => {
              this.isSaving = false;
           });
      }
      pipeLine() {
        this.pipelineService.getAllPipeLine(1, 1)
            .subscribe((data: any) => {
                 this.pipeLineData = data.data;
                },
                error => {
          });
    }
    getAllStage(pipeId) {
      this.blockUIList.start('Loading...'); // Start blocking element only
      this.stageService.getAllStage(pipeId, Pagination.pageNo, Pagination.size).pipe(
        ).subscribe(
          (data: any) => {
              this.allStage = data.data;
              this.blockUIList.stop(); // Stop blocking
             },
              error => {
                this.blockUIList.stop(); // Stop blocking
             });
    }
    selectPipeLine(event: any) {
      this.selectedPipeLine = event.target.value;
      this.getAllStage(this.selectedPipeLine);
    }
    onChangePage(pageOfItems: Array<any>) {
      this.pageOfItems = pageOfItems;
    }
    showDialog(stage) {
      this.confirmDialogService.confirmThis('Are you sure to delete?', () => {
        this.DeleteStage(stage.stageId);
      }, () => {
      });
    }

    EditStage(stage) {
      this.stageService.GetStageId(stage.stageId).pipe(
        ).subscribe(
          (data: any) => {
              this.model = data.data;
             },
              error => {
             });
     }
     DeleteStage(id) {
      this.stageService.DeleteStageById(id).pipe(
        ).subscribe(
          (data: any) => {
            this.getAllStage(this.selectedPipeLine);
             },
              error => {
             });
     }
     onDrop(event: CdkDragDrop<any[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        console.log(event.container.data);
        console.log(event.currentIndex);
        console.log(event.previousIndex);
        event.container.data.forEach((value, index) => {
          value.sequenceNumber = (index + 1);
      });
        this.stageService.updateStageSequence(event.container.data).pipe(
          finalize(() => this.isSaving = false),
          ).subscribe(
               data => {
               },
                error => {
                  this.isSaving = false;
               });
      } else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    }

}
