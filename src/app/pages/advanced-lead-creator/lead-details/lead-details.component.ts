import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AdvancedLeadCreatorService , SharedServcieService} from 'src/app/_services/index';
import { CommonpopupService } from 'src/app/_commonComponent/commonpopup/commonpopup.service';
@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.css']
})
export class LeadDetailsComponent implements OnInit {

  parentLeadId: any;
  leadDetails : any ;
  model: any = {};
  public isSaving = false;
  templateType = 1;
  constructor(private activeRoute: ActivatedRoute,
              private advancedLeadCreatorService: AdvancedLeadCreatorService,
              private commonPopUpService: CommonpopupService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      console.log(params);
      this.parentLeadId = params.id;
      this.getLeadDetailsByLeadId(this.parentLeadId);
    });
  }

  getLeadDetailsByLeadId(leadId: any) {
    this.advancedLeadCreatorService.getLeadDetailsByLeadId(leadId).pipe().subscribe(
           (data: any ) => {
            this.leadDetails = data.data;
            this.model.sourceName = this.leadDetails.leadName ;
           },
            error => {
              console.log('lead details not loaded');
           });
  }
  changeLeadName() {

  }
  wonLost() {
    
  }
  setTemplate(templateType) {
    this.templateType = templateType;
  }
  // this.sourceService.createSource(this.model).pipe(
  //   finalize(() => this.isSaving = false),
  //   ).subscribe(
  //        (data: any ) => {
  //            this.isSaving = false;
  //            const sourceObject = {
  //             sourceId: data.data,
  //             sourceName: this.model.sourceName,
  //            };
  //            this.allSourceList.push(sourceObject);
  //            this.sourceCount.emit(this.allSourceList.length);
  //            f.reset();
  //            this.model = {};
  //        },
  //         error => {
  //           this.isSaving = false;
  //        });

}
