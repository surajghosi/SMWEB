import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AdvancedLeadCreatorService , SharedServcieService} from 'src/app/_services/index';
@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.css']
})
export class LeadDetailsComponent implements OnInit {

  parentLeadId: any;
  leadDetails : any ;
  constructor(private activeRoute: ActivatedRoute, private advancedLeadCreatorService: AdvancedLeadCreatorService) { }

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
             debugger;
            this.leadDetails = data.data;
           },
            error => {
              console.log('lead details not loaded');
           });
  }

}
