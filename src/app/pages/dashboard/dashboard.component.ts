import { Component, OnInit } from '@angular/core';
import {PipelineService, StageService , AdvancedLeadCreatorService , UserManagementService} from 'src/app/_services/index';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnd } from '@angular/cdk/drag-drop';
declare var $: any;
import * as moment from 'moment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allPipeLine: any = [];
  allStage: any = [];
  allLeadInfo: any = [];
  allLeadInfoCopy: any = [];
  allUser: any = [];
  filter: any = {} ;
  defaultPipeId: any;
  totalLeadsCount = 0 ;
  loading = true;
  selected: any;
  alwaysShowCalendars: boolean;
  selectedDate: any;
  directLeadName = '';
  public isSaving = false;
  cardHeight : any ;
  ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  };
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

  isInvalidDate = (m: moment.Moment) =>  {
    return this.invalidDates.some(d => d.isSame(m, 'day') );
  }

  constructor( private pipeLineService: PipelineService,
               private stageService: StageService,
               private advancedLeadCreatorService: AdvancedLeadCreatorService,
               private userManagementService: UserManagementService ) { }

  ngOnInit() {
    this.getAllPipeLine();
    this.getAllUser();
    this.filter.assignUser = '';
    this.filter.leadType = '';
    this.filter.leadName  =  '';
  }

  getAllPipeLine() {
    this.pipeLineService.getAllPipeLine(1, 1).pipe(
      ).subscribe(
        (data: any) => {
            this.allPipeLine = data.data;
            if(this.allPipeLine.length > 0) {
              const result =  this.allPipeLine.filter(el => el.isDefault === true);
              if(result.length > 0) {
                this.getLeadListView(result[0].pipeID);
                this.filter.pipeId = result[0].pipeID;
                this.defaultPipeId = result[0].pipeID;
              } else {
                this.loading = false;
              }
            } else {
              this.loading = false;
            }
           },
            error => {
   });
  }
  getAllStage(pipeId) {
    this.stageService.getAllStage(pipeId, 1, 1).pipe(
      ).subscribe(
        (data: any) => {
            this.allStage = data.data;
           },
            error => {
           });
  }
  getLeadListView(pipeId) {
    this.advancedLeadCreatorService.getLeadListView(pipeId).pipe(
      ).subscribe(
        (data: any) => {
            this.allLeadInfo = data.data;
            this.allLeadInfoCopy = data.data;
            this.loading = false;
            this.totalLeadCount();
            localStorage.setItem('leadData', JSON.stringify(data.data));
            this.cardHeight = $(".cdk-drop-list").height();
            if(this.cardHeight < 100) {
              this.cardHeight=200;
            }
            // tslint:disable-next-line:only-arrow-functions
            $(function() {
              $('[data-toggle="tooltip"]').tooltip();
              });
           },
            error => {
           });

  }
  // showLeadCreator() {
  //    //this.showLeadCreatorflag = true;
  // }
  loadPipeLine(pipeId: any) {
    this.getLeadListView(pipeId);
  }


onTalkDrop(event: CdkDragDrop<any[]>) {
  // In case the destination container is different from the previous container, we
  // need to transfer the given task to the target data array. This happens if
  // a task has been dropped on a different track.
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    const movedata = event.previousContainer.data[event.previousIndex];
    this.movedLeads(event.container.id , movedata.leadId);
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
  }

}

onTrackDrop(event: CdkDragDrop<any[]>) {
  moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
}





get trackIds(): string[] {
  const datanew = this.allLeadInfo.map(track => track.stageDetails.stageId);
  return datanew;
}

movedLeads(stid: any, ledid: any) {
 const  movedLeaddata = {
    stageId: stid,
    leadId: ledid
  } ;
 this.advancedLeadCreatorService.movedLeads(movedLeaddata).pipe(
    ).subscribe(
      (data: any) => {
         },
          () => {
         });

 this.cardHeight = $('.cdk-drop-list').height();
 if(this.cardHeight < 100) {
  this.cardHeight = 200;
}
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

filterLeads() {

  this.allLeadInfo = JSON.parse(localStorage.getItem('leadData'));
  if (this.filter.leadName !== '') {
   this.allLeadInfo.forEach(element => {
      element.leadDetails = element.leadDetails.filter(el => el.leadName.toLowerCase().includes(this.filter.leadName.toLowerCase()));
    });
  }

  if (this.filter.assignUser !== '') {
    this.allLeadInfo.forEach(element => {
      element.leadDetails = element.leadDetails.filter(el => el.assignUser === this.filter.assignUser);
    });

  }
  if (this.filter.leadType !== '' ) {
    if (this.filter.leadType === '1') {
      this.allLeadInfo.forEach(element => {
        element.leadDetails = element.leadDetails.filter(el => el.assignUser !== '');
      });

    } else {
      this.allLeadInfo.forEach(element => {
        element.leadDetails = element.leadDetails.filter(el => el.assignUser === ''
         || el.assignUser ==='00000000-0000-0000-0000-000000000000');
      });
    }
   }

  if (this.selectedDate !== '' && this.selectedDate.startDate != null && this.selectedDate.startDate._d !== undefined  ) {
    const startDate = moment(this.selectedDate.startDate._d).format('MM/DD/YYYY');
    const endDate = moment(this.selectedDate.endDate._d).format('MM/DD/YYYY');
    this.allLeadInfo.forEach(element => {
      element.leadDetails = element.leadDetails.filter(el => moment(el.createDate).format('MM/DD/YYYY') >= startDate &&
      moment(el.createDate).format('MM/DD/YYYY') <= endDate);
    });
   }
  this.totalLeadCount();
}

resetFilter() {
    this.filter.assignUser = '';
    this.filter.leadType = '';
    this.filter.leadName  =  '';
    this.selectedDate = '';
    this.filterLeads();

}

totalLeadCount() {
  let totalLeads = 0;
  this.allLeadInfo.forEach(element => {

    totalLeads += element.leadDetails.length ;
  });
  this.totalLeadsCount = totalLeads ;
}

addDirectLead() {
  if (this.directLeadName.trim() !== '') {
  this.isSaving = true;
  const objDirectLead = {
    leadName : this.directLeadName
  };
  this.advancedLeadCreatorService.createDirectLead(objDirectLead).pipe(
    ).subscribe(
      (data: any) => {
          this.directLeadName = '';
          const leadData = data.data[0];
          const leadObject = {
            leadId : leadData.leadId,
            leadName: leadData.leadName,
            leadValue: leadData.leadValue,
            pipeId: leadData.pipeId,
            stageId: leadData.stageId,
            assignUserName: '',
            createDate: leadData.createDate,
            assignUser: ''
          };
          this.isSaving = false;
          this.allLeadInfo = JSON.parse(localStorage.getItem('leadData'));
          this.allLeadInfo.forEach(element => {
              if (element.stageDetails.stageId === leadData.stageId) {
                element.leadDetails.push(leadObject);
              }
          });
          localStorage.setItem('leadData', JSON.stringify(this.allLeadInfo));
          // tslint:disable-next-line:only-arrow-functions
          $ ( function() {
            $('[data-toggle="tooltip"]').tooltip();
            });
         },
          error => {
            this.isSaving = false;
         });
}
}

}

